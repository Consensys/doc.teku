---
description: Describe weak subjectivity
---

# Weak subjectivity

The weak subjectivity period refers to how far behind the chain head a node can be before knowing
that 1/3 of validators have exited.

For example, if 1/3 of validators withdraw their stake and continue signing blocks and
attestations, they can form a chain which conflicts with the finalised state. If your node is far
enough behind the chain head not to be aware that they've withdrawn their funds, these validators
can act dishonestly and continue feeding you blocks to lead you down the wrong chain.

!!! note

    If a node is aware that a validator has withdrawn its funds, the node will reject the
    validator's attestations.

Teku allows you to [supply a weak subjectivity checkpoint], which is a point in the network from which
a node can securely update their view of the current state.

The [BeaconScan chain explorer] provides the most recent weak subjectivity checkpoint from which to
safely update your nodes view of the current state.

<!-- links -->
[BeaconScan chain explorer]: https://beaconscan.com/ws_checkpoint
[supply a weak subjectivity checkpoint]: ../Reference/CLI/CLI-Syntax.md#ws-checkpoint