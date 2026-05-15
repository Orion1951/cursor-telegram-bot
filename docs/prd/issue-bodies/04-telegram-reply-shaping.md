## Parent

Tracked under Phase 02 PRD: `docs/prd/phase-02-automated-executor-binding.md`.

## What to build

Harden Telegram outbound delivery once executor payloads become non‑trivial. Apply chunking or summarisation policy so replies respect Bot API sizing rules; gracefully handle Telegram API errors distinct from upstream executor failures—always aligned with honesty about partial delivery.

## Acceptance criteria

- [ ] Very long deterministic executor payloads deliver without truncation surprise (chunked sequencing or summarized header + continuation strategy documented in issue comments when merged).
- [ ] Telegram‑edge failures propagate as explicit operator‑visible degradation distinct from Cursor failures.
- [ ] Regression harness covers maximal length fixture without live network reliance where possible.
- [ ] Rate‑limit backoff strategy articulated (minimal viable: detect, surface notice, omit infinite blind retry loops).

## Blocked by

- https://github.com/Orion1951/cursor-telegram-bot/issues/4
