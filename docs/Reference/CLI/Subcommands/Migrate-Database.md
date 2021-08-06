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

## data-storage-archive-frequency

=== "Syntax"

    ```bash
    --data-storage-archive-frequency=<NUMBER>
    ```

=== "Command Line"

    ```bash
    --data-storage-archive-frequency=1028
    ```

=== "Environment Variable"

    ```bash
    TEKU_DATA_STORAGE_ARCHIVE_FREQUENCY=1028
    ```

=== "Configuration File"

    ```bash
    data-storage-archive-frequency: 1028
    ```

Set the frequency (in slots) at which to store finalized states to disk. Defaults to 2048.

This option is ignored if [`--data-storage-mode`](#data-storage-mode) is set to `prune`.

## data-storage-mode

=== "Syntax"

    ```bash
    --data-storage-mode=<STORAGE_MODE>
    ```

=== "Command Line"

    ```bash
    --data-storage-mode=archive
    ```

=== "Environment Variable"

    ```bash
    TEKU_DATA_STORAGE_MODE=archive
    ```

=== "Configuration File"

    ```bash
    data-storage-mode: "archive"
    ```

Set the strategy for handling historical chain data. Valid options are `prune` and `archive`.
Defaults to `prune`.

## data-validator-path

=== "Syntax"

    ```bash
    --data-validator-path=<PATH>
    ```

=== "Command Line"

    ```bash
    --data-validator-path=/home/me/me_validator
    ```

=== "Environment Variable"

    ```bash
    TEKU_DATA_VALIDATOR_PATH=/home/me/me_validator
    ```

=== "Configuration File"

    ```bash
    data-validator-path: "/home/me/me_validator"
    ```

Path to the validator client data. Defaults to `<data-base-path>/validator` where `<data-base-path>`
is specified using [`--data-base-path`](#data-base-path-data-path).

## eth1-deposit-contract-address

=== "Syntax"

    ```bash
    --eth1-deposit-contract-address=<ADDRESS>
    ```

=== "Command Line"

    ```bash
    --eth1-deposit-contract-address=0x77f7bED277449F51505a4C54550B074030d989bC
    ```

=== "Environment Variable"

    ```bash
    TEKU_ETH1_DEPOSIT_CONTRACT_ADDRESS=0x77f7bED277449F51505a4C54550B074030d989bC
    ```

=== "Configuration File"

    ```bash
    eth1-deposit-contract-address: "0x77f7bED277449F51505a4C54550B074030d989bC"
    ```

Ethereum 1.0 address of the deposit contract. Only required when creating a custom network.

The deposit contract address can also be defined in:

* The genesis file specified using [`--initial-state`](#initial state)
* The predefined network supplied using [`--network`](#network).

## initial-state

=== "Syntax"

    ```bash
    --initial-state=<FILE>
    ```

=== "Command Line"

    ```bash
    --initial-state=/home/me/genesis.ssz
    ```

=== "Environment Variable"

    ```bash
    TEKU_INITIAL_STATE=/home/me/genesis.ssz
    ```

=== "Configuration File"

    ```bash
    initial-state: "/home/me/genesis.ssz"
    ```

Path or URL to an SSZ-encoded state file. The state file can be used to specify the genesis state,
or a [recent finalized checkpoint state from which to sync](../../../HowTo/Get-Started/Checkpoint-Start.md).

This option does not need to be specified if the genesis state is provided by the network specified
using the [`--network`](#network) option.

!!! note

    If overriding the initial state in a custom network, you must supply the initial state
    file at each restart.

!!! tip

    [Infura](https://infura.io/) can be used as the source of initial states with
    `--initial-state https://{projectid}:{secret}@eth2-beacon-mainnet.infura.io/eth/v1/debug/beacon/states/finalized`

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
