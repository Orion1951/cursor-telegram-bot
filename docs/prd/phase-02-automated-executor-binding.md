# PRD — Phase 02: Automated executor binding

## Status

Draft → ready for tracer-bullet implementation slices (see companion GitHub issues).

## Goals

Advance the **Workstation bridge** from **Acknowledgement-only posture** — where authorised **Dedicated steering bot** traffic is validated and echoed for routing fidelity — into **Automated executor binding**, where **Single-operator steering** text invokes the workstation’s executor toolchain anchored to each **Session**’s **Workspace**, and substantive outcomes are delivered back via Telegram.

Supports **remote-first steering** during **desktop-tethered execution** without requiring the operator to shift focus back to Cursor chat for every turn.

## Non-goals (this phase)

- **Cloud session execution** or **checkpoint handoff** from desktop to cloud (design may anticipate; implementation deferred).
- Multi-operator **Dedicated steering bots** beyond **explicit operator pinning** as already enforced.
- Rich media steering (photos, documents, voice) beyond plain text ingestion.
- Automatic queue-and-retry of steering when the bridge or executor is down beyond **transparent tether gaps** messaging (explicit “unavailable”, not silent backlog replay).
- Redistributable multi-host bridge packaging (**deferred package splintering**).

## Personas & stories

### P1 — Primary operator

1. When I send a text message from Telegram to the **Dedicated steering bot** for a given **Session**, the **Workstation bridge** shall forward my steering toward that **Session**’s anchored **Workspace** executor and reply on Telegram with the executor’s substantive output (not a simple echo of my message).
2. When the workstation executor cannot run or times out during **desktop-tethered execution**, I shall receive a clear failure notice consistent with **transparent tether gaps** (no fabricated success).

### P2 — Future reviewer / agent implementer

1. Behaviour shall remain traceable: structured breadcrumbs correlate inbound Telegram turns with executor attempts without leaking **bridge secret annex** material in logs.

## Constraints & principles

| Topic | Requirement |
| --- | --- |
| Vocabulary | Use terms from **Repository anchor** `CONTEXT.md` (Session, Workspace, bridge, pinning, tether gaps). |
| Tracer sequencing | Honour ADR tracer intent: fidelity before risk — vertical slices prove end-to-end path before widening scope (see docs/adr/0008). |
| Secrets | Tokens and sanctioned operator identifiers stay only in **bridge secret annex**; manifests remain peer-reviewable. |
| Packaging | Maintain **single-package posture** unless a slice explicitly justifies extracting a submodule. |

## Functional requirements

### F1 — Session-scoped forwarding

Inbound authorised text shall be routed to executor logic keyed by manifest **Session** identity and that Session’s **Workspace** anchor metadata (already present in hybrid configuration pattern).

### F2 — Executor abstraction

Introduce an internal contract between Telegram ingress and the executor so tests can substitute a deterministic stub **before** a real Cursor integration lands (first vertical slice).

### F3 — Real desktop-tether binding

Behind the abstraction, implement one chosen mechanism to run or query the Cursor-side agent toolchain for **at least one** Session on the operator workstation. Choice must be documented (ADR-ready) covering failure modes and timeouts.

### F4 — Outbound Telegram shaping

Executor output delivered to Telegram must respect message size limits through chunking or summarisation strategy; malformed API responses degrade with operator-visible messaging, not silent drop.

### F5 — Correlation

Each steering turn exposes a correlation identity in logs spanning Telegram receipt, executor invocation, and reply issuance; optionally link Telegram outbound messages via reply threading **if** trivial within grammY ergonomics.

## Success metrics (MVP)

- Authorised operator can complete one scripted steering prompt per Session and observe non-echo substantive output attributable to executor path.
- Forced executor failure yields explicit Telegram-side notice within agreed timeout envelope.
- No regression in **silent pinning refusal** for non-operator senders.

## Risks & open questions

- Choosing the Cursor invocation surface (**HITL** decision) gates production-quality binding — stub-first slice deliberately unblocks parallel engineering.
- Telegram rate limits vs long-running agent turns may require deliberate chunking UX.
- Sensitive **Workspace** content in replies assumes operator-controlled channel — document trust boundary explicitly in ADR for chosen transport.

## Related documents

- `CONTEXT.md` — ubiquitous language  
- `docs/adr/0008-tracer-slices-ack-then-executor-binding.md`  
- `docs/adr/0002-hybrid-desktop-to-cloud-session-execution.md`  

## Appendix — Tracer issue linkage

| Role | GitHub |
| --- | --- |
| Rollup Epic (tracking only) | [#7](https://github.com/Orion1951/cursor-telegram-bot/issues/7) |
| AFK — Executor port & stub | [#2](https://github.com/Orion1951/cursor-telegram-bot/issues/2) |
| HITL — Desktop transport ADR | [#3](https://github.com/Orion1951/cursor-telegram-bot/issues/3) |
| AFK — Real executor binding | [#4](https://github.com/Orion1951/cursor-telegram-bot/issues/4) |
| AFK — Telegram reply shaping | [#5](https://github.com/Orion1951/cursor-telegram-bot/issues/5) |
| AFK — Correlation & threading | [#6](https://github.com/Orion1951/cursor-telegram-bot/issues/6) |


