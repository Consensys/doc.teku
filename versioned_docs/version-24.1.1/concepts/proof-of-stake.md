---
title: Proof of stake
description: Learn about Ethereum proof of stake consensus.
sidebar_position: 3
---

# Proof of stake

[The Merge](merge.md) transitioned Ethereum Mainnet to [proof of stake (PoS)](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/) consensus.

In Ethereum's PoS, you must run a [full node](merge.md#execution-and-consensus-clients) and
[stake 32 ETH](https://ethereum.org/staking) to become a validator.

:::note

You must run a beacon node and an execution client to operate a node on Mainnet. To become a validator, you must also run a validator client (either [in the same process as the beacon node](../get-started/start-teku.md#start-the-clients-in-a-single-process) or [separately](../get-started/start-teku.md#run-the-clients-separately).

:::

The PoS mechanism randomly chooses validators to propose or validate blocks on the [Beacon Chain](https://ethereum.org/en/upgrades/beacon-chain/) in defined time frames.

Proposers are responsible for proposing new consensus blocks, and non-proposing validators are responsible for validating (attesting to) proposed blocks. Validators are rewarded for proposing and attesting to consensus blocks eventually included in the Beacon Chain, and penalized for malicious behavior. Validators also receive transaction fees for included blocks.

Each consensus block contains an execution payload, which contains a list of transactions and other data required to execute and validate the payload.

When a node validates a consensus block, its [consensus client](merge.md#execution-and-consensus-clients) processes the block and sends the execution payload to the [execution client](merge.md#execution-and-consensus-clients), which:

1. Assembles a block on the execution layer.
1. Verifies pre-conditions.
1. Executes transactions.
1. Verifies post-conditions.
1. Sends the validity result back to the consensus client.

If the block is valid, the execution client includes it in the execution chain and stores the new state in execution state storage.

If a consensus block receives attestations backed by enough staked ETH, the block is included in the Beacon Chain.
