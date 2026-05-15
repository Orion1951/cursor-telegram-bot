## Parent

Tracked under Phase 02 PRD: `docs/prd/phase-02-automated-executor-binding.md`.

## What to build

Strengthen conversational traceability beyond raw logs only: unify internal correlation identifiers spanning receipt, executor attempt, Telegram dispatch; optionally use Telegram threading (`reply_to` semantics) if low friction with grammY to bind assistant turns visually to initiating operator messages—without disrupting **Dedicated steering bot** per‑Session isolation semantics.

## Acceptance criteria

- [ ] Each operator steering turn obtains stable correlation identifier visible consistently across workstation logs (structured fields enumerated in PR/issue summary).
- [ ] If threading enabled: outbound substantive replies visually attach to their triggering inbound message deterministically across happy path scenarios.
- [ ] Threading omission path remains supported via feature toggle or guarded code path documenting fallback behaviour.
- [ ] Automated verification for correlation field propagation in stub / harness layer (existing stub slice remains valid fixture surface).

## Blocked by

- https://github.com/Orion1951/cursor-telegram-bot/issues/2
