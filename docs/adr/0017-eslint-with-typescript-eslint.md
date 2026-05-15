# ESLint paired with typescript-eslint and Prettier

The workstation bridge standardizes linting on ESLint using the typescript-eslint toolchain so IDE feedback and CI share one rule universe while respecting the strict TS compiler posture (ADR 0016). **Prettier** owns formatting, with **eslint-config-prettier** (or equivalent) disabling overlapping stylistic ESLint rules so the two tools stay composable instead of fighting each other.
