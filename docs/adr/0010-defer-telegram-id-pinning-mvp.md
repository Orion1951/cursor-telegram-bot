# Defer Telegram ID pinning for MVP ingestion

This decision is **deprecated** — superseded by [ADR 0011](./0011-mandatory-telegram-operator-pinning.md).

Initially we accept Implicit correspondent posture secured only by unpublished bot invites and BotFather tokens instead of mechanically enumerating operator Telegram identifiers. Bot tokens authenticate our bridge to Telegram, not the reverse—they do not stop anyone who obtains a `@handle`. Enumerated pinning stays an optional escalation (Explicit operator pinning) once Automated executor binding raises stakes or leakage appears practical.
