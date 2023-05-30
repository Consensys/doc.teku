---
title: Using the rewards API
description: Get insights into rewards.
sidebar_position: 13
---

# Using the rewards API

The rewards api is part of the beacon-apis specification of Rest APIs shared between CL implementations.

They rely on a level of information from States, as well as from Block data. Because of this, searching will be limited if the beacon node being queried is not an archive node.

:::tip

To call the rest-API, it will need to be enabled. Use the [`--rest-api-enabled`](../reference/cli/index.md#rest-api-enabled) command line option to enable the rest-API.

A Swagger interface is also available. Use the [`--rest-api-docs-enabled`](../reference/cli/index.md#rest-api-docs-enabled) command line option to enable the web interface.

:::

# Limitations

- The rewards API currently supports from the `altair` fork onwards, but will be dependent on block and state information stored by the beacon node being queried.
- All the rewards endpoints both the `block` and `state` from the queried slot to be able to perform its calculations. This will mean that a beacon-node in `prune` storage mode will only be able to query back to `finalized`, and not prior to that.

# Impact of data storage modes

:::tip

It is possible to change the [`data-storage-mode`](../reference/cli/index.md#data-storage-mode) without re-initializing your database.

It is possible to change the frequency that states are stored by specifying [`data-storage-archive-frequency`](../reference/cli#data-storage-archive-frequency), but it will only affect the state storage from the time that the change has been made. It will also directly impact the amount of disk space required by teku.

:::

If calling the rewards api on finalized data often, you will want a beacon node using `archive` mode storage.

This may produce slow results because it also relies on replaying blocks, because it only stores occasional (every 2048 slots by default) states on disk.

# Examples

Query all the rewards from the block currently at head.

```bash title="Block Rewards Example"
curl http://localhost:5051/eth/v1/beacon/rewards/blocks/head |jq

{
  "execution_optimistic": false,
  "finalized": false,
  "data": {
    "proposer_index": "555552",
    "total": "1217168",
    "attestations": "0",
    "sync_aggregate": "1217168",
    "proposer_slashings": "0",
    "attester_slashings": "0"
  }
}
```

Query all the sync committee rewards from the block at head for validator index 1.

```bash title="Sync Committee Rewards Example"
curl -X POST \
     -H 'accept: application/json' \
     -H 'Content-Type: application/json' \
     http://localhost:5051/eth/v1/beacon/rewards/sync_committee/head \
     -d '["1"]' |jq

{
  "execution_optimistic": false,
  "finalized": false,
  "data": [
      {
        "validator_index": "1",
        "reward": "16778"
      }
    ]
  }
}
```

Query attestation rewards from epoch 204644, just for validator index 0.

```bash title="Attestation Rewards Example"
curl -X POST \
     -H 'accept: application/json' \
     -H 'Content-Type: application/json' \
     http://localhost:5051/eth/v1/beacon/rewards/attestations/204648 \
     -d '["0"]' |jq

 {
  "execution_optimistic": false,
  "finalized": true,
  "data": {
    "ideal_rewards": [...],
    "total_rewards": [
      {
        "validator_index": "0",
        "head": "3125",
        "target": "6005",
        "source": "3236"
      }
    ]
  }
}
```
