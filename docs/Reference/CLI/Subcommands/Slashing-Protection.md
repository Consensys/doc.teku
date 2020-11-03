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

Imports the slashing protection database. Supports the [Minimal] or [Complete] interchange format.

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

Exports the slashing protection database in [Minimal] format.

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

Exports the database in the [Minimal] format.

<!-- links -->
[slashing protection data]: ../../Concepts/Slashing-Protection.md
[Minimal]: https://hackmd.io/@sproul/Bk0Y0qdGD#Format-2-Minimal
[Complete]: https://hackmd.io/@sproul/Bk0Y0qdGD#Format-1-Complete
[environment variables or a configuration file]: ../CLI-Syntax.md#specifying-options
