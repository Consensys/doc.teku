---
description: Describe weak subjectivity
---

# Weak subjectivity

The weak subjectivity period refers to how far behind the chain head a node can be before 1/3 of
validators may have exited since the node was last in sync.

For example, if 1/3 of validators withdraw their stake and continue signing blocks and
attestations, they can form a chain which conflicts with the finalised state. If your node is far
enough behind the chain head not to be aware that they've withdrawn their funds, these validators
can act dishonestly and continue feeding you blocks to lead you down the wrong chain.

!!! note

    If a node is aware that a validator has withdrawn its funds, the node will reject the
    validator's attestations.

## Safely sync your node

Teku provides two methods to safely sync a node that's been offline for an extended period.

1. Use [`--ws-checkpoint`](../Reference/CLI/CLI-Syntax.md#ws-checkpoint) to supply a weak
    subjectivity checkpoint from which a node can securely update its view of the current state.
1. Use [`--initial-state`](../Reference/CLI/CLI-Syntax.md#initial-state) to supply an SSZ encoded
    state file from which to sync.

!!! tip

    Use the [`/eth/v2/debug/beacon/states/<state_id>`](https://consensys.github.io/teku/#operation/getEthV2DebugBeaconStatesWithState_id)
    API on an updated node to download a recent finalized state as an SSZ encoded state file.
