---
title: Database migration subcommand options
---

# `migrate-database`

[Migrate the database to a LevelDB2 database](../../../HowTo/Migrate-Database.md).

!!! note

    As of v21.5.0, new Teku installations use a LevelDB2 database. Previous Teku versions use
    RocksDB which continue to be supported.

## config-file

=== "Syntax"

    ```bash
    --config-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --config-file=/home/me/me_node/config.yaml
    ```

=== "Environment Variable"

    ```bash
    TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
    ```

The path to the [YAML configuration file](../../../HowTo/Configure/Use-Configuration-File.md).
The default is `none`.

## data-base-path, data-path

=== "Syntax"

    ```bash
    --data-base-path=<PATH>
    ```

=== "Command Line"

    ```bash
    --data-base-path=/home/me/me_node
    ```

=== "Environment Variable"

    ```bash
    TEKU_DATA_BASE_PATH=/home/me/me_node
    ```

=== "Configuration File"

    ```bash
    data-base-path: "/home/me/me_node"
    ```

The path to the Teku data directory. The default directory is OS dependent:

* macOS: `~/Library/teku`
* Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`
* Windows: `%localappdata%\teku`.

The default Docker image location is `/root/.local/share/teku`.

## data-beacon-path

=== "Syntax"

    ```bash
    --data-beacon-path=<PATH>
    ```

=== "Command Line"

    ```bash
    --data-beacon-path=/home/me/me_node
    ```

=== "Environment Variable"

    ```bash
    TEKU_DATA_BEACON_PATH=/home/me/me_node
    ```

=== "Configuration File"

    ```bash
    data-beacon-path: "/home/me/me_node"
    ```

Path to the beacon chain client data. Defaults to `<data-base-path>/beacon` where `<data-base-path>`
is specified using [`--data-base-path`](#data-base-path-data-path).

## network

=== "Syntax"

    ```bash
    --network=<NETWORK>
    ```

=== "Command Line"

    ```bash
    --network=mainnet
    ```

=== "Environment Variable"

    ```bash
    TEKU_NETWORK=mainnet
    ```

=== "Configuration File"

    ```bash
    network: "mainnet"
    ```

Predefined network configuration.
Accepts a predefined network name, or file path or URL to a YAML configuration file. See the
[Ethereum 2.0 specification] for examples.

The default is `mainnet`.

Possible values are:

| Network   | Chain   | Type       | Description                                      |
|:----------|:--------|:-----------|:-------------------------------------------------|
| `mainnet` | Eth 2.0 | Production | Main network.                                    |
| `minimal` | Eth 2.0 | Test       | Used for local testing and development networks. |
| `pyrmont` | Eth 2.0 | Test       | Multi-client testnet.                            |
| `prater`  | Eth 2.0 | Test       | Multi-client testnet.                            |
