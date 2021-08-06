---
description: How to migrate a RocksDB database to a LevelDB2 database.
---

# Migrate the database

As of v21.5.0, new Teku installations use a LevelDB2 database. Previous Teku versions use
RocksDB which continues to be supported.

LevelDB2 databases use less memory and are proven to be more stable with Teku.

!!! important

    We recommend Teku nodes running in [archive mode] use the [automatic migration](#automatic-migration) method, and
    Teku nodes running in [prune mode] use the manual migration.

## Automatic migration

Teku nodes running in [archive mode] must resync from genesis to migrate from RocksDB to LevelDB2. Use the
[`migrate-database`](../Reference/CLI/Subcommands/Migrate-Database.md) subcommand to migrate the database.
Once migration completes there will be two databases in Teku's data folder. Manually verify that Teku starts
and has the expected data before you remove the RocksDB database.

!!! note

    Disk space requirements may be as much as the existing storage folder used by Teku. This storage
    requirement will only be for the period of the `migrate-database` command, plus long enough to validate that
    the new database is working.

Ensure that Teku is not running when using the  [`migrate-database`](../Reference/CLI/Subcommands/Migrate-Database.md)
subcommand. The duration of the migration depends on many factors, but principally on the disk speed.  Status updates
are provided during the migration process. To migrate the database:

1. Shutdown the local Teku instance.

1. Run [`migrate-database`](../Reference/CLI/Subcommands/Migrate-Database.md) to create a LevelDB2 database.
    Pass your [configuration file](Configure/Use-Configuration-File.md) or CLI options so that Teku has the correct paths
    and context.

    !!! example

        ```bash
        teku migrate-database --data-path /etc/teku/data/
        ```

    At a minimum, provide the [`--network`](../Reference/CLI/Subcommands/Migrate-Database.md#network)
    and [`--data-path`](../Reference/CLI/Subcommands/Migrate-Database.md#network) options.

    !!! note

        If not supplied [`--network`](../Reference/CLI/Subcommands/Migrate-Database.md#network) defaults to
        `mainnet`.

1. The migration process will let you know if it succeeded, or provide context to errors.  If
    successful, then start Teku and confirm it functions correctly.

    !!! example

        ```bash
        teku --data-path /etc/teku/data/
        ```

1. If teku is running correctly, remove the `beacon.old` directory from the
    [`--data-path`](../Reference/CLI/Subcommands/Migrate-Database.md#network) directory.

If migration fails, resolve any issues and retry. Contact us on the [Teku Discord channel] if you need help
resolving issues.

## Manual migration

Users can manually migrate Teku nodes running a RocksDB database to a LevelDB2 database if the Teku node
runs in [prune mode].

!!! warning

    Teku nodes running in [archive mode] must resync from genesis to migrate. Use the [automatic migration](#automatic-migration)
    to migrate Teku nodes running in [archive mode].

To migrate a RocksDB database in [prune mode] to a LevelDB2 database:

1. [Download the latest finalized state] from a beacon chain node:

    ```bash
    curl -o state.ssz -H 'Accept: application/octet-stream' http://other-node:5051/eth/v1/debug/beacon/states/finalized
    ```

    !!! note

        This step is optional, you can also [supply the finalized checkpoint state] via URL from a beacon
        chain node or Infura when restarting Teku in the step below.

1. Stop the Teku node you intend to migrate.

1. Delete the `beacon` directory in your
    [data path](../Reference/CLI/CLI-Syntax.md#data-base-path-data-path).

    !!! warning

        Ensure not to delete the `validator` directory if one is present as this contains your
        slashing protection data.

1. Restart Teku and specify the downloaded finalized state using the
    [`--initial-state`](../Reference/CLI/CLI-Syntax.md#initial-state) command.

Teku creates a LevelDB2 database, and starts from the specified recent state. Teku should be in
sync and validating within minutes.

<!-- links -->
[Download the latest finalized state]: https://consensys.github.io/teku/#operation/getEthV1DebugBeaconStatesWithState_id
[prune mode]: ../Reference/CLI/CLI-Syntax.md#data-storage-mode
[archive mode]: ../Reference/CLI/CLI-Syntax.md#data-storage-mode
[supply the finalized checkpoint state]: Get-Started/Checkpoint-Start.md
[Teku Discord channel]: https://discord.gg/9mCVSY6
