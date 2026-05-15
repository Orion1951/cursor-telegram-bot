# cursor-telegram-bot



Workstation bridge for **Dedicated steering bots** ([`CONTEXT.md`](./CONTEXT.md)) — **Acknowledgement-only posture** MVP: long polling via grammY, **explicit operator pinning**, YAML **Session manifests** + `.env` **bridge secret annex**, structured logs with **Pino**.



Architectural rationale lives under [`docs/adr/`](./docs/adr/) (ADR 0001–0027).



## Prerequisites



- **Node.js 20.x** (see [`package.json`](./package.json) `engines` and ADR 0015)

- **pnpm** recommended (ADR 0014) — see [Install pnpm](#install-pnpm-windows--node-20); **npm works too** if you prefer not to install pnpm.



## Install pnpm (Windows / Node 20+)



Node ships with **Corepack**. In **PowerShell** (or cmd) run:



```powershell

corepack enable

corepack prepare pnpm@10.10.0 --activate

pnpm --version

```



Alternative — global install with npm:



```powershell

npm install -g pnpm

pnpm --version

```



If `corepack` is not recognized, your Node install may be incomplete — reinstall Node 20 LTS from [nodejs.org](https://nodejs.org/).



### Using npm instead of pnpm



You do not have to use pnpm; swap commands like this:



| With pnpm | With npm |

| --- | --- |

| `pnpm install` | `npm install` |

| `pnpm dev` | `npm run dev` |

| `pnpm test` | `npm test` |

| `pnpm run build` | `npm run build` |



(lockfile will be `package-lock.json` instead of `pnpm-lock.yaml` — fine for this repo)



## Quick start



From this directory (examples for **PowerShell**; use `cp` if you are in Git Bash):



```powershell

pnpm install

# or: npm install



Copy-Item .env.example .env

# Edit .env — TELEGRAM_OPERATOR_USER_ID + each TELEGRAM_BOT_* token from the manifest.



Copy-Item sessions/manifest.example.yaml sessions/manifest.yaml

# Edit workspacePath + session ids.



pnpm test

pnpm run dev

# or: npm test   then   npm run dev

```



Production-ish run uses compiled JS:



```powershell

pnpm run build

pnpm start

# or: npm run build   then   npm start

```



## Environment



| Variable | Purpose |

| --- | --- |

| `TELEGRAM_OPERATOR_USER_ID` | Numeric Telegram user id for **global operator identity** pinning |

| `SESSION_MANIFEST_PATH` | YAML manifest relative to repo root (default `sessions/manifest.yaml`) |

| `SHUTDOWN_TIMEOUT_MS` | Parallel grammY shutdown cap (ADR 0027), default `8000` |

| `LOG_LEVEL` | Pino log level |



Per-session bot tokens live in `.env`; keys **must match** each session’s `botTokenEnv` in the manifest (Hybrid bridge configuration — ADR 0009).



## Scripts



- `pnpm dev` / `npm run dev` — `tsx` watch + pretty logs (`PINO_PRETTY=1`)

- `pnpm run build` / `npm run build` + `pnpm start` / `npm start` — `tsc` → `dist/`, Node ESM runner

- `pnpm test` / `npm test` — Vitest

- `pnpm lint` / `npm run lint` — ESLint

- `pnpm format` / `npm run format` — Prettier



## Operational notes



- **Silent pinning refusal** (ADR 0012): non-operator senders are dropped locally with **logs only** — no Telegram reply.

- Telegram still delivers unsolicited private-chat updates ([Bots FAQ](https://core.telegram.org/bots/faq)); this bridge is the enforcement boundary.
