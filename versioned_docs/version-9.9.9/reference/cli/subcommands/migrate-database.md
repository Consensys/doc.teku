---
title: migrate-database
description: Database migration subcommand options
sidebar_position: 3
---

# `migrate-database`

[Migrate the database to a LevelDB2 database](../../../how-to/migrate-database.md).

:::note

As of v21.5.0, new Teku installations use a LevelDB2 database. Previous Teku versions use RocksDB which continue to be supported.

:::

:::caution

Before running the database migration, you must shut down the local Teku instance and confirm the process has fully exited and won't be restarted.

:::

## `config-file`

<!--tabs-->

# Syntax

```bash
teku migrate-database --config-file=<FILE>
```

# Example

```bash
teku migrate-database --config-file=/home/me/me_node/config.yaml
```

# Environment variable

```bash
TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
```

<!--/tabs-->

Path to the [YAML configuration file](../../../how-to/configure/use-config-file.md). The default is `none`.

## `data-base-path`, `data-path`

<!--tabs-->

# Syntax

```bash
teku migrate-database --data-base-path=<PATH>
```

# Example

```bash
teku migrate-database --data-base-path=/home/me/me_node
```

# Environment variable

```bash
TEKU_DATA_BASE_PATH=/home/me/me_node
```

# Configuration file

```bash
data-base-path: "/home/me/me_node"
```

<!--/tabs-->

Path to the Teku data directory. The default directory is OS-dependent:

- macOS: `~/Library/teku`
- Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`
- Windows: `%localappdata%\teku`

The default Docker image location is `/root/.local/share/teku`.

## `data-beacon-path`

<!--tabs-->

# Syntax

```bash
teku migrate-database --data-beacon-path=<PATH>
```

# Example

```bash
teku migrate-database --data-beacon-path=/home/me/me_node
```

# Environment variable

```bash
TEKU_DATA_BEACON_PATH=/home/me/me_node
```

# Configuration file

```bash
data-beacon-path: "/home/me/me_node"
```

<!--/tabs-->

Path to the beacon node data. The default is `<data-base-path>/beacon` where `<data-base-path>` is specified using [`--data-base-path`](#data-base-path-data-path).

## `network`

<!--tabs-->

# Syntax

```bash
teku migrate-database --network=<NETWORK>
```

# Example

```bash
teku migrate-database --network=mainnet
```

# Environment variable

```bash
TEKU_NETWORK=mainnet
```

# Configuration file

```bash
network: "mainnet"
```

<!--/tabs-->

Predefined network configuration. Accepts a predefined network name, or file path or URL to a YAML configuration file. See the [consensus specification](https://github.com/ethereum/consensus-specs/tree/master/configs) for examples.

The default is `mainnet`.

Possible values are:

| Network | Chain | Type | Description |
| :-- | :-- | :-- | :-- |
| `mainnet` | Consensus layer | Production | Main network |
| `minimal` | Consensus layer | Test | Used for local testing and development networks |
| `goerli` | Consensus layer | Test | Multi-client testnet |
| `gnosis` | Consensus layer | Production | Network for the [Gnosis chain](https://www.gnosis.io/) |
| `holesky` | Consensus layer | Test | Multi-client testnet |
| `sepolia` | Consensus layer | Test | Multi-client testnet |
| `chiado` | Consensus layer | Test | Gnosis [testnet](https://docs.gnosischain.com/about/networks/chiado/) |
| `lukso` | Consensus layer | Production | Network for the [Lukso chain](https://lukso.network/) |
