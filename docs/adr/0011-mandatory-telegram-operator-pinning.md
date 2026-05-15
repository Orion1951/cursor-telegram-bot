# Mandatory Telegram operator pinning

This decision is **accepted** and **supersedes ADR 0010**.

After reconciling Telegram’s FAQ (bots receive all users’ private-chat updates anyway) with the Single-operator steering goal, enumerated **sanctioned operator identities** must live beside bot tokens inside bridge secret annexes so the workstation rejects every unsolicited sender—even when Telegram faithfully delivers their payloads. Deferred pinning (ADR 0010) wrongly assumed obscurity suffices once automated executor binding appears; we instead treat pinning as foundational trust fabric from the acknowledgement tracer onward.

Exactly one **global operator identity** is wired for now: identical Telegram numeric user id checked by every Dedicated steering bot annex entry, rejecting per-bot divergence until a future collaborator truly needs isolated identities.
