# Node 20.x runtime floor with phased jump to 22

The workstation bridge targets Node.js **20.x** LTS initially so ancillary desktop tooling skews conservative while TypeScript ingestion stabilizes; **`package.json` `engines`** should communicate that floor plainly. A conscious upgrade window toward **22.x** emerges post-MVP whenever dependent libraries certify and **Automated executor binding** stops thrashing—not because 22 inherently blocks development today.
