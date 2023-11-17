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

Alternatively, you can use a Checkpointz endpoint from [this community-maintained list of checkpoint state endpoints](https://eth-clients.github.io/checkpoint-sync-endpoints/).

:::

The following command downloads a recent finalized checkpoint state from a beacon node, and starts Teku:

```bash
teku --eth1-endpoint=http://localhost:8545 \
--validator-keys=/Users/me/mainnet/validator/keys:/Users/me/mainnet/validator/passwords \
--checkpoint-sync-url=https://beaconstate.ethstaker.cc
```

The command uses the [`--checkpoint-sync-url`](../reference/cli/index.md#checkpoint-sync-url) option to download the finalized checkpoint state.

:::note

You can also download a finalized checkpoint state file, and specify the location using the [`--initial-state`](../reference/cli/index.md#initial-state) option. To download the file and name it `state.ssz` run:

```bash
curl -o state.ssz -H 'Accept: application/octet-stream' http://other-node:5051/eth/v2/debug/beacon/states/finalized
```

And to start Teku, run:

```bash
teku --eth1-endpoint=http://localhost:8545 \
--validator-keys=/Users/me/mainnet/validator/keys:/Users/me/mainnet/validator/passwords \
--initial-state=state.ssz
```

Another option is to use [`--initial-state`](../reference/cli/index.md#initial-state) with the URL of the state you want to use:

```bash
teku --eth1-endpoint=http://localhost:8545 \
--validator-keys=/Users/me/mainnet/validator/keys:/Users/me/mainnet/validator/passwords \
--initial-state=http://other-node:5051/eth/v2/debug/beacon/states/finalized
```
:::

## Syncing outside of weak subjectivity period

The weak subjectivity period is the period of time (or more specifically epochs) that a node can be behind the chain and trust that the chain it is following is the correct chain. The mechanism on how the weak subjectivity period works are a bit more complex but in practice, it will tell Teku if the state you have as your latest checkpoint (either starting a new node or because your node was offline for a while) is too old to continue syncing from.

During startup, as soon as Teku loads its initial state (e.g. downloading it using `--checkpoint-sync-url` or reading its existing database), it will check if the latest finalized state epoch is within the weak subjectivity period. If it is, Teku will start looking for peers and downloading the missing blocks to catch-up with the chain. If it is too old, Teku will log an error message and exit.

:::caution

Originally, Teku's default behavior was to sync from any point in the chain without the weak subjectivity check, including syncing all the way from the genesis of the chain. However, this is not considered safe.

If you really want to allow Teku to sync from outside the weak subjectivity period, you can use the CLI flag: [`--ignore-weak-subjectivity-period-enabled`](../reference/cli/index.md#ignore-weak-subjectivity-period-enabled)

:::

For more information on the weak subjectivity period and how it works, check out these links:
- https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/weak-subjectivity/
- https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity
- https://www.symphonious.net/2019/11/27/exploring-ethereum-2-weak-subjectivity-period/

<!--links-->

[REST API enabled]: ../reference/cli/index.md#rest-api-enabled
