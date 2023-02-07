---
title: Migrate to Teku
description: Migrate to Teku guide
sidebar_position: 6
---

# Migrate to Teku

Migrate from a different Ethereum consensus client to Teku to contribute to [client diversity](https://clientdiversity.org/).

When migrating from a different client, consider the following:

- You can [import a slashing protection database](../../Reference/CLI/Subcommands/Slashing-Protection.md#import).
- You might need to update your [network ports](../Find-and-Connect/Improve-Connectivity.md).
- The way Teku handles [validator keys](../../Reference/CLI/CLI-Syntax.md#validator-keys) might differ from your previous client. Teku also supports [using Web3Signer](../External-Signer/Use-External-Signer.md).
- You can skip the long initial sync period by using Teku's [checkpoint start](../Get-Started/Checkpoint-Start.md) capability.

Find guides to switch from specific clients on the [client diversity website](https://clientdiversity.org/#switch).
