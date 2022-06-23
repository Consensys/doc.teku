---
title: Subcommand options
---

# `admin`

Used to perform administrative tasks.

## `weak-subjectivity`

Display or clear weak subjectivity configuration.

### `clear-state`

Clears the stored weak subjectivity configuration.

#### `config-file`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --config-file=<FILE>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity clear-state --config-file=/home/me/me_node/config.yaml
    ```

=== "Environment variable"

    ```bash
    TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
    ```

Path to the YAML configuration file.
The default is `none`.

#### `data-base-path`, `data-path`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --data-base-path=<PATH>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity clear-state --data-base-path=/home/me/me_node
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_BASE_PATH=/home/me/me_node
    ```

=== "Configuration file"

    ```bash
    data-base-path: "/home/me/me_node"
    ```

Path to the Teku data directory. The default directory is OS-dependent:

* macOS: `~/Library/teku`
* Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`
* Windows: `%localappdata%\teku`.

The default Docker image location is `/root/.local/share/teku`.

#### `data-beacon-path`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --data-beacon-path=<PATH>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity clear-state --data-beacon-path=/home/me/me_beacon
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_BEACON_PATH=/home/me/me_beacon
    ```

=== "Configuration file"

    ```bash
    data-beacon-path: "/home/me/me_beaon"
    ```

