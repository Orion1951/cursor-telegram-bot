# ESM-only module surface

The workstation bridge ships as `"type": "module"` exclusively—compiled or authored TypeScript aligns on native ESM semantics under Node.js 20 per ADR 0015 avoiding dual-package maintenance or require interop shim debt. Rolling back toward CommonJS would only be entertained if unforeseen executor toolchain constraints appear, none anticipated while the bridge stays a local-first workstation service.
