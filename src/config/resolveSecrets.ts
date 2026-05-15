/** Read `process.env` with exact key match, then case-insensitive fallback (helps Windows tooling). */
function readEnvInsensitive(env: NodeJS.ProcessEnv, key: string): string | undefined {
  const raw = env[key];
  if (raw !== undefined && raw !== "") {
    const t = raw.trim();
    return t === "" ? undefined : t;
  }
  const want = key.toLowerCase();
  for (const [k, v] of Object.entries(env)) {
    if (k.toLowerCase() !== want) continue;
    if (v === undefined || v === "") continue;
    const t = v.trim();
    if (t === "") continue;
    return t;
  }
  return undefined;
}

function envKeyHints(env: NodeJS.ProcessEnv, wantedKey: string): string {
  const w = wantedKey.toLowerCase();
  const hints = Object.keys(env).filter(
    (k) =>
      k.toLowerCase().includes(w) ||
      (k.toUpperCase().includes("TELEGRAM") && k.toUpperCase().includes("TOKEN")),
  );
  const unique = [...new Set(hints)].slice(0, 12);
  return unique.length > 0
    ? ` Keys that look related (names only): ${unique.join(", ")}.`
    : " No TOKEN-like keys found in environment — confirm `.env` is in the repo root where you run `pnpm dev`.";
}

export type ResolvedSession = {
  id: string;
  displayName?: string | undefined;
  workspacePath: string;
  botToken: string;
  /** `.env` key name (`manifest.botTokenEnv`) so startup failures never log the token */
  tokenEnvVar: string;
};

export type OperatorContext = {
  operatorUserId: number;
};

/**
 * Validates env wiring for manifests: global operator Telegram user id plus each session token env var.
 */
export function resolveSessionSecrets(
  env: NodeJS.ProcessEnv,
  sessions: readonly {
    id: string;
    displayName?: string | undefined;
    workspacePath: string;
    botTokenEnv: string;
  }[],
): { resolved: ResolvedSession[]; operator: OperatorContext } {
  const rawId = readEnvInsensitive(env, "TELEGRAM_OPERATOR_USER_ID");
  if (rawId === undefined) {
    throw new Error(
      "TELEGRAM_OPERATOR_USER_ID is required — add e.g. TELEGRAM_OPERATOR_USER_ID=123456789 to `.env` in the project root (same folder as package.json).",
    );
  }
  const operatorUserId = Number(rawId);
  if (!Number.isFinite(operatorUserId)) {
    throw new Error("TELEGRAM_OPERATOR_USER_ID must be numeric (no quotes around the number).");
  }

  const resolved: ResolvedSession[] = [];
  for (const s of sessions) {
    const botToken = readEnvInsensitive(env, s.botTokenEnv);
    if (botToken === undefined) {
      throw new Error(
        `Session "${s.id}" needs a Telegram bot token in .env matching manifest field botTokenEnv.\n` +
          `Expected a non-empty value for env key: ${s.botTokenEnv}\n` +
          `Add a line exactly like: ${s.botTokenEnv}=<your_botfather_token_here>` +
          envKeyHints(env, s.botTokenEnv),
      );
    }
    resolved.push({
      id: s.id,
      displayName: s.displayName,
      workspacePath: s.workspacePath,
      botToken,
      tokenEnvVar: s.botTokenEnv,
    });
  }
  return {
    resolved,
    operator: { operatorUserId },
  };
}
