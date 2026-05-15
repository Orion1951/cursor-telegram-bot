import { Bot } from "grammy";
import type { Logger } from "pino";

import type { ResolvedSession } from "../config/resolveSecrets.js";

export type RunningBotSession = {
  session: ResolvedSession;
  bot: Bot;
};

/** grammY Bots stay long-polling in one Node process until `stopGracefully` runs. */
export function createBotsForSessions(
  sessions: readonly ResolvedSession[],
  operatorUserId: number,
  logger: Logger,
): RunningBotSession[] {
  const out: RunningBotSession[] = [];

  for (const session of sessions) {
    const bot = new Bot(session.botToken);

    bot.use(async (ctx, next) => {
      const uid = ctx.from?.id;
      if (uid === undefined || uid !== operatorUserId) {
        logger.warn(
          {
            event: "silent_pinning_refusal",
            sessionId: session.id,
            fromUserId: uid ?? null,
            chatType: ctx.chat?.type ?? null,
          },
          "non_operator_message_dropped",
        );
        return;
      }
      await next();
    });

    bot.on("message:text", async (ctx) => {
      await ctx.reply(
        `[ack session=${session.id}] ${session.displayName ?? "(no label)"}: ${ctx.message.text}`,
      );
    });

    bot.catch((err) => {
      logger.error({ err, sessionId: session.id }, "grammy_error");
    });

    out.push({ session, bot });
  }

  return out;
}
