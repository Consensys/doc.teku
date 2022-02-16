---
title: How to improve P2P connectivity
---

# Improving P2P connectivity

The consensus layer relies on peer-to-peer (P2P) networking. By having a good peer count you
increase the performance and health of your node. When a Teku node starts up, it looks for
participants on the P2P network by listening for incoming connections, and finds and connects to
peers.

While Teku is good at finding peers, changes to your network configuration can help improve your
peer count.

## Advertising your public IP address

If you are using a NAT, it's easier to get peers by advertising your public address to the network.
Use the [`--p2p-advertised-ip`](../../Reference/CLI/CLI-Syntax.md#p2p-advertised-ip) option to
advertise the address publicly.

Additionally, if on a home network, [configure port forwarding](#configuring-ports) on your router.

!!! tip

    Check the [`ip4.me`](http://ip4.me/) website to view your public IP address.

## Configuring ports

By default, Teku listens for connections on port `9000` for TCP and UDP. You can configure the port
number with the [`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port) option.

Configure port forwarding on your router and firewall to allow incoming and outgoing connections on
the listening port for the TCP and UDP protocols.

View your router or firewall documentation to configure port-fowarding.

## Checking readiness with a peer count

Check the readiness of your node by using the [`get node readiness` API](https://consensys.github.io/teku/#operation/getTekuV1AdminReadiness).
This check helps to prevent a beacon from receiving traffic from validators while the node is not being connected to enough peers.

You can specify a number in the `target_peer_count` parameter to require a minimum number of peers before the node is considered ready.

!!! note

    Make sure to [enable the REST API service](../../Reference/Rest_API/Rest.md#enable-the-rest-api-service).
