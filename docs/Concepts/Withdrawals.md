---
title: Withdrawals
description: Describe withdrawals
sidebar_position: 8
---

# Withdrawals

Validators staking ether on Mainnet after [The Merge](Merge.md), accrue two
forms of rewards:

- Execution layer rewards paid directly to a withdrawal address (Ethereum address).
- Consensus layer rewards for performing actions each epoch.

The
[Capella network upgrade](https://notes.ethereum.org/@launchpad/withdrawals-faq#Q-What-is-ShanghaiCapella)
implements an automated process that allows a validator's rewards to be
transferred from the consensus layer to an Ethereum address on the execution layer.
Before the Capella upgrade, consensus layer rewards were locked, and couldn't be
transferred to an Ethereum address.

:::caution

When you create a validator, you can set its withdrawal address to a
[BLS address](https://en.wikipedia.org/wiki/BLS_digital_signature), or an
Ethereum address.
Withdrawal keys configured as BLS keys can't have automated withdrawals executed
for them.

You can
[update your BLS withdrawal address to an Ethereum address](../HowTo/Withdrawal-Keys.md)
after the Capella upgrade.

:::

You don't pay gas fees for receiving reward payments.

## Types of withdrawals

Two types of automated withdrawals occur once the withdrawal key is set up as an
Ethereum address: [partial withdrawals](#partial-withdrawals) and
[full withdrawals](#full-withdrawals).

### Partial withdrawals

Partial withdrawals are for active validators that have a balance exceeding 32 ETH.
The network periodically makes transfers to the associated Ethereum address for
validators with a balance exceeding 32 ETH.
This means that a validator's balance periodically reduces to 32 ETH once
Capella becomes the active fork on the network.

### Full withdrawals

Full withdrawals are for validators that have exited the network, and have
waited the necessary time to withdraw their funds.
For these validators, their entire balance is returned to the Ethereum address
associated with the validator key.
The balance can't be transferred until the validator key is associated with an
Ethereum address.

An exited validator can't become active on the network again, and currently (as
of Capella), there's no mechanism for recycling the validator ID that has been exited.

## How it works

From the first Capella slot, block proposers provide up to 16 withdrawals per
proposed block.

Proposers start from validator 1, and find validators that qualify: must have an
Ethereum address as a withdrawal address, must have an excess balance, or have exited.

Block proposers select the withdrawals that go into the block.
In each block, up to 16 changes to withdrawal credentials are also allowed,
where an owner of a validator key can
[update their withdrawal key's Ethereum address](../HowTo/Withdrawal-Keys.md).
This update is retrieved from a pool, and the order isn't guaranteed.

## Withdrawal keys

Withdrawal keys configured as
[BLS keys](https://en.wikipedia.org/wiki/BLS_digital_signature) can't have
automated withdrawals executed for them.
Users must alter their credentials to specify an Ethereum address for their
withdrawal key.

BLS withdrawal keys are prefixed with `0x00`, whereas Ethereum withdrawal keys
are prefixed with `0x01`.

To determine the type of withdrawal key your validator uses, you can
[query your validator configuration onchain](../HowTo/Withdrawal-Keys.md#determine-the-withdrawal-address-type).

:::caution

Don't store your [validator keys](../HowTo/External-Signer/Manage-keys.md) and
withdrawal keys in the same location.

:::
