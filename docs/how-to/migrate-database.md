---
title: Migrate the database
description: Migrate a RocksDB database to a LevelDB2 database.
sidebar_position: 10
---

# Migrate the database

As of v21.5.0, new Teku installations use a LevelDB2 database. Previous Teku versions use RocksDB which continues to be supported.

LevelDB2 databases use less memory and proves to be more stable with Teku.

:::caution

We recommend Teku nodes running in [`archive` mode] use the [automatic migration](#automatic-migration) method, and Teku nodes running in [`minimal` mode] use the [manual migration](#manual-migration).

:::

## Automatic migration

Teku nodes running in [archive mode] must resynchronize from genesis to migrate from RocksDB to LevelDB2. Use the [`migrate-database`](../reference/cli/subcommands/migrate-database.md) subcommand to migrate the database. Once migration completes there will be two databases in Teku's data folder. Manually verify that Teku starts and has the expected data before you remove the RocksDB database.

:::note

You need double the disk space of the existing Teku storage folder for the migration process. Once you are satisfied with the migration then you can delete the RocksDB to free up space.

:::

Ensure that Teku isn't running when using the [`migrate-database`](../reference/cli/subcommands/migrate-database.md) subcommand. The duration of the migration depends on various factors, but principally on the disk speed. Status updates display during the migration process. To migrate the database:

1.  Shut down the local Teku instance.

2.  Run [`migrate-database`](../reference/cli/subcommands/migrate-database.md) to create a LevelDB2 database. Pass your [configuration file](configure/use-config-file.md) or CLI options so that Teku has the correct paths and context.

    ```bash title="Example"
    teku migrate-database --data-path /etc/teku/data/
    ```

    At a minimum, provide the [`--network`](../reference/cli/subcommands/migrate-database.md#network) and [`--data-path`](../reference/cli/subcommands/migrate-database.md#network) options.

    :::note

    If not supplied [`--network`](../reference/cli/subcommands/migrate-database.md#network) defaults to `mainnet`.

    :::

3.  The migration process informs you if it succeeded, or provides context to errors. If successful, then confirm Teku functions correctly.

    ```bash title="Example"
    teku --data-path /etc/teku/data/
    ```

4.  If Teku is running correctly, remove the `beacon.old` directory from the [`--data-path`](../reference/cli/subcommands/migrate-database.md#network) directory.

If migration fails, resolve any issues and retry. Contact support on the [Teku Discord channel] if you need help resolving issues.

## Manual migration

Users can manually migrate Teku nodes running a RocksDB database to a LevelDB2 database if the Teku node runs in [`minimal` mode].

:::caution

Teku nodes running in [archive mode] must resynchronize from genesis to migrate. Use the [automatic migration](#automatic-migration) to migrate Teku nodes running in [archive mode].

:::

To migrate a RocksDB database in [`minimal` mode] to a LevelDB2 database:

1.  [Download the latest finalized state] from a beacon node:

    ```bash
    curl -o state.ssz -H 'Accept: application/octet-stream' http://other-node:5051/eth/v2/debug/beacon/states/finalized
    ```

    :::note

    This step is optional, you can also [supply the finalized checkpoint state] via URL from a beacon chain node or Infura when restarting Teku in the step below.

    :::

2.  Stop the Teku node you intend to migrate.

3.  Delete the `beacon` directory in your [data path](../reference/cli/index.md#data-base-path-data-path).

    :::warning

    Ensure not to delete the `validator` directory if one is present as this contains your slashing protection data.

    :::

4.  Restart Teku and specify the downloaded finalized state using the [`--initial-state`](../reference/cli/index.md#initial-state) command.

Teku creates a LevelDB2 database, and starts from the specified recent state. Teku should be in sync and validating within minutes.

<!-- links -->

[Download the latest finalized state]: https://consensys.github.io/teku/#operation/getEthV1DebugBeaconStatesWithState_id
[`minimal` mode]: ../reference/cli/index.md#data-storage-mode
[archive mode]: ../reference/cli/index.md#data-storage-mode
[supply the finalized checkpoint state]: ../get-started/checkpoint-start.md
[Teku Discord channel]: https://discord.com/invite/consensys
