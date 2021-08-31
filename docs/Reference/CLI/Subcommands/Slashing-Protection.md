---
title: Subcommand options
---

# `slashing-protection`

Manage the local [slashing protection data] used by the validator. To use the `slashing-protection`
subcommand run:

```bash
teku slashing-protection [subcommand] [option]
```

You can also supply the subcommand options using [environment variables or a configuration file].

## `import`

Imports the slashing protection database using the [validator client interchange format].

### config-file

=== "Syntax"

    ```bash
    teku slashing-protection import --config-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku slashing-protection import --config-file=/home/me/me_node/config.yaml
    ```

=== "Environment Variable"

    ```bash
    TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
    ```

The path to the YAML configuration file.
The default is `none`.

### data-path

=== "Syntax"

    ```bash
    teku slashing-protection import --data-path=<PATH>
    ```

=== "Command Line"

    ```bash
    teku slashing-protection import --data-path=/home/me/me_node
    ```

The path to the Teku data directory. The default directory is OS dependent:

* macOS: `~/Library/teku`
* Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`
* Windows: `%localappdata%\teku`.

### from

=== "Syntax"

    ```bash
    teku slashing-protection import --from=<FILE>
    ```

=== "Command Line"

    ```bash
    teku slashing-protection import --from=/home/slash/b845...23bed.json
    ```

The file to import the slashing protection database from.

Teku imports the file to the `<data-path>/validators/slashprotection/` directory in the format
`<validator-pubkey>.yml` (with no 0x prefix).

`<data-path>` is defined using [`--data-path`](#data-path).

## `export`

Exports the slashing protection database in the [validator client interchange format] format.

### config-file

=== "Syntax"

    ```bash
    teku slashing-protection export --config-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku slashing-protection export --config-file=/home/me/me_node/config.yaml
    ```

=== "Environment Variable"

    ```bash
    TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
    ```

The path to the YAML configuration file.
The default is `none`.

### data-path

=== "Syntax"

    ```bash
    teku slashing-protection export --data-path=<PATH>
    ```

=== "Command Line"

    ```bash
    teku slashing-protection export --data-path=/home/me/me_node
    ```

The path to the Teku data directory. The default directory is OS dependent:

* macOS: `~/Library/teku`
* Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`
* Windows: `%localappdata%\teku`.

### to

=== "Syntax"

    ```bash
    teku slashing-protection export --to=<FILE>
    ```

=== "Command Line"

    ```bash
    teku slashing-protection export --to=/home/slash/b845...23bed.json
    ```

The file to export the slashing protection database to.

Exports the database in the [validator client interchange format] format.

## `repair`

Repairs corrupted slashing-protection data files used by Teku.

### check-only-enabled

=== "Syntax"

    ```bash
    teku slashing-protection repair --checking-only-enabled[=<BOOLEAN>]
    ```

=== "Command Line"

    ```bash
    teku slashing-protection repair --checking-only-enabled=false
    ```

Reads and reports potential slashing-protection file problems, but doesn't update any files.
You can specify which files are checked using [`--config-file`](#config-file_2), [`--data-base-path`](#data-base-path-data-path), 
or [`--network`](#network).

### config-file

=== "Syntax"

    ```bash
    teku slashing-protection repair --config-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku slashing-protection repair --config-file=/home/me/me_node/config.yaml
    ```

The path to the YAML configuration file.
The default is `none`.

### data-base-path, data-path

=== "Syntax"

    ```bash
    teku slashing-protection repair --data-base-path=<PATH>
    ```

=== "Command Line"

    ```bash
    teku slashing-protection repair --data-base-path=/home/me/me_node
    ```

The path to the Teku data directory. The default directory is OS dependent:

* macOS: `~/Library/teku`
* Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`
* Windows: `%localappdata%\teku`.

The default Docker image location is `/root/.local/share/teku`.

### data-validator-path

=== "Syntax"

    ```bash
    teku slashing-protection repair --data-validator-path=<PATH>
    ```

=== "Command Line"

    ```bash
    teku slashing-protection repair --data-validator-path=/home/me/me_validator
    ```

Path to validator client data. Defaults to `<data-base-path>/validator` where `<data-base-path>`
is specified using [`--data-base-path`](#data-base-path-data-path).

### network

=== "Syntax"

    ```bash
    teku slashing-protection repair --network=<NETWORK>
    ```

=== "Command Line"

    ```bash
    teku slashing-protection repair --network=mainnet
    ```

Predefined network configuration. Accepts a predefined network name, or file path or URL
to a YAML configuration file. The default is `mainnet`.

Possible values are:

| Network   | Chain   | Type        | Description                                      |
|-----------|---------|-------------|--------------------------------------------------|
| `mainnet` | Eth 2.0 | Production  | Main network.                                    |
| `minimal` | Eth 2.0 | Test        | Used for local testing and development networks. |
| `pyrmont` | Eth 2.0 | Test        | Multi-client testnet.                            |
| `prater`  | Eth 2.0 | Test        | Multi-client testnet.                            |

Predefined networks can provide defaults such the initial state of the network,
bootnodes, and the address of the Ethereum 1.0 deposit contract.

### slot

=== "Syntax"

    ```bash
    teku slashing-protection repair --slot=<INTEGER>
    ```

=== "Command Line"

    ```bash
    teku slashing-protection repair --slot=1028
    ```

Updates slashing protection files to contain the specified slot as a minimum. The value should be a future
slot, or after when the validators stopped performing duties.

!!! note

    This can be automatically calculated for most networks, and is generally not required.

### update-all-enabled

=== "Syntax"

    ```bash
    teku slashing-protection repair --update-all-enabled[=<BOOLEAN>]
    ```

=== "Command Line"

    ```bash
    teku slashing-protection repair --update-all-enabled=false
    ```

Enables all slashing-protection records to be updated. Defaults to `false`.

<!-- links -->
[slashing protection data]: ../../../Concepts/Slashing-Protection.md
[validator client interchange format]: https://eips.ethereum.org/EIPS/eip-3076
[environment variables or a configuration file]: ../CLI-Syntax.md#specifying-options
[recent finalized checkpoint state from which to sync]: ../../../HowTo/Get-Started/Checkpoint-Start.md
