---
title: Reconstruct Historical States Service
---

# Reconstruct Historical States Service

!!! warning

    Reconstruct historical states service is an early access feature and is subject to change.

An archive node is able to reconstruct historical states from genesis up to the current checkpoint. This service runs during start up.

## Configuration

When you configure Teku to run the ReconstructHistoricalStatesService, certain CLI options need to be enabled. Inlcuding,
`--Xreconstruct-historic-states=true` and `--data-storage-mode="archive"`.

An additional option can be enabled to aid this service: `--Xgenesis-state=<path>`. Otherwise, network defaults are used here (e.g. mainnet defaults).
