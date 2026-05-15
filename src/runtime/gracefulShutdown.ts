import type { Bot } from "grammy";
import type { Logger } from "pino";

/** Stop every grammY instance in parallel while bounding total wall-clock wait. */
export async function shutdownBotsGracefully(logger: Logger, bots: Bot[], shutdownTimeoutMs = 8000): Promise<void> {
  logger.info({ count: bots.length }, "shutdown_start");

  const stops = bots.map(async (bot) => {
    await bot.stop();
  });

  await Promise.race([
    Promise.all(stops),
    new Promise((_resolveIgnored, reject) => {
      setTimeout(() => {
        reject(new Error("shutdown_timeout"));
      }, shutdownTimeoutMs);
    }),
  ])
    .then(() => {
      logger.info("shutdown_complete");
    })
    .catch((reason: unknown) => {
      logger.error({ reason }, "shutdown_incomplete_force_exit_possible");
    });
}
