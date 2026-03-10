---
title: Migrate the database
description: Migrate a LevelDB database to a RocksDB database.
sidebar_position: 10
---

# Migrate the database

Teku version 26.2.0 and later use RocksDB as the default database for new installations.
Earlier Teku versions use LevelDB. Teku continues to support LevelDB in all versions.

RocksDB database has proved to be more stable with Teku.
LevelDB has not had an official release since 2021 therefore we have decided to migrate to RocksDB as the default database for new installations.

## Manual migration

Users can manually migrate Teku nodes running a LevelDB database to a RocksDB database if the Teku node runs in [`prune` or `minimal` mode]
:::caution

Teku nodes running in [`archive` mode] must resynchronize from genesis to migrate.

:::

To migrate a LevelDB database in [`prune` or `minimal` mode] to a RocksDB database:

1. [Supply the finalized checkpoint state] via URL from a Beacon chain node or a checkpoint source when restarting Teku in the step below.

2. Stop the Teku node you intend to migrate.

3. Clear the beacon database, either:
    - Restart Teku with
   [`--force-clear-db`](../reference/cli/index.md#force-clear-db)
    - Manually delete the `beacon/db` directory in your [data path](../reference/cli/index.md#data-base-path-data-path).

    :::warning

    If you manually delete, ensure not to delete the `validator` directory if one is present as this contains your slashing protection data.

    :::

4. Restart Teku.

Teku creates a RocksDB database, and starts from the specified recent state. Teku should be in sync and validating within minutes.
You can confirm the database type in the logs:

```text
INFO - Created RocksDB V6 Hot and Finalized database (6) at : /path/to/teku/beacon
``` 

<!-- links -->

[`prune` or `minimal` mode]: ../reference/cli/index.md#data-storage-mode
[`archive` mode]: ../reference/cli/index.md#data-storage-mode
[supply the finalized checkpoint state]: ../get-started/checkpoint-start.md
[Teku Discord channel]: https://discord.com/invite/consensys
