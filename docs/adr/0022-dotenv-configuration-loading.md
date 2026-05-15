# dotenv-backed secret bootstrap

Development and production executions load operator-local annex secrets through **dotenv** so `tsx dev` parity matches `node dist/index.js` without divergent CLI `--env-file` incantations (Node flag availability varies across shell wrappers anyway). Dedicated steering bot tokens plus **global operator identity** wiring stay outside git while Session manifests retain repository visibility per earlier ADRs.
