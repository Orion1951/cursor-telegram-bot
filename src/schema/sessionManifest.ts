import { z } from "zod";

const sessionEntrySchema = z.object({
  id: z.string().min(1),
  displayName: z.string().optional(),
  workspacePath: z.string().min(1),
  /**
   * Name of `process.env[...]` holding this bot token (never the literal token).
   * Kept permissive on purpose: tooling and OS env naming varies; we only block obvious foot-guns.
   */
  botTokenEnv: z
    .string()
    .transform((s) => s.trim())
    .refine((s) => s.length > 0, { message: "botTokenEnv cannot be empty after trim" })
    .refine((s) => !/\s/.test(s), { message: "env key must not contain whitespace — use BOT_TOKEN_STYLE names" })
    .refine((s) => !s.includes("="), { message: "env key must not contain '='" }),
});

export const manifestSchema = z.object({
  sessions: z.array(sessionEntrySchema).min(1),
});

export type SessionManifest = z.infer<typeof manifestSchema>;
