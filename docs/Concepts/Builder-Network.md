---
description: Builder network and MEV-Boost
---

# Builder network and MEV-Boost

When [The Merge](Merge.md) completes, [consensus clients](Merge.md#consensus-clients)
will be responsible for proposing blocks containing an execution payload obtained
from their local [execution clients](Merge.md#execution-clients) via the Engine API.

A consensus client can optionally configure an external builder and
delegate the execution payload construction to it, instead of using the execution client.

## MEV-Boost

The most common builder deployment is to run a specialised external software such as [MEV-Boost](https://github.com/flashbots/mev-boost).
MEV-Boost works by requesting a payload proposal from several entities (called relays), and selecting the best bid
in order to improve validator rewards and increase the maximal extractable value (MEV).

Teku allows you to [configure the beacon node to use a builder network](../HowTo/Builder-Network.md) to generate execution payloads.
In case of failures or non-timely responses, Teku falls back to the payload produced by the local execution client specified with [`ee-endpoint`](../Reference/CLI/CLI-Syntax.md#ee-endpoint).
