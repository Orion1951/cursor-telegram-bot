# YAML-authored Session manifests

Repository-anchored Session catalogues use YAML so operators skim multi-Session workspaces without drowning in punctuation, aligning with Hybrid bridge configuration human-review goals. Parsing flows YAML text into structured objects validated immediately by **Zod** (ADR 0023) inside the workstation bridge before any Telegram polling activates. Parsing relies on the community **`yaml`** npm package—the widely used YAML 1.2 implementation—with Vitest guarding edge cases whenever anchors or merges appear in manifests.