Path to the beacon node data. The default is `<data-base-path>/beacon` where `<data-base-path>`
is specified using [`--data-base-path`](#data-base-path-data-path).

#### `data-storage-archive-frequency`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --data-storage-archive-frequency=<NUMBER>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity clear-state --data-storage-archive-frequency=1028
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_STORAGE_ARCHIVE_FREQUENCY=1028
    ```

=== "Configuration file"

    ```bash
    data-storage-archive-frequency: 1028
    ```

Set the frequency (in slots) at which to store finalized states to disk. The default is 2048.

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

#### `data-storage-mode`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --data-storage-mode=<STORAGE_MODE>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity clear-state --data-storage-mode=archive
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_STORAGE_MODE=archive
    ```

=== "Configuration file"

    ```bash
    data-storage-mode: "archive"
    ```

Set the strategy for handling historical chain data. Valid options are `prune` and `archive`.
The default is `prune`.

#### `data-validator-path`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --data-validator-path=<PATH>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity clear-state --data-validator-path=/home/me/me_validator
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_VALIDATOR_PATH=/home/me/me_validator
    ```

=== "Configuration file"

    ```bash
    data-validator-path: "/home/me/me_validator"
    ```

Path to the validator client data. The default is `<data-base-path>/validator` where `<data-base-path>`
is specified using [`--data-base-path`](#data-base-path-data-path).

#### `eth1-deposit-contract-address`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --eth1-deposit-contract-address=<ADDRESS>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity clear-state --eth1-deposit-contract-address=0x77f7bED277449F51505a4C54550B074030d989bC
    ```

=== "Environment variable"

    ```bash
    TEKU_ETH1_DEPOSIT_CONTRACT_ADDRESS=0x77f7bED277449F51505a4C54550B074030d989bC
    ```

=== "Configuration file"

    ```bash
    eth1-deposit-contract-address: "0x77f7bED277449F51505a4C54550B074030d989bC"
    ```

The address of the deposit contract. Only required when creating a custom network.

#### `network`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity clear-state --network=<NETWORK>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity clear-state --network=mainnet
    ```

=== "Environment variable"

    ```bash
    TEKU_NETWORK=mainnet
    ```

=== "Configuration file"

    ```bash
    network: "mainnet"
    ```

Predefined network configuration. Accepts a predefined network name, or file path or URL
to a YAML configuration file. The default is `mainnet`.

Possible values are:

| Network   | Chain           | Type        | Description                                      |
|-----------|-----------------|-------------|--------------------------------------------------|
| `mainnet` | Consensus layer | Production  | Main network.                                    |
| `minimal` | Consensus layer | Test        | Used for local testing and development networks. |
| `prater`  | Consensus layer | Test        | Multi-client testnet.                            |

Predefined networks can provide defaults such the initial state of the network,
bootnodes, and the address of the deposit contract.

### `display-state`

Displays the stored weak subjectivity configuration.

#### `config-file`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --config-file=<FILE>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity display-state --config-file=/home/me/me_node/config.yaml
    ```

=== "Environment variable"

    ```bash
    TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
    ```

Path to the YAML configuration file.
The default is `none`.

#### `data-base-path`, `data-path`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --data-base-path=<PATH>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity display-state --data-base-path=/home/me/me_node
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_BASE_PATH=/home/me/me_node
    ```

=== "Configuration file"

    ```bash
    data-base-path: "/home/me/me_node"
    ```

Path to the Teku data directory. The default directory is OS-dependent:

* macOS: `~/Library/teku`
* Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`
* Windows: `%localappdata%\teku`.

The default Docker image location is `/root/.local/share/teku`.

#### `data-beacon-path`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --data-beacon-path=<PATH>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity display-state --data-beacon-path=/home/me/me_beacon
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_BEACON_PATH=/home/me/me_beacon
    ```

=== "Configuration file"

    ```bash
    data-beacon-path: "/home/me/me_beaon"
    ```

Path to the beacon node data. The default is `<data-base-path>/beacon` where `<data-base-path>`
is specified using [`--data-base-path`](#data-base-path-data-path).

#### `data-storage-archive-frequency`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --data-storage-archive-frequency=<NUMBER>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity display-state --data-storage-archive-frequency=1028
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_STORAGE_ARCHIVE_FREQUENCY=1028
    ```

=== "Configuration file"

    ```bash
    data-storage-archive-frequency: 1028
    ```

Set the frequency (in slots) at which to store finalized states to disk. The default is 2048.

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

#### `data-storage-mode`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --data-storage-mode=<STORAGE_MODE>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity display-state --data-storage-mode=archive
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_STORAGE_MODE=archive
    ```

=== "Configuration file"

    ```bash
    data-storage-mode: "archive"
    ```

Set the strategy for handling historical chain data. Valid options are `prune` and `archive`.
The default is `prune`.

#### `data-validator-path`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --data-validator-path=<PATH>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity display-state --data-validator-path=/home/me/me_validator
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_VALIDATOR_PATH=/home/me/me_validator
    ```

=== "Configuration file"

    ```bash
    data-validator-path: "/home/me/me_validator"
    ```

Path to the validator client data. The default is `<data-base-path>/validator` where `<data-base-path>`
is specified using [`--data-base-path`](#data-base-path-data-path).

#### `eth1-deposit-contract-address`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --eth1-deposit-contract-address=<ADDRESS>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity display-state --eth1-deposit-contract-address=0x77f7bED277449F51505a4C54550B074030d989bC
    ```

=== "Environment variable"

    ```bash
    TEKU_ETH1_DEPOSIT_CONTRACT_ADDRESS=0x77f7bED277449F51505a4C54550B074030d989bC
    ```

=== "Configuration file"

    ```bash
    eth1-deposit-contract-address: "0x77f7bED277449F51505a4C54550B074030d989bC"
    ```

The address of the deposit contract. Only required when creating a custom network.

#### `network`

=== "Syntax"

    ```bash
    teku admin weak-subjectivity display-state --network=<NETWORK>
    ```

=== "Example"

    ```bash
    teku admin weak-subjectivity display-state --network=mainnet
    ```

=== "Environment variable"

    ```bash
    TEKU_NETWORK=mainnet
    ```

=== "Configuration file"

    ```bash
    network: "mainnet"
    ```

Predefined network configuration. Accepts a predefined network name, or file path or URL
to a YAML configuration file. The default is `mainnet`.

Possible values are:

| Network   | Chain           | Type        | Description                                               |
|-----------|-----------------|-------------|-----------------------------------------------------------|
| `mainnet` | Consensus layer | Production  | Main network                                              |
| `minimal` | Consensus layer | Test        | Used for local testing and development networks           |
| `prater`  | Consensus layer | Test        | Multi-client testnet                                      |
| `kiln`    | Consensus layer | Test        | Multi-client testnet                                      |
| `ropsten` | Consensus layer | Test        | Multi-client testnet                                      |
| `gnosis`  | Consensus layer | Test        | Multi-client testnet                                      |
| `sepolia` | Consensus layer | Test        | Multi-client testnet                                      |

Predefined networks can provide defaults such the initial state of the network,
bootnodes, and the address of the deposit contract.
