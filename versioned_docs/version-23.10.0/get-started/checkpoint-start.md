---
title: Start Teku from a recent state
description: Start Teku from a recent finalized state using checkpoint sync.
sidebar_position: 4
---

# Start Teku from a recent state

To get Teku up and running in only a few minutes, you can start Teku from a recent finalized checkpoint state rather than syncing from genesis.

When starting from a recent checkpoint, Teku downloads historic chain data in the background.

:::tip

You need access to a beacon node with [REST API enabled] (for example, Teku) to download the finalized checkpoint state file.

:::

The following command downloads a recent finalized checkpoint state from a beacon node, and starts Teku:

```bash
teku --eth1-endpoint=http://localhost:8545 \
--validator-keys=/Users/me/mainnet/validator/keys:/Users/me/mainnet/validator/passwords \
--initial-state=http://other-node:5051/eth/v2/debug/beacon/states/finalized
```

The command uses the [`--initial-state`](../reference/cli/index.md#initial-state) option to download the finalized checkpoint state from the [`/eth/v2/debug/beacon/states/`](https://consensys.github.io/teku/#operation/getEthV1DebugBeaconStatesWithState_id) endpoint on the beacon node (for example, Teku).

:::note

You can also download a finalized checkpoint state file, and specify the location using the [`--initial-state`](../reference/cli/index.md#initial-state) option. To download the file and name it `state.ssz` run:

```bash
curl -o state.ssz -H 'Accept: application/octet-stream' http://other-node:5051/eth/v2/debug/beacon/states/finalized
```

:::

:::tip

See [this community-maintained list of checkpoint state endpoints](https://eth-clients.github.io/checkpoint-sync-endpoints/).

:::

<!--links-->

[REST API enabled]: ../reference/cli/index.md#rest-api-enabled
