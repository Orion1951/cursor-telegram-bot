import "dotenv/config";

import { GrammyError, HttpError } from "grammy";

import type { RunningBotSession } from "../telegram/sessionBots.js";
import { loadSessionManifest } from "../config/loadManifest.js";
import { resolveSessionSecrets, type ResolvedSession } from "../config/resolveSecrets.js";
import { createRootLogger } from "../logging/logger.js";
import { createBotsForSessions } from "../telegram/sessionBots.js";
import { shutdownBotsGracefully } from "./gracefulShutdown.js";

const DEFAULT_MANIFEST = "sessions/manifest.yaml";

function parseShutdownMs(): number {
  const raw = process.env.SHUTDOWN_TIMEOUT_MS ?? "8000";
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return 8000;
  return n;
}

function rethrowFriendlyTelegramStart(session: ResolvedSession, err: unknown): never {
  if (err instanceof GrammyError) {
    const hints =
      err.error_code === 401 || err.error_code === 404
        ? [
            "- Token typo, revoked bot, swapped tokens between sessions, or `.env` value is a placeholder",
            `- Verify BotFather token for manifest session "${session.id}" in env ${session.tokenEnvVar}`,
            "- Remove or comment extra `sessions:` entries if you only run one bot for now",
          ]
        : ["- Inspect the Telegram Bot API description above against your bot setup"];
    const lines = [
      `Telegram rejected this bridge session while calling ${String(err.method)}.`,
      `sessionId: "${session.id}"`,
      `envTokenKey: ${session.tokenEnvVar}`,
      `(Telegram Bot API ${err.error_code}) ${err.description}`,
      "",
      "Hints:",
      ...hints,
      "",
      "Underlying grammY error:",
      err.stack ?? String(err),
    ];
    throw new Error(lines.join("\n"));
  }
  if (err instanceof HttpError) {
    const lines = [
      `Telegram HTTPS request failed before the bridge could attach session "${session.id}" (env ${session.tokenEnvVar}).`,
      "Check outbound HTTPS to api.telegram.org, proxies, firewall, or corporate TLS inspection.",
      "",
      err.stack ?? String(err),
    ];
    throw new Error(lines.join("\n"));
  }
  throw err;
}

async function boot(): Promise<{ running: RunningBotSession[]; logger: ReturnType<typeof createRootLogger> }> {
  const logger = createRootLogger();

  const manifestPath = process.env.SESSION_MANIFEST_PATH ?? DEFAULT_MANIFEST;
  const { manifest } = await loadSessionManifest(manifestPath);
  const { resolved, operator } = resolveSessionSecrets(process.env, manifest.sessions);
  logger.info({ sessionCount: resolved.length }, "sessions_resolved_from_manifest");

  const running = createBotsForSessions(resolved, operator.operatorUserId, logger);

  await Promise.all(
    running.map(async ({ bot, session }) => {
      try {
        await bot.start({
          drop_pending_updates: true,
          onStart(me) {
            logger.info(
              {
                sessionId: session.id,
                botUsername: me.username ?? null,
              },
              "grammy_bot_started_long_poll",
            );
          },
        });
      } catch (err) {
        rethrowFriendlyTelegramStart(session, err);
      }
    }),
  );

  logger.info({}, "cursor_telegram_bridge_live_acknowledgement_only");

  return { running, logger };
}

export async function runBridge(): Promise<void> {
  const { running, logger } = await boot();

  let shuttingDown = false;
  const handler = (): void => {
    if (shuttingDown) {
      logger.warn({}, "shutdown_force_second_interrupt");
      process.exit(1);
    }
    shuttingDown = true;
    void shutdownBotsGracefully(
      logger,
      running.map((r) => r.bot),
      parseShutdownMs(),
    ).finally(() => process.exit(0));
  };

  process.once("SIGINT", handler);
  process.once("SIGTERM", handler);
}
