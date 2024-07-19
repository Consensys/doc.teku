---
title: IPv6 support
description: IPv6 support
sidebar_position: 6
---

# IPv6 support

Teku can be configured to listen over IPv4, IPv6, or both (Dual-stack).

## Listen over only IPv6

To configure Teku to listen only on IPv6, set the [`--p2p-interface`](../reference/cli/index.md#p2p-interface-p2p-interfaces) CLI option to `::`. The [`--p2p-port`](../reference/cli/index.md#p2p-port) and [`--p2p-udp-port`](../reference/cli/index.md#p2p-udp-port) CLI options will be used for the p2p and discovery ports, similar to listening over IPv4 only.

## Listen over both IPv4 and IPv6 (Dual-stack)

To enable dual-stack support, configure the [`--p2p-interface`](../reference/cli/index.md#p2p-interface-p2p-interfaces) CLI option to `0.0.0.0,::` for both IPv4 and IPv6 listening addresses. In this setup, the [`--p2p-port`](../reference/cli/index.md#p2p-port) and [`--p2p-udp-port`](../reference/cli/index.md#p2p-udp-port) options apply to the IPv4 address, while the [`--p2p-port-ipv6`](../reference/cli/index.md#p2p-port-ipv6) and [`--p2p-udp-port-ipv6`](../reference/cli/index.md#p2p-udp-port-ipv6) options apply to the IPv6 address.

When dual-stack is enabled, Teku defaults to using port `9000` for both TCP and UDP on IPv4, and port `9090` for both TCP and UDP on IPv6.

## Advertise only IPv6 address

To advertise only your IPv6 public address to the network, use the [`--p2p-advertised-ip`](../reference/cli/index.md#p2p-advertised-ip-p2p-advertised-ips) CLI option. This is similar to advertising an IPv4 address. The advertised port can be configured using the [`--p2p-advertised-port`](../reference/cli/index.md#p2p-advertised-port) CLI option, which defaults to the value of [`--p2p-port`](../reference/cli/index.md#p2p-port).

## Advertise both IPv4 and IPv6 addresses (Dual-stack)

To advertise both your IPv4 and IPv6 public addresses to the network, use the [`--p2p-advertised-ips`](../reference/cli/index.md#p2p-advertised-ip-p2p-advertised-ips) CLI option and provide the two addresses separated by a comma. The advertised port for the IPv4 address can be configured using the [`--p2p-advertised-port`](../reference/cli/index.md#p2p-advertised-port) option, while the advertised port for the IPv6 address can be configured using the [`--p2p-advertised-port-ipv6`](../reference/cli/index.md#p2p-advertised-port-ipv6) option, which defaults to the value of [`--p2p-port-ipv6`](../reference/cli/index.md#p2p-port-ipv6).





