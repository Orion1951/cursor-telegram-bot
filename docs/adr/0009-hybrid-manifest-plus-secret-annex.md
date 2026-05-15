# Hybrid bridge manifests plus secret annexes

Session manifests live in Repository anchor alongside ADRs because they codify Workspace anchors and Dedicated steering bot metadata without hauling Telegram tokens along for the ride; rotation-sensitive annex material overrides those manifests privately on the workstation. Full gitignored blobs were rejected—they hide valuable review context—yet committing manifests alone was unacceptable because naive convenience commits leak bot credentials instantly.
