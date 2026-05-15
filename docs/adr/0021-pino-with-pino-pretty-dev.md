# Pino logging with pino-pretty in development

Operational telemetry for the workstation bridge standardizes on **Pino** so **Silent pinning refusal** breadcrumbs, polling errors, and ingress audit lines stay structured for future aggregation. **pino-pretty** attaches only in dev/watch scripts to keep human readability without paying JSON noise in production **dist** executions.
