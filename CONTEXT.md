# Telegram agent steering

Lets the user steer agent work primarily from Telegram when away from the PC, without relying on desktop chat continuity for what “the current effort” is.

## Language

**Remote-first steering**:
Directing agent work primarily from Telegram, not from the Cursor desktop UI.
_Avoid_: “Mobile companion” unless notifications-only (this context is remote-first steering, not just pings).

**Workspace**:
The distinct codebase/project area an agent run is anchored to.
_Avoid_: “Repo” unless you strictly mean one Git repository.

**Session**:
A labeled steering context tied to exactly one **Workspace**, treated as continuity for that effort (for example Medical vs Sports betting).
_Avoid_: Loose usage for chat traffic without a stable **Workspace** anchor.

**Dedicated steering bot**:
One Telegram bot account (distinct chat surface per bot identity) wired to exactly one **Session** for **Single-operator steering**.
_Avoid_: Reusing one bot identity to multiplex multiple Sessions behind commands or inferred context — that defeats chat-level isolation goals.

**Repository anchor**:
The hosted codebase history treated as authoritative engineering truth for what “the project is.”
_Avoid_: Letting unstructured chat excerpts override what is merged and reproducible.

**Hybrid execution roadmap**:
The phased plan where steering may start **desktop-tethered**, then migrate the same Session toward **cloud session** execution anchored to the same **Workspace**.
_Avoid_: “Hybrid” meaning multiple Sessions in one chat — here it strictly concerns execution posture over time.

**Desktop-tethered execution**:
The phase where progressing work depends on the **Workstation bridge** being reachable; the MVP posture runs it on the operator’s primary Cursor workstation, trading always-on availability for simplicity.
_Avoid_: Pretending the workstation is reachable when it is powered down or offline without an explicit degraded mode story.

**Cloud session execution**:
The phase where progressing work relies on remote agent infrastructure instead of requiring an interactive desktop steering surface.

**Checkpoint handoff**:
The sanctioned moment a **Session** changes primary execution posture — especially moving from **Desktop-tethered execution** to **Cloud session execution** — anchored on merged **Repository anchor** state through a **Canonical handoff record**, not verbatim replay of every prior steering message.
_Avoid_: Implicit “it should just remember” migrations without a declared boundary.

**Canonical handoff record**:
The repository-resident continuity narrative that makes a **Checkpoint handoff** authoritative for whichever executor runs next, coexisting with other durable project decisions (for example ADRs).
_Avoid_: Treating informal chat logs as replacements for the canonical record.

**Single-operator steering**:
Each **Dedicated steering bot** is intentionally private to one human operator; **Explicit operator pinning** enforces that intent by mechanically accepting inbound steering only from **sanctioned operator identities**, not merely through social norms.
_Avoid_: “Shared bot” patterns plus assuming BotFather tokens alone constrain who originates steering traffic.

**Transparent tether gaps**:
Whenever the **Workstation bridge** is absent during **Desktop-tethered execution**, steering shows explicit unavailability instead of silent replay queues; interruptions are framed as intentional posture—including operator-caused absence—rather than vague “connectivity folklore.”
_Avoid_: Implicit queue-and-retry semantics that multiply instructions when the bridge returns unless a future idempotent design is consciously introduced.

**Workstation bridge**:
The co-located process during **Desktop-tethered execution** that receives **Dedicated steering bot** traffic and forwards **Single-operator steering** toward whichever executor posture is active for that **Session**—starting with **Acknowledgement-only posture** before progressing to **Automated executor binding**.
_Avoid_: Treating the bridge as an always-on hosted service in the MVP posture—it inherits **Transparent tether gaps** with the sleeping workstation.

**Acknowledgement-only posture**:
The introductory tracer slice where the **Workstation bridge** proves routing fidelity—bot isolation, ingestion, audits—while deliberately not driving automated codebase mutations beyond acknowledgements operators can sanity-check quickly.
_Avoid_: Blending speculative executor side effects into the earliest wiring sprint.

**Automated executor binding**:
The succeeding tracer slice where acknowledged steering activates the workstation’s executor toolchain for each **Workspace** anchored **Session**.

**Session manifest**:
The repository-anchored catalogue describing Sessions, their **Dedicated steering bot** names, Workspace anchors, and other non-sensitive wiring metadata intended for readability and review alongside ADRs.
_Avoid_: Treating the manifest alone as carrying Telegram authentication secrets.

**Bridge secret annex**:
The operator-local overlay—never part of revision-controlled history—that supplies rotation-sensitive Telegram tokens **and sanctioned operator identities**, plus analogous credentials referenced by Session manifest identifiers.
_Avoid_: Committing annex material “temporarily”; anything sensitive belongs here or an equivalent vault, not accidental pushes.

**Hybrid bridge configuration**:
Pairing readable **Session manifest** entries anchored in the **Repository anchor** with operator-local **Bridge secret annex** data so manifests stay peer-reviewable yet tokens never masquerade as ordinary files.
_Avoid_: Duplicating overlapping secrets inside manifests “for convenience.”

**Explicit operator pinning**:
The mandatory ingress rule that each **Dedicated steering bot** ignores Telegram traffic unless its sender maps to **sanctioned operator identities**, blocking everyone else regardless of bots’ incidental discoverability.
_Avoid_: Missing audit breadcrumbs when rejecting senders, even while applying **Silent pinning refusal** on Telegram’s surface.

**Sanctioned operator identity**:
The Telegram user identifiers—typically numeric—that **Explicit operator pinning** treats as authoritative for **Single-operator steering**, stored exclusively inside **Bridge secret annex** material.
_Avoid_: Publishing these identifiers in **Session manifests** or commit history.

