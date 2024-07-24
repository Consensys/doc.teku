---
title: IPv6 support
description: IPv6 support
sidebar_position: 13
---

# IPv6 support

You can configure Teku to listen over IPv4, [IPv6](#configure-ipv6-listening), or [both (dual-stack)](#configure-dual-stack-listening).

## Configure IPv6 listening

To configure Teku to listen only over IPv6 addresses, set the [`--p2p-interface`](../reference/cli/index.md#p2p-interface-p2p-interfaces) CLI option to `::`. 
Use the [`--p2p-port`](../reference/cli/index.md#p2p-port) and [`--p2p-udp-port`](../reference/cli/index.md#p2p-udp-port) CLI options for the p2p and discovery ports, similar to listening over only IPv4 addresses.

## Enable dual-stack support

To configure Teku to listen over both IPv4 and IPv6 addresses, also known as dual-stack support, set the [`--p2p-interface`](../reference/cli/index.md#p2p-interface-p2p-interfaces) CLI option to `0.0.0.0,::` for both IPv4 and IPv6 listening addresses. 
In this setup, the [`--p2p-port`](../reference/cli/index.md#p2p-port) and [`--p2p-udp-port`](../reference/cli/index.md#p2p-udp-port) options apply to the IPv4 address. The [`--p2p-port-ipv6`](../reference/cli/index.md#p2p-port-ipv6) and [`--p2p-udp-port-ipv6`](../reference/cli/index.md#p2p-udp-port-ipv6) options apply to the IPv6 address.

After enabling dual-stack support, Teku defaults to using port `9000` for both TCP and UDP on IPv4 and port `9090` for both TCP and UDP on IPv6.

## Advertise only the IPv6 address

To advertise only the IPv6 public address to the network, use the [`--p2p-advertised-ip`](../reference/cli/index.md#p2p-advertised-ip-p2p-advertised-ips) CLI option. 
This is similar to advertising an IPv4 address. Configure the advertised port using the [`--p2p-advertised-port`](../reference/cli/index.md#p2p-advertised-port) CLI option. 
By default, the port uses the value set in [`--p2p-port`](../reference/cli/index.md#p2p-port).

## Advertise both IPv4 and IPv6 addresses

To advertise both the IPv4 and IPv6 public addresses to the network, use the [`--p2p-advertised-ips`](../reference/cli/index.md#p2p-advertised-ip-p2p-advertised-ips) CLI option and provide the two addresses, separated by a comma. 
Configure the advertised port for the IPv4 address using the [`--p2p-advertised-port`](../reference/cli/index.md#p2p-advertised-port) option. 
Configure the advertised port for the IPv6 address using the [`--p2p-advertised-port-ipv6`](../reference/cli/index.md#p2p-advertised-port-ipv6) option. 
By default, the port is set to the value specified in [`--p2p-port-ipv6`](../reference/cli/index.md#p2p-port-ipv6).
