# pnpm as the workstation bridge package manager

The monolithic workstation bridge adopts pnpm despite slightly higher newcomer friction versus plain npm—its stricter symlinked node layout keeps Windows laptop disks predictable ahead of hypothetical multi-package carve-outs later. Falling back npm remains workable if onboarding someone unfamiliar with pnpm, but default developer flows standardize on pnpm lock semantics.
