---
title: Node private key
description: Describe the peer-to-peer private key
sidebar_position: 5
---

# Peer-to-peer private key

The peer-to-peer (P2P) private key is used to identify the beacon node on the network and secures the information channel between nodes.

When starting Teku, if the [`--p2p-private-key-file`](../Reference/CLI/CLI-Syntax.md#p2p-private-key-file) option is not specified, and the `generated-node-key.dat` file does not exist in the node's data directory, Teku generates a P2P private key and writes it to the `generated-node-key.dat` file.

If the `generated-node-key.dat` file exists in the data directory when starting Teku, the node starts using the private stored in the file.

!!! info

    The `generated-node-key.dat` file is stored by default in the
    `<data-beacon-path>/kvstore` directory, where `<data-beacon-path>` is specified using the
    [`--data-beacon-path`](../Reference/CLI/CLI-Syntax.md#data-beacon-path) option.
