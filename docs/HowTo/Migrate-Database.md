---
description: How to migrate a RocksDB database to a LevelDB2 database.
---

# Migrate the database

As of v21.5.0, new Teku installations use a LevelDB2 database. Previous Teku versions use
RocksDB which continue to be supported.

LevelDB2 databases use less memory and are proven to be more stable with Teku.

## Automatic migration

Teku nodes running in [archive mode] can use the `migrate-database`  command to avoid data loss when moving to LevelDB2. Once the process is complete, there will be two databases in the teku data folder, and after manually verifying that teku can start and has the expected data, you will be able to remove the RocksDB database.

Disk space requirements may be as much as the existing `teku/beacon` folder in use by Teku. This storage requirement will only be for the period of the `migrate-database` command, plus long enough to validate that the new database is working.

The `migrate-database` command requires that Teku is not running while the data is moved. The time taken to migrate is dependent on many factors, but principally dependent on the disk speed.  Status updates are given while database migration progresses.

1. Shutdown the local instance of teku.

1. use `migrate-database` to create a new leveldb database. At a minimum, `--network` and `--data-path` needs to be provided. Pass your normal configuration file or configuration options so that teku has the correct paths and context.

    ```bash
    teku -c /etc/teku/teku.yml migrate-database
    ```

1. When `migrate-database` is complete, it will specify if it succeeded, or give context to errors.  If it was successful, then start teku and check it is functioning properly.

1. If teku is running correctly, remove the `beacon.old` folder where Teku normally runs from.

If `migrate-database` fails, resolve any issues and retry. Reach out on discord if there are any issues that can't be resolved.

# Manual Migration

Users can migrate Teku nodes running a RocksDB database to a LevelDB2 database if the Teku node runs in [pruning mode].

!!! warning

    Teku nodes running in [archive mode] have to resync from genesis to migrate. Tools to migrate
    existing databases will be provided in future releases.

To migrate a RocksDB database in [pruning mode] to a LevelDB2 database:

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
[pruning mode]: ../Reference/CLI/CLI-Syntax.md#data-storage-mode
[archive mode]: ../Reference/CLI/CLI-Syntax.md#data-storage-mode
[supply the finalized checkpoint state]: Get-Started/Checkpoint-Start.md
