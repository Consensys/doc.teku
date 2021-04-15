---
description: Configuring NAT with Teku
---

# Configuring NAT

Use the [`--p2p-nat-method`](../../Reference/CLI/CLI-Syntax.md#p2p-nat-method) option to specify the
NAT method. Options are [`NONE`](#none) and [`UPNP`](#upnp).

You cannot change the NAT method while Teku is running. To change the NAT method restart the node
with the [`--p2p-nat-method`](../../Reference/CLI/CLI-Syntax.md#p2p-nat-method) option.

## UPnP

Specify `UPNP` to quickly allow inbound peer connections without manual router configuration. Use
UPnP in home or small office environments where a wireless router or modem provides NAT isolation.

UPnP automatically detects if a node is running in a UPnP environment and provides port forwarding.
UPnP might introduce delays during node startup, especially on networks without a UPnP gateway
device.

!!! tip

    UPnP support is often disabled by default in networking firmware. If disabled by default, you
    must explicitly enable UPnP support.

!!! important

    When the NAT method is set to `UPNP`, the advertised port is the same as the
    [listening port](../../Reference/CLI/CLI-Syntax.md#p2p-port).

## None

Specify `NONE` to explicitly configure the external IP address and ports advertised using
[`--p2p-host`](../../Reference/CLI/CLI-Syntax.md#p2p-host) and
[`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port) for the P2P service.

!!! important

    When the NAT method is set to `NONE`, the advertised port is the same as the
    [listening port](../../Reference/CLI/CLI-Syntax.md#p2p-port). Manual configuration of your
    firewall may be required to allow external hosts to create inbound connections to Teku.
