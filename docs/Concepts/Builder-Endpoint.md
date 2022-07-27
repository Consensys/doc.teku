---
description: Builder endpoint
---

# Builder endpoint

When [The Merge](Merge.md) completes, [consensus clients](Merge.md#consensus-clients)
will be responsible for proposing blocks containing an execution payload obtained
from their local [execution clients](Merge.md#execution-clients) via the Engine API.

Optionally, a consensus client can configure an external builder endpoint and
delegate the execution payload construction to it, instead of using the execution client.

The most common builder endpoint deployment is to run a specialised external software such as [`mev-boost`](https://github.com/flashbots/mev-boost).
`mev-boost`works by requesting a payload proposal from several entities (called relays) and selecting the best bid,
in order to improve validator rewards and increase the maximal extractable value (MEV).

Teku allows [configuring the beacon node to a builder endpoint](../HowTo/Builder-Endpoint.md) for generating execution payloads.
In case of failures or non-timely responses, Teku falls back to the payload produced by the local execution client as specified with [`ee-endpoint`](../Reference/CLI/CLI-Syntax.md#ee-endpoint).
