import pino, { type Logger } from "pino";

/**
 * Root bridge logger. Set `PINO_PRETTY=1` (via `pnpm dev`) for Pretty console output during development.
 */
export function createRootLogger(): Logger {
  const base: pino.LoggerOptions =
    process.env.PINO_PRETTY === "1"
      ? {
          level: process.env.LOG_LEVEL ?? "info",
          name: "cursor-telegram-bot",
          transport: {
            target: "pino-pretty",
          },
        }
      : {
          level: process.env.LOG_LEVEL ?? "info",
          name: "cursor-telegram-bot",
        };

  return pino(base);
}
