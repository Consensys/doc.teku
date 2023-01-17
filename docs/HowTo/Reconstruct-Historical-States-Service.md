---
title: Reconstruct Historical States Service
---

# Reconstruct Historical States Service

An archive node is able to reconstruct historical states from genesis up to the current checkpoint, running during
start up. This allows you to create a full archive node while also using checkpoint sync. Generating states this
way is faster as many validations can be safely skipped. It also avoids
[weak subjectivity concerns](../Concepts/Weak-Subjectivity.md).

## Configuration

When you configure Teku to run the ReconstructHistoricalStatesService, certain CLI options need to be enabled.
Including, `--reconstruct-historic-states=true` and `--data-storage-mode="archive"`.

An additional option can be enabled to aid this service: `--genesis-state=<path>`. Otherwise, network defaults
are used here (such as mainnet defaults).
