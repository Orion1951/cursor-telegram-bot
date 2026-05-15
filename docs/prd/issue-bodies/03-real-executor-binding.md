## Parent

Tracked under Phase 02 PRD: `docs/prd/phase-02-automated-executor-binding.md`.

## What to build

Replace or complement the executor stub behind the unified port using the transport decided in Slice 02. Implement **automated executor binding** for at least one live **Session**, anchoring faithfully to manifest **Workspace** metadata. Honour agreed timeouts/cancellation semantics; escalate failures into explicit Telegram operator messaging (**transparent tether gaps**—no fabricated success).

## Acceptance criteria

- [ ] Real executor path exercises actual Cursor‑side toolchain per Slice 02 decision for one Session.
- [ ] Outputs surface through Telegram respecting operator authorisation funnel unchanged from earlier posture.
- [ ] Forced outage or timeout emits operator‑visible degraded notice—not silent abandonment.
- [ ] Logs retain correlation breadcrumbs without leaking tokens or unauthorised message bodies.
- [ ] Automated tests cover deterministic failure branches where feasible without live Telegram (contract / integration stubs acceptable).

## Blocked by

- https://github.com/Orion1951/cursor-telegram-bot/issues/3
- https://github.com/Orion1951/cursor-telegram-bot/issues/2
