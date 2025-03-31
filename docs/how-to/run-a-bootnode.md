---
description: Run Teku as a Bootnode.
sidebar_position: 13
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Run Teku as a Bootnode

## What is a Bootnode?

Any new node joining the Ethereum network needs to be able to talk to other Ethereum nodes in the same network.

Ethereum uses the Discovery protocol to find new nodes.

The Discovery process starts with a small set of nodes, known as Bootnodes, that are already coded into the Ethereum clients.

You can also specify other nodes as your initial list of bootnodes using the option [`p2p-discovery-bootnodes`](../reference/cli#p2p-discovery-bootnodes).

:::note

Any Teku running as a Beacon Node is already acting running the Discovery protocol and can be used as a bootnode.

:::

## Running Teku in Bootnode-only mode

You can run Teku in bootnode-only mode if you do not want to have a full beacon node running.

When running in bootnode-only mode, Teku will only enable its Discovery service.

In bootnode-only mode, Teku can't:

- Synchronize with the chain.

- Validate or produce blocks.

- Respond to Beacon API queries.

To run Teku in bootnode-only mode, start Teku with the subcommand `bootnode`:

```bash
teku bootnode <extra_options>
```

Here is an example of common options used for a mainnet bootnode:

```bash
teku bootnode \
  --network="mainnet" \
  --p2p-port=9000 \
  --p2p-advertised-ip=116.250.191.71 \
  --p2p-private-key-file=/opt/data/node-key.txt
```

In the example above, we are setting the bootnode to the Mainnet network, and specifying the IP and Port used for external communication
with other nodes using [`--p2p-port`](../reference/cli#p2p-port) and [`--p2p-advertised-ip`](../reference/cli#p2p-advertised-ip)
options.

We are also setting the node key to always use the same key using the option [`--p2p-private-key-file`](../reference/cli#p2p-private-key-file).
This is important to ensure our bootnode will have a stable ENR that we can share with other users so they can communicate with our bootnode.
