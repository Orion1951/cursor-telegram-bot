# Trace acknowledgement-only wiring before executor binding

The workstation bridge ships in two intentional slices: first acknowledge and audit Telegram steering per dedicated bot (isolation, single-operator guardrails, transparent tether gaps), then bind to automated executor tooling once that path looks boring. Collapsing the slices would risk unsafe agent side effects while multi-bot configuration is still volatile.
