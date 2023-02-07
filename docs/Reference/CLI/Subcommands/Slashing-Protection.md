---
title: slashing-protection
sidebar_position: 4
---

# `slashing-protection`

Manage the local [slashing protection data] used by the validator.

## `import`

Imports the slashing protection database using the [validator client interchange format].

### `config-file`

<!--tabs-->

# Syntax

```bash
teku slashing-protection import --config-file=<FILE>
```

# Example

```bash
teku slashing-protection import --config-file=/home/me/me_node/config.yaml
```

# Environment variable

```bash
TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
```

<!--/tabs-->

Path to the YAML configuration file. The default is `none`.

### `data-path`

<!--tabs-->

# Syntax

```bash
teku slashing-protection import --data-path=<PATH>
```

# Example

```bash
teku slashing-protection import --data-path=/home/me/me_node
```

<!--/tabs-->

Path to the Teku data directory. The default directory is OS-dependent:

- macOS: `~/Library/teku`
- Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`
- Windows: `%localappdata%\teku`.

### `data-validator-path`

<!--tabs-->

# Syntax

```bash
teku slashing-protection import --data-validator-path=<PATH>
```

# Example

```bash
teku slashing-protection import --data-validator-path=/home/me/me_validator
```

# Environment variable

```bash
TEKU_DATA_VALIDATOR_PATH=/home/me/me_validator
```

# Configuration file

```bash
data-validator-path: "/home/me/me_validator"
```

<!--/tabs-->

Path to the validator client data. The default is `<data-path>/validator` where `<data-path>` is specified using [`--data-path`](#data-path).

:::info

Teku imports slashing protection data into a `slashprotection` directory under the validator client data directory.

:::

### `from`

<!--tabs-->

# Syntax

```bash
teku slashing-protection import --from=<FILE>
```

# Example

```bash
teku slashing-protection import --from=/home/slash/b845...23bed.json
```

<!--/tabs-->

The file to import the slashing protection database from.

Teku imports the file to the `<data-path>/validators/slashprotection/` directory in the format `<validator-pubkey>.yml` (with no 0x prefix).

`<data-path>` is defined using [`--data-path`](#data-path).

## `export`

Exports the slashing protection database in the [validator client interchange format] format.

### `config-file`

<!--tabs-->

# Syntax

```bash
teku slashing-protection export --config-file=<FILE>
```

# Example

```bash
teku slashing-protection export --config-file=/home/me/me_node/config.yaml
```

# Environment variable

```bash
TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
```

<!--/tabs-->

Path to the YAML configuration file. The default is `none`.

### `data-path`

<!--tabs-->

# Syntax

```bash
teku slashing-protection export --data-path=<PATH>
```

# Example

```bash
teku slashing-protection export --data-path=/home/me/me_node
```

<!--/tabs-->

Path to the Teku data directory. The default directory is OS-dependent:

- macOS: `~/Library/teku`
- Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`
- Windows: `%localappdata%\teku`.

### `data-validator-path`

<!--tabs-->

# Syntax

```bash
teku slashing-protection export --data-validator-path=<PATH>
```

# Example

```bash
teku slashing-protection export --data-validator-path=/home/me/me_validator
```

# Environment variable

```bash
TEKU_DATA_VALIDATOR_PATH=/home/me/me_validator
```

# Configuration file

```bash
data-validator-path: "/home/me/me_validator"
```

<!--/tabs-->

Path to the validator client data. The default is `<data-path>/validator` where `<data-path>` is specified using [`--data-path`](#data-path).

:::info

Teku exports slashing protection data from the `slashprotection` directory under the validator client data directory.

:::

### `to`

<!--tabs-->

# Syntax

```bash
teku slashing-protection export --to=<FILE>
```

# Example

```bash
teku slashing-protection export --to=/home/slash/b845...23bed.json
```

<!--/tabs-->

The file to export the slashing protection database to.

Exports the database in the [validator client interchange format] format.

## `repair`

Repairs corrupted slashing protection data files used by Teku.

### `check-only-enabled`

<!--tabs-->

# Syntax

```bash
teku slashing-protection repair --checking-only-enabled[=<BOOLEAN>]
```

# Example

```bash
teku slashing-protection repair --checking-only-enabled=false
```

<!--/tabs-->

Reads and reports potential slashing protection file problems, but doesn't update any files. You can specify which files are checked using [`--config-file`](#config-file_2), [`--data-base-path`](#data-base-path-data-path).

### `config-file`

<!--tabs-->

# Syntax

```bash
teku slashing-protection repair --config-file=<FILE>
```

# Example

```bash
teku slashing-protection repair --config-file=/home/me/me_node/config.yaml
```

<!--/tabs-->

Path to the YAML configuration file. The default is `none`.

### `data-path`

<!--tabs-->

# Syntax

```bash
teku slashing-protection repair --data-path=<PATH>
```

# Example

```bash
teku slashing-protection repair --data-path=/home/me/me_node
```

<!--/tabs-->

Path to the Teku data directory. The default directory is OS-dependent:

- macOS: `~/Library/teku`
- Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`
- Windows: `%localappdata%\teku`

The default Docker image location is `/root/.local/share/teku`.

### `data-validator-path`

<!--tabs-->

# Syntax

```bash
teku slashing-protection repair --data-validator-path=<PATH>
```

# Example

```bash
teku slashing-protection repair --data-validator-path=/home/me/me_validator
```

<!--/tabs-->

Path to validator client data. The default is `<data-path>/validator` where `<data-path>` is specified using [`--data-path`](#data-path).

:::info

The slashing protection data is stored in a `slashprotection` directory under the validator client data directory.

:::

### `network`

<!--tabs-->

# Syntax

```bash
teku slashing-protection repair --network=<NETWORK>
```

# Example

```bash
teku slashing-protection repair --network=mainnet
```

<!--/tabs-->

Predefined network configuration. Accepts a predefined network name, or file path or URL to a YAML configuration file. The default is `mainnet`.

Possible values are:

| Network | Chain | Type | Description |
| --- | --- | --- | --- |
| `mainnet` | Consensus layer | Production | Main network |
| `minimal` | Consensus layer | Test | Used for local testing and development networks |
| `goerli` | Consensus layer | Test | Multi-client testnet |
| `gnosis` | Consensus layer | Production | Network for the [Gnosis chain](https://docs.gnosischain.com/) |
| `sepolia` | Consensus layer | Test | Multi-client testnet |

Predefined networks can provide defaults such the initial state of the network, bootnodes, and the address of the deposit contract.

### `slot`

<!--tabs-->

# Syntax

```bash
teku slashing-protection repair --slot=<INTEGER>
```

# Example

```bash
teku slashing-protection repair --slot=1028
```

<!--/tabs-->

Updates slashing protection files to contain the specified slot as a minimum. The value should be a future slot, or after when the validators stopped performing duties.

:::note

This can be automatically calculated for most networks, and is generally not required.

:::

### `update-all-enabled`

<!--tabs-->

# Syntax

```bash
teku slashing-protection repair --update-all-enabled[=<BOOLEAN>]
```

# Example

```bash
teku slashing-protection repair --update-all-enabled=false
```

<!--/tabs-->

Enables all slashing protection records to be updated. The default is `false`.

<!-- links -->

[slashing protection data]: ../../../Concepts/Slashing-Protection.md
[validator client interchange format]: https://eips.ethereum.org/EIPS/eip-3076
[environment variables or a configuration file]: ../CLI-Syntax.md#specifying-options
[recent finalized checkpoint state from which to sync]: ../../../HowTo/Get-Started/Checkpoint-Start.md
