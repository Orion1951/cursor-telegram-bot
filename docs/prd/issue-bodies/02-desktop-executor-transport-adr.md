## Parent

Tracked under Phase 02 PRD: `docs/prd/phase-02-automated-executor-binding.md`.

## What to build

Resolve how **desktop‑tethered execution** activates the workstation’s Cursor‑anchored toolchain for exactly one labelled **Session** at a time. Produce an ADR‑ready artefact documenting the chosen invocation surface(s), timeouts, concurrency guarantees, observable failure taxonomy, credential posture (anything beyond **bridge secret annex** forbidden), parity with forthcoming **checkpoint handoff** assumptions, and how **transparent tether gaps** appear when tooling is absent.

Outcome must unblock implementers swapping the stub executor for real behaviour without revisiting foundational transport arguments.

## Acceptance criteria

- [ ] Written decision record merged into Repository anchor documenting chosen transport rationale and discarded alternatives succinctly.
- [ ] Contracts include minimum timeout / cancellation semantics and operator‑visible degraded behaviour linkage.
- [ ] Security stance stated: boundaries between Telegram ingress, filesystem **Workspace**, and outbound messaging.
- [ ] Review acknowledgement recorded (issue comment suffices) signalling readiness for binding implementation slices.

## Blocked by

None — can run in parallel once Phase 02 kickoff acknowledged.
