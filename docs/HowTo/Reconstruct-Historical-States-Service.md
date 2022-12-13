---
title: Reconstruct Historical States Service
---

# Reconstruct Historical States Service

!!! warning

    Reconstruct historical states service is an early access feature and is subject to change.

An archive node is able to reconstruct historical states from genesis up to the current checkpoint, running during
start up. This allows you to create a full archive node while also using checkpoint sync. Generating states this
way is faster as many validations can be safely skipped. It also avoids
[weak subjectivity concerns](../Concepts/Weak-Subjectivity.md).

## Configuration

When you configure Teku to run the ReconstructHistoricalStatesService, certain CLI options need to be enabled.
Including, `--Xreconstruct-historic-states=true` and `--data-storage-mode="archive"`.

An additional option can be enabled to aid this service: `--Xgenesis-state=<path>`. Otherwise, network defaults
are used here (e.g. mainnet defaults).