**Global operator identity**:
The single **sanctioned operator identity** declared once inside **Bridge secret annex** wiring and reused by every **Dedicated steering bot**, instead of repeating per-Session identifiers that could drift apart.
_Avoid_: Forking contradictory operator ids across Session annex fragments without consciously expanding beyond **Single-operator steering**.

**Silent pinning refusal**:
The MVP refusal surface for failed **explicit operator pinning** checks: unauthorized senders get **no Telegram bot reply**, only workstation-side breadcrumbs, limiting feedback to probing accounts.
_Avoid_: Confusing this with “silent failure” everywhere—authorised operator traffic remains explicitly acknowledged elsewhere.

**Deferred refusal echo**:
An optional post-MVP escalation where the bridge may emit at most one terse, rate-limited Telegram refusal notice per offending identity before reverting back to silence—accepted only after spam patterns justify signalling.
_Avoid_: Chatty perpetual refusals that amplify scanner noise against rate limits.

**Single-package posture**:
MVP concentrates the TypeScript workstation bridge—long polling loops, pinning, manifest ingestion—within one cohesive distributable surface so iterative **Desktop-tethered execution** stays lightweight.
_Avoid_: Splintering workspaces before tracer slices stabilize.

**Deferred package splintering**:
Optional post-MVP refactor where publish-worthy modules peel into sibling packages once cloud execution or redistribution needs sharper boundaries—and after behaviour earns confidence.
_Avoid_: Forcing fragmentation solely for aesthetics ahead of observable scaling pain.

## Relationships

- Each **Session** is anchored to exactly one **Workspace**.
- Each **Session** exposes steering through exactly one **Dedicated steering bot**, so Telegram chat threads cannot accidentally inherit another effort’s continuity, and interaction is constrained to **Single-operator steering**.
- **Remote-first steering** happens through whichever **Dedicated steering bot** the operator intentionally opened — not desktop focus.
- Execution follows a **Hybrid execution roadmap**: Sessions may migrate from **Desktop-tethered execution** — initially using a **Workstation bridge** subject to **Transparent tether gaps** — toward **Cloud session execution** without renaming the **Dedicated steering bot** or the **Workspace** anchor — continuity crosses the boundary through a **Checkpoint handoff** backed by an updated **Canonical handoff record**, not assumed perfect transcript mirroring.
- While desktop-tethering is still MVP-shaped, each **Workstation bridge** retrieves **Dedicated steering bot** steering without provisioning always-on public ingress routes advertised to Telegram—accepting tether-specific connectivity trade-offs.
- The **Workstation bridge** evolves through tracer slices beginning in **Acknowledgement-only posture** before graduating to **Automated executor binding** once fidelity looks boring.
- Operational wiring follows **Hybrid bridge configuration**: **Session manifest** entries documented in **Repository anchor** complemented by operator-local **Bridge secret annex** data so secrets never masquerade as reviewable artifacts.
- Ingress obeys **Explicit operator pinning**: every **Dedicated steering bot** validates senders against the **global operator identity** (singular for this ecosystem) anchored in **Bridge secret annex**, blocking all other Telegram senders from affecting steering—even though Telegram forwards their messages to Bot API transports.
- Unauthorized senders observe **Silent pinning refusal** on MVP Telegram surfaces (**Deferred refusal echo** remains consciously optional afterward).
- The workstation bridge codebase begins in **Single-package posture**, deferring optional **Deferred package splintering** until publishable subsets justify the ceremony.

## Example dialogue

> **User:** Every bridge concern lives inside one cohesive package initially; fancier workspaces wait until distributors actually care.
> **System:** **Single-package posture** governs MVP; optional **Deferred package splintering** follows confidence, not aspiration.
>
> **User:** Checked-in manifests list each Session and Workspace anchor plainly, while secrets live purely in annex material only their laptop sees.
> **System:** **Hybrid bridge configuration** preserves reviewability without inviting tokens into **Repository anchor** history.
>
> **User:** First iteration: Telegram messages simply round-trip acknowledgement so they prove each Session’s isolation before anything touches code. Later: same bridge arms **Automated executor binding**.
> **System:** **Acknowledgement-only posture** is the sanctioned ramp, not cheating by wiring risky automation prematurely.
>
> **User:** They message Medical while forgetting the laptop sleeps; Telegram gets a candid “bridge away” acknowledgement instead of a fake promise of queued magic.
> **System:** **Transparent tether gaps** keep expectations aligned with deliberate **Desktop-tethered execution** posture.
>
> **User:** Messages only arrive from the owner on the Sports betting bot; nobody else gets added to those chats intentionally. Collaboration happens through normal GitHub flows instead of shared steering surfaces.
> **System:** **Single-operator steering** is the designed expectation, keeping accountability aligned with whoever owns that **Dedicated steering bot**.
>
> **User:** They rely on enumerated **sanctioned operator identities**: every stranger’s Telegram payloads are discarded before acknowledgement; only the owner counts.
> **System:** That is **Explicit operator pinning** realising **Single-operator steering**, not etiquette alone.
>
> **User:** Random Telegram accounts probing the Dedicated bots hear crickets publicly while workstations log breadcrumbs—maybe someday one polite refusal burst if scanners won’t quit.
> **System:** MVP **Silent pinning refusal** dominates; optional **Deferred refusal echo** awaits real abuse signal.
>
> **User:** Medical, Sports betting—every Dedicated bot checks the exact same Telegram numeric sender id wired once in annex; divergence would be pointless.
> **System:** The **global operator identity** keeps **Explicit operator pinning** consistent across Sessions.
>
> **User:** After desktop work pauses, they complete a Medical **Checkpoint handoff**: authoritative code merges publish an updated **Canonical handoff record** describing what executes next under **Cloud session execution**.
> **System:** Cloud reads repository truth — including ADRs alongside the canonical record — without replaying every Telegram message.
