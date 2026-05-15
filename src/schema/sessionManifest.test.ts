import { describe, expect, test } from "vitest";
import { parse as parseYaml } from "yaml";
import { manifestSchema } from "./sessionManifest.js";

describe("manifestSchema", () => {
  test("parses minimal valid manifest", () => {
    const doc: unknown = parseYaml(`
sessions:
  - id: demo
    workspacePath: ../demo
    botTokenEnv: TELEGRAM_BOT_TOKEN_DEMO
`);
    expect(() => manifestSchema.parse(doc)).not.toThrow();
  });

  test("trims whitespace around env key names", () => {
    const doc: unknown = parseYaml(`
sessions:
  - id: demo
    workspacePath: ../demo
    botTokenEnv: "  TELEGRAM_BOT_TOKEN_DEMO  "
`);
    expect(manifestSchema.parse(doc).sessions[0]?.botTokenEnv).toBe("TELEGRAM_BOT_TOKEN_DEMO");
  });

  test("allows digits and dots in env keys", () => {
    const doc: unknown = parseYaml(`
sessions:
  - id: demo
    workspacePath: ../demo
    botTokenEnv: 123starts_with_digit_ok.TOKEN-LILO_MED_v1
`);
    expect(() => manifestSchema.parse(doc)).not.toThrow();
  });

  test("rejects empty sessions list", () => {
    const doc: unknown = parseYaml(`
sessions: []
`);
    expect(() => manifestSchema.parse(doc)).toThrow();
  });

  test("accepts hyphenated env-var style names", () => {
    const doc: unknown = parseYaml(`
sessions:
  - id: demo
    workspacePath: ../demo
    botTokenEnv: TELEGRAM_BOT_TOKEN_LILO-MEDICAL
`);
    expect(() => manifestSchema.parse(doc)).not.toThrow();
  });

  test("rejects env key containing whitespace", () => {
    const doc: unknown = parseYaml(`
sessions:
  - id: demo
    workspacePath: ../demo
    botTokenEnv: "BAD TOKEN NAME"
`);
    expect(() => manifestSchema.parse(doc)).toThrow();
  });

  test("rejects env key containing '='", () => {
    const doc: unknown = parseYaml(`
sessions:
  - id: demo
    workspacePath: ../demo
    botTokenEnv: "TOKEN=key"
`);
    expect(() => manifestSchema.parse(doc)).toThrow();
  });
});
