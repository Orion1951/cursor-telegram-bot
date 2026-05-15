## Parent

Tracked under Phase 02 PRD: `docs/prd/phase-02-automated-executor-binding.md`.

## What to build

End-to-end path where authorised **Dedicated steering bot** text no longer terminates in an acknowledgement echo alone. Replace the behavioural contract with invocation of an **executor port**: a typed boundary the bridge calls with **Session** identity plus operator text plus **Workspace** anchoring hints from the hybrid manifest catalogue. Provide an in-process **stub executor** producing deterministic substantive output keyed by Session (clearly labelled as simulated) returned to Telegram. Prove **explicit operator pinning** and multi-bot ingress remain untouched; prove logs carry correlation identity from receipt through outbound reply sufficient for workstation audits—without emitting **bridge secret annex** payloads.

This slice is deliberately implementable **before** a real Cursor toolchain hook exists so integration risk is postponed without pausing tracer velocity.

## Acceptance criteria

- [ ] Authorised operator messages on a Session’s Dedicated steering bot receive a substantive reply attributable to executor port output—not the literal echo‑back of inbound text framed as acknowledgement.
- [ ] Stub output is visibly distinguishable so operators cannot confuse it with final production binding.
- [ ] Non‑operator senders observe **silent pinning refusal** unchanged; structured workstation breadcrumbs preserved.
- [ ] Automated regression tests guard the executor port boundary (stub substitutes without Telegram network).
- [ ] Correlation identifiers exist spanning inbound handling and outbound Telegram send attempts (values need not traverse cross‑process telemetry yet).

## Blocked by

None — can start immediately.
