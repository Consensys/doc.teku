---
title: Storage options
---

# `Storage and data`

Where and how client data is stored

### data-base-path, data-path

=== "Syntax"

    ```bash
    --data-base-path=<PATH>
    ```

=== "Example"

    ```bash
    --data-base-path=/home/me/me_node
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

### data-beacon-path

=== "Syntax"

    ```bash
    --data-beacon-path=<PATH>
    ```

=== "Example"

    ```bash
    --data-beacon-path=/home/me/me_beacon
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

### data-storage-archive-frequency

=== "Syntax"

    ```bash
    --data-storage-archive-frequency=<NUMBER>
    ```

=== "Example"

    ```bash
    --data-storage-archive-frequency=1028
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

### data-storage-mode

=== "Syntax"

    ```bash
    --data-storage-mode=<STORAGE_MODE>
    ```

=== "Example"

    ```bash
    --data-storage-mode=archive
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

### data-storage-non-canonical-blocks-enabled

=== "Syntax"

    ```bash
    --data-storage-non-canonical-blocks-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --data-storage-non-canonical-blocks-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_STORAGE_NON_CANONICAL_BLOCKS_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    data-storage-non-canonical-blocks-enabled: true
    ```

Specify whether to store non-canonical blocks.
The default is `false`.

### data-validator-path

=== "Syntax"

    ```bash
    --data-validator-path=<PATH>
    ```

=== "Example"

    ```bash
    --data-validator-path=/home/me/me_validator
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
