import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { manifestSchema, type SessionManifest } from "../schema/sessionManifest.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function projectRootFromSrcConfig(): string {
  return resolve(__dirname, "../..");
}

export async function loadSessionManifest(manifestRelativePath: string): Promise<{
  manifest: SessionManifest;
  manifestPath: string;
}> {
  const root = projectRootFromSrcConfig();
  const manifestPath = resolve(root, manifestRelativePath);
  const raw = await readFile(manifestPath, "utf8");
  const doc: unknown = parseYaml(raw);
  const manifest = manifestSchema.parse(doc);
  return { manifest, manifestPath };
}
