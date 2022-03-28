---
description: What is the Merge?
---

# The Merge

The Ethereum upgrade known as [The Merge](https://ethereum.org/en/upgrades/merge/) will merge the [Beacon Chain] into
Ethereum Mainnet, turning Mainnet into a combination of an
[execution layer and consensus layer](#execution-and-consensus-clients).
The Merge will transition Mainnet from proof of work to [proof of stake consensus](Proof-of-Stake.md).

## Execution and consensus clients

After The Merge, a full Ethereum Mainnet node will be a combination of an execution client (previously called an
[Ethereum 1.0](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) client) and a consensus client (previously
called an [Ethereum 2.0](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) client).

Execution clients, such as [Besu], manage the state and execute transactions on the execution layer.
Consensus clients, such as Teku, contain beacon node and validator client implementations.
The beacon node is the primary link to the [Beacon Chain] (consensus layer).
The validator client performs [validator duties](Proof-of-Stake.md) on the consensus layer.

Execution and consensus clients communicate with each other using the
[Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/specification.md).
Execution clients serve [JSON-RPC API](https://besu.hyperledger.org/en/stable/Reference/API-Methods/) requests and
consensus clients serve [REST API](../Reference/Rest_API/Rest.md) requests.
Execution clients communicate among each other in a peer-to-peer network, and consensus clients do the same.

![Ethereum Merge node](../images/Execution-Consensus-Clients.png)

### Run a node

After The Merge, a Mainnet node operator must run both an execution client and a beacon node at the same time.
To become a validator, you must also run a validator client (either
[in the same process as the beacon node](../HowTo/Get-Started/Run-Teku.md#start-the-clients-in-a-single-process) or
[separately](../HowTo/Get-Started/Run-Teku.md#run-the-clients-separately).

You can [test Teku with Besu on the Kiln Merge testnet](https://besu.hyperledger.org/en/latest/Tutorials/Merge-Testnet/).

You can [run Teku on Ethereum Mainnet](../HowTo/Get-Started/Connect/Connect-To-Mainnet.md).

<!-- links -->
[Beacon Chain]: https://ethereum.org/en/upgrades/beacon-chain/
[Besu]: https://besu.hyperledger.org/en/stable/
