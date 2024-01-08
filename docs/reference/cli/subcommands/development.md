---
title: Development and testing
description: Teku command line interface subcommands
sidebar_position: 7
---

# Development and testing subcommands

The following subcommands are used for development and testing purposes.

## `genesis`

Generate a genesis state for a network.

```bash
teku genesis
```

<!-- links -->

[environment variables]: ../index.md##teku-environment-variables
[configuration file]: ../../../how-to/configure/use-config-file.md

## `peer`

Generate a list of peer IDs, including the private key, public key, and peer ID.

```bash
teku peer
```

## `transition`

Manually run state transitions for blocks or slots for debugging.

```bash
teku transition
```