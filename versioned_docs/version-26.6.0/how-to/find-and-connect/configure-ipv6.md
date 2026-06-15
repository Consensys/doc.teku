---
description: Configure Teku to listen over IPv6.
sidebar_position: 3
---

# Configure IPv6

You can configure Teku to listen over IPv4, [IPv6](#listen-over-only-ipv6), or
[both (dual-stack)](#listen-over-both-ipv4-and-ipv6-dual-stack).

## Listen over only IPv6

To configure Teku to listen only on IPv6, set the
[`--p2p-interface`](../../reference/cli/index.md#p2p-interface-p2p-interfaces) CLI option to `::`.
The [`--p2p-port`](../../reference/cli/index.md#p2p-port) and
[`--p2p-udp-port`](../../reference/cli/index.md#p2p-udp-port) CLI options are used for the P2P and
discovery ports, similar to listening over IPv4 only.

## Listen over both IPv4 and IPv6 (dual-stack)

To configure Teku to listen over both IPv4 and IPv6, also known as dual-stack support, set the
[`--p2p-interface`](../../reference/cli/index.md#p2p-interface-p2p-interfaces) CLI option to
`0.0.0.0,::` for both IPv4 and IPv6 listening addresses. 
In this setup, the [`--p2p-port`](../../reference/cli/index.md#p2p-port) and
[`--p2p-udp-port`](../../reference/cli/index.md#p2p-udp-port) options apply to the IPv4 address.
The [`--p2p-port-ipv6`](../../reference/cli/index.md#p2p-port-ipv6) and
[`--p2p-udp-port-ipv6`](../../reference/cli/index.md#p2p-udp-port-ipv6) options apply to the IPv6 address.

After dual-stack support is enabled, Teku uses port `9000` for both TCP and UDP on IPv4, and port
`9090` for both TCP and UDP on IPv6 by default.

## Advertise only the IPv6 address

To advertise only the IPv6 public address to the network, use the
[`--p2p-advertised-ip`](../../reference/cli/index.md#p2p-advertised-ip-p2p-advertised-ips) CLI option. 
This is similar to advertising an IPv4 address.
Configure the advertised port using the
[`--p2p-advertised-port`](../../reference/cli/index.md#p2p-advertised-port) CLI option. 
It uses the value set in [`--p2p-port`](../../reference/cli/index.md#p2p-port) by default.

## Advertise both IPv4 and IPv6 addresses (dual-stack)

To advertise both the IPv4 and IPv6 public addresses to the network, use the
[`--p2p-advertised-ips`](../../reference/cli/index.md#p2p-advertised-ip-p2p-advertised-ips) CLI
option and provide the two addresses, separated by a comma. 
Configure the advertised port for the IPv4 address using the
[`--p2p-advertised-port`](../../reference/cli/index.md#p2p-advertised-port) option. 
Configure the advertised port for the IPv6 address using the
[`--p2p-advertised-port-ipv6`](../../reference/cli/index.md#p2p-advertised-port-ipv6) option. 
This port is set to the value of [`--p2p-port-ipv6`](../../reference/cli/index.md#p2p-port-ipv6) by default.
