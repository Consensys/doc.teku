---
description: How to migrate a RocksDB database to a LevelDB2 database.
---

# Migrate the database

As of v21.5.0, new Teku installations use a LevelDB2 database. Previous Teku versions use
RocksDB which continue to be supported.

LevelDB2 databases use less memory and are proven to be more stable with Teku. Users can migrate
Teku nodes running a RocksDB database to a LevelDB2 database if the Teku node runs in [pruning mode].

!!! warning

    Teku nodes running in [archive mode] have to resync from genesis to migrate.


To migrate a RocksDB database in [pruning mode] to a LevelDB2 database:

1. [Download the latest finalized state] from a beacon chain node:

    ```
    curl -o state.ssz -H 'Accept: application/octet-stream' http://other-node:5051/eth/v1/debug/beacon/states/finalized
    ```

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