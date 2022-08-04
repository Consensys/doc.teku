---
description: What is the Merge?
---

# The Merge

The Ethereum upgrade known as [The Merge](https://ethereum.org/en/upgrades/merge/) will merge the
[Beacon Chain](https://ethereum.org/en/upgrades/beacon-chain/) into Ethereum Mainnet, turning Mainnet into a combination
of an [execution layer and consensus layer](#execution-and-consensus-clients).
The Merge will transition Mainnet from proof of work to [proof of stake consensus](Proof-of-Stake.md).

You can [prepare Teku for The Merge](../HowTo/Prepare-for-The-Merge.md) and
[test Teku with Hyperledger Besu on the Kiln Merge testnet](https://besu.hyperledger.org/en/stable/Tutorials/Merge-Testnet/).

## Execution and consensus clients

After The Merge, a full Ethereum Mainnet node will be a combination of an execution client (previously called an
[Ethereum 1.0](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) client) and a consensus client (previously
called an [Ethereum 2.0](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) client).

Execution and consensus clients communicate with each other using the
[Engine API](https://besu.hyperledger.org/en/latest/HowTo/Interact/APIs/Engine-API/).

![Ethereum Merge node](../images/Execution-Consensus-Clients.png)

### Execution clients

Execution clients, such as [Besu](https://besu.hyperledger.org/en/stable/), manage the execution layer, including
executing transactions and updating the world state.
Execution clients serve [JSON-RPC API](https://besu.hyperledger.org/en/stable/Reference/API-Methods/) requests and
communicate with each other in a peer-to-peer network.

### Consensus clients

Consensus clients, such as Teku, contain beacon node and validator client implementations.
The beacon node is the primary link to the [Beacon Chain](https://ethereum.org/en/upgrades/beacon-chain/) (consensus layer).
The validator client performs [validator duties](Proof-of-Stake.md) on the consensus layer.
Consensus clients serve [REST API](../Reference/Rest_API/Rest.md) requests and communicate with each other in a
peer-to-peer network.

## What happens during The Merge

Before The Merge, the execution and consensus clients' configurations will be
[updated](../HowTo/Prepare-for-The-Merge.md#update-teku) to listen for a certain total terminal difficulty (TTD) to be
reached on the [execution endpoint](../Reference/CLI/CLI-Syntax.md#ee-endpoint).

Teku will periodically request information about the execution client's configuration to check that they agree on the
configuration and can connect.
Teku will log warnings if the configuration doesn't match.

The consensus layer will enable the Merge configuration (Bellatrix) before reaching the TTD.
Once the execution layer blocks reach the TTD, the Beacon Chain will merge into Ethereum Mainnet, and Ethereum will move
to a proof of stake network.

After The Merge, a Mainnet node operator must run both an execution client and a beacon node at the same time.
To become a validator, you must also run a validator client (either
[in the same process as the beacon node](../HowTo/Get-Started/Run-Teku.md#start-the-clients-in-a-single-process) or
[separately](../HowTo/Get-Started/Run-Teku.md#run-the-clients-separately)).

After The Merge, in addition to validators earning rewards for performing [validator duties](Proof-of-Stake.md),
[fee recipients](../HowTo/Prepare-for-The-Merge.md#fee-recipient) will also earn rewards for the inclusion of execution
layer transactions.

You can [prepare Teku for The Merge](../HowTo/Prepare-for-The-Merge.md).

## After The Merge

After the merge of a network is complete, a single 'node' becomes a combination of both the execution client and the consensus client. 
If either component is not available, the node will not be available on the network.

This means that after the merge has occurred, for a node to be available on the network, both the execution client and the consensus client must be 
active.  Further, for duties to be performed, the execution client and the consensus client must be in sync with their portion of the network. 
If the execution client is syncing, the consensus client can use optimistic sync to import blocks, but cannot perform duties.