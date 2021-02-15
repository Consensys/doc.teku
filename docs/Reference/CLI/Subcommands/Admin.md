---
title: Subcommand options
---

# `admin`

Used to perform administrative tasks. To use the `admin` subcommand run:

```bash
teku admin [subcommand] [subcommand] [options]
```

You can also supply the subcommand options using [environment variables or a configuration file].

## `weak-subjectivity`

Display or clear weak subjectivity configuration.

### `clear-state`

Clears the stored weak subjectivity configuration.

#### config-file

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --config-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity clear-state --config-file=/home/me/me_node/config.yaml
    ```

=== "Environment Variable"

    ```bash
    TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
    ```

The path to the YAML configuration file.
The default is `none`.

#### data-base-path, data-path

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --data-base-path=<PATH>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity clear-state --data-base-path=/home/me/me_node
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

#### data-beacon-path

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --data-beacon-path=<PATH>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity clear-state --data-beacon-path=/home/me/me_beacon
    ```

=== "Environment Variable"

    ```bash
    TEKU_DATA_BEACON_PATH=/home/me/me_beacon
    ```

=== "Configuration File"

    ```bash
    data-beacon-path: "/home/me/me_beaon"
    ```

Path to the beacon chain client data. Defaults to `<data-base-path>/beacon` where `<data-base-path>`
is specified using [`--data-base-path`](#data-base-path-data-path).

#### data-storage-archive-frequency

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --data-storage-archive-frequency=<NUMBER>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity clear-state --data-storage-archive-frequency=1028
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

!!! note
    Specifying a larger number of slots as the archive frequency has a potentially higher overhead
    for retrieving finalized states since more states may need to be regenerated to get to the
    requested state. Specifying a lower number of slots as the frequency increases the disk space
    usage.

    For example, `--data-storage-archive-frequency=1` uses maximum disk space but has the lowest
    response time for retrieving a finalized state since each slot state is saved, whereas
    `--data-storage-archive-frequency=2048` uses less disk space, but may need to regenerate the
    state because every 2048th slot state is saved.

#### data-storage-mode

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --data-storage-mode=<STORAGE_MODE>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity clear-state --data-storage-mode=archive
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

#### data-validator-path

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --data-validator-path=<PATH>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity clear-state --data-validator-path=/home/me/me_validator
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

#### eth1-deposit-contract-address

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --eth1-deposit-contract-address=<ADDRESS>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity clear-state --eth1-deposit-contract-address=0x77f7bED277449F51505a4C54550B074030d989bC
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

#### network

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --network=<NETWORK>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity clear-state --network=mainnet
    ```

=== "Environment Variable"

    ```bash
    TEKU_NETWORK=mainnet
    ```

=== "Configuration File"

    ```bash
    network: "mainnet"
    ```

Predefined network configuration. Accepts a predefined network name, or file path or URL
to a YAML configuration file. The default is `mainnet`.

Possible values are:

| Network   | Chain   | Type        | Description                                                         |
|-----------|---------|-------------|---------------------------------------------------------------------|
| `mainnet` | Eth 2.0 | Production  | Main network.                                                       |
| `minimal` | Eth 2.0 | Test        | Used for local testing and development networks.                    |
| `pyrmont` | Eth 2.0 | Test        | Multi-client testnet.                                               |

Predefined networks can provide defaults such the initial state of the network,
bootnodes, and the address of the Ethereum 1.0 deposit contract.

### `display-state`

Displays the stored weak subjectivity configuration.

#### config-file

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --config-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity display-state --config-file=/home/me/me_node/config.yaml
    ```

=== "Environment Variable"

    ```bash
    TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
    ```

The path to the YAML configuration file.
The default is `none`.

#### data-base-path, data-path

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --data-base-path=<PATH>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity display-state --data-base-path=/home/me/me_node
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

#### data-beacon-path

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --data-beacon-path=<PATH>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity display-state --data-beacon-path=/home/me/me_beacon
    ```

=== "Environment Variable"

    ```bash
    TEKU_DATA_BEACON_PATH=/home/me/me_beacon
    ```

=== "Configuration File"

    ```bash
    data-beacon-path: "/home/me/me_beaon"
    ```

Path to the beacon chain client data. Defaults to `<data-base-path>/beacon` where `<data-base-path>`
is specified using [`--data-base-path`](#data-base-path-data-path).

#### data-storage-archive-frequency

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --data-storage-archive-frequency=<NUMBER>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity display-state --data-storage-archive-frequency=1028
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

!!! note
    Specifying a larger number of slots as the archive frequency has a potentially higher overhead
    for retrieving finalized states since more states may need to be regenerated to get to the
    requested state. Specifying a lower number of slots as the frequency increases the disk space
    usage.

    For example, `--data-storage-archive-frequency=1` uses maximum disk space but has the lowest
    response time for retrieving a finalized state since each slot state is saved, whereas
    `--data-storage-archive-frequency=2048` uses less disk space, but may need to regenerate the
    state because every 2048th slot state is saved.

#### data-storage-mode

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --data-storage-mode=<STORAGE_MODE>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity display-state --data-storage-mode=archive
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

#### data-validator-path

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --data-validator-path=<PATH>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity display-state --data-validator-path=/home/me/me_validator
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

#### eth1-deposit-contract-address

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --eth1-deposit-contract-address=<ADDRESS>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity display-state --eth1-deposit-contract-address=0x77f7bED277449F51505a4C54550B074030d989bC
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

#### network

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --network=<NETWORK>
    ```

=== "Command Line"

    ```bash
    teku admin weak-subjectivity display-state --network=mainnet
    ```

=== "Environment Variable"

    ```bash
    TEKU_NETWORK=mainnet
    ```

=== "Configuration File"

    ```bash
    network: "mainnet"
    ```

Predefined network configuration. Accepts a predefined network name, or file path or URL
to a YAML configuration file. The default is `mainnet`.

Possible values are:

| Network   | Chain   | Type        | Description                                                         |
|-----------|---------|-------------|---------------------------------------------------------------------|
| `mainnet` | Eth 2.0 | Production  | Main network.                                                       |
| `minimal` | Eth 2.0 | Test        | Used for local testing and development networks.                    |
| `pyrmont` | Eth 2.0 | Test        | Multi-client testnet.                                               |

Predefined networks can provide defaults such the initial state of the network,
bootnodes, and the address of the Ethereum 1.0 deposit contract.

<!-- link -->
[environment variables or a configuration file]: ../CLI-Syntax.md#specifying-options
