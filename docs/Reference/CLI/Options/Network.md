---
title: Network options
---

# `Network`

TODO description

### network

=== "Syntax"

    ```bash
    --network=<NETWORK>
    ```

=== "Example"

    ```bash
    --network=mainnet
    ```

=== "Environment variable"

    ```bash
    TEKU_NETWORK=mainnet
    ```

=== "Configuration file"

    ```bash
    network: "mainnet"
    ```

Predefined network configuration.
Accepts a predefined network name, or file path or URL to a YAML configuration file. See the
[consensus specification] for examples.

The default is `mainnet`.

Possible values are:

| Network      | Chain           | Type       | Description                                     |
|:-------------|:----------------|:-----------|:------------------------------------------------|
| `mainnet`    | Consensus layer | Production | Main network                                    |
| `minimal`    | Consensus layer | Test       | Used for local testing and development networks |
| `goerli`     | Consensus layer | Test       | Multi-client testnet                            |
| `gnosis`     | Consensus layer | Production | Network for the [Gnosis chain](https://docs.gnosischain.com/) |
| `sepolia`    | Consensus layer | Test       | Multi-client testnet                            |

Predefined networks can provide defaults such as the initial state of the network,
bootnodes, and the address of the deposit contract.

### initial-state

=== "Syntax"

    ```bash
    --initial-state=<FILE>
    ```

=== "Example"

    ```bash
    --initial-state=/home/me/genesis.ssz
    ```

=== "Environment variable"

    ```bash
    TEKU_INITIAL_STATE=/home/me/genesis.ssz
    ```

=== "Configuration file"

    ```bash
    initial-state: "/home/me/genesis.ssz"
    ```

Path or URL to an SSZ-encoded state file. The state file can be used to specify the genesis state,
or a [recent finalized checkpoint state from which to sync].

This option does not need to be specified if the genesis state is provided by the network specified
using the [`--network`](#network) option.

!!! note

    If overriding the initial state in a custom network, you must supply the initial state
    file at each restart.

!!! tip

    [Infura](https://infura.io/) can be used as the source of initial states with
    `--initial-state https://{projectid}:{secret}@eth2-beacon-mainnet.infura.io/eth/v2/debug/beacon/states/finalized`

### eth1-deposit-contract-address

=== "Syntax"

    ```bash
    --eth1-deposit-contract-address=<ADDRESS>
    ```

=== "Example"

    ```bash
    --eth1-deposit-contract-address=0x77f7bED277449F51505a4C54550B074030d989bC
    ```

=== "Environment variable"

    ```bash
    TEKU_ETH1_DEPOSIT_CONTRACT_ADDRESS=0x77f7bED277449F51505a4C54550B074030d989bC
    ```

=== "Configuration file"

    ```bash
    eth1-deposit-contract-address: "0x77f7bED277449F51505a4C54550B074030d989bC"
    ```

The address of the deposit contract. Only required when creating a custom network.

The deposit contract address can also be defined in:

* The genesis file specified using [`--initial-state`](#initial-state)
* The predefined network supplied using [`--network`](#network).

### p2p-advertised-ip

=== "Syntax"

    ```bash
    --p2p-advertised-ip=<IP_ADDRESS>
    ```

=== "Example"

    ```bash
    --p2p-advertised-ip=192.168.1.132
    ```

=== "Environment variable"

    ```bash
    TEKU_P2P_ADVERTISED_IP=192.168.1.132
    ```

=== "Configuration file"

    ```bash
    p2p-advertised-ip: "192.168.1.132"
    ```

Advertised peer-to-peer IP address. The default is `127.0.0.1`.

### p2p-enabled

=== "Syntax"

    ```bash
    --p2p-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --p2p-enabled=false
    ```

=== "Environment variable"

    ```bash
    TEKU_P2P_ENABLED=false
    ```

=== "Configuration file"

    ```bash
    p2p-enabled: false
    ```

Enables or disables all P2P communication.
The default is `true`.

### p2p-interface

=== "Syntax"

    ```bash
    --p2p-interface=<HOST>
    ```

=== "Example"

    ```bash
    --p2p-interface=192.168.1.132
    ```

=== "Environment variable"

    ```bash
    TEKU_P2P_INTERFACE=192.168.1.132
    ```

=== "Configuration file"

    ```bash
    p2p-interface: "192.168.1.132"
    ```

Specifies the network interface on which the node listens for P2P communication.
The default is `0.0.0.0` (all interfaces).

### p2p-nat-method

=== "Syntax"

    ```bash
    --p2p-nat-method=<STRING>
    ```

=== "Example"

    ```bash
    --p2p-nat-method=UPNP
    ```

=== "Environment variable"

    ```bash
    TEKU_P2P_NAT_METHOD=UPNP
    ```

=== "Configuration file"

    ```bash
    p2p-nat-method: "UPNP"
    ```

Specify the method for handling [NAT environments](../../HowTo/Find-and-Connect/Specifying-NAT.md).
Valid options are `NONE` and `UPNP`.

The default is `NONE`, which disables NAT functionality.

!!! tip

    UPnP support is often disabled by default in networking firmware. If disabled by default,
    explicitly enable UPnP support.

### p2p-peer-lower-bound

=== "Syntax"

    ```bash
    --p2p-peer-lower-bound=<INTEGER>
    ```

=== "Example"

    ```bash
    --p2p-peer-lower-bound=25
    ```

=== "Environment variable"

    ```bash
    TEKU_P2P_PEER_LOWER_BOUND=25
    ```

=== "Configuration file"

    ```bash
    p2p-peer-lower-bound: 25
    ```

Lower bound on the target number of peers. Teku will actively seek new peers if the number of peers falls below this value. The default is `64`.

### p2p-peer-upper-bound

=== "Syntax"

    ```bash
    --p2p-peer-upper-bound=<INTEGER>
    ```

=== "Example"

    ```bash
    --p2p-peer-upper-bound=40
    ```

=== "Environment variable"

    ```bash
    TEKU_P2P_PEER_UPPER_BOUND=40
    ```

=== "Configuration file"

    ```bash
    p2p-peer-upper-bound: 40
    ```

Upper bound on the target number of peers. Teku will refuse new peer requests that would cause the number of peers to exceed this value. The default is `100`.

### p2p-port

=== "Syntax"

    ```bash
    --p2p-port=<PORT>
    ```

=== "Example"

    ```bash
    # to listen on port 1789
    --p2p-port=1789
    ```

=== "Environment variable"

    ```bash
    # to listen on port 1789
    TEKU_P2P_PORT=1789
    ```

=== "Configuration file"

    ```bash
    p2p-port: 1789
    ```

Specifies the P2P listening ports (UDP and TCP).
The default is `9000`.

### p2p-discovery-enabled

=== "Syntax"

    ```bash
    --p2p-discovery-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --p2p-discovery-enabled=false
    ```

=== "Environment variable"

    ```bash
    TEKU_P2P_DISCOVERY_ENABLED=false
    ```

=== "Configuration file"

    ```bash
    p2p-discovery-enabled: false
    ```

Enables or disables P2P peer discovery. If disabled, [`p2p-static-peers`](#p2p-static-peers) defines
the peer connections. The default is `true`.

### p2p-discovery-bootnodes

=== "Syntax"

    ```bash
    --p2p-discovery-bootnodes=<ENR_ADDRESS>[,<ENR_ADDRESS>...]...
    ```

=== "Example"

    ```bash
    --p2p-discovery-bootnodes=enr:-Iu4QG...wgiMo,enr:-Iu4QL...wgiMo
    ```

=== "Environment variable"

    ```bash
    TEKU_P2P_DISCOVERY_BOOTNODES=enr:-Iu4QG...wgiMo,enr:-Iu4QL...wgiMo
    ```

=== "Configuration file"

    ```bash
    p2p-discovery-bootnodes: ["enr:-Iu4QG...wgiMo",
                              "enr:-Iu4QL...wgiMo"]
    ```

List of comma-separated Ethereum Node Records (ENRs) for P2P discovery bootstrap.

### p2p-advertised-port

=== "Syntax"

    ```bash
    --p2p-advertised-port=<PORT>
    ```

=== "Example"

    ```bash
    --p2p-advertised-port=1789
    ```

=== "Environment variable"

    ```bash
    TEKU_P2P_ADVERTISED_PORT=1789
    ```

=== "Configuration file"

    ```bash
    p2p-advertised-port: 1789
    ```

The advertised P2P port. The default is the port specified in [`--p2p-port`](#p2p-port).

The advertised port can differ from the [`--p2p-port`](#p2p-port). For example, you can set the
advertised port to 9010, and the `--p2p-port` value to 9009, then manually configure the firewall to
forward external incoming requests on port 9010 to port 9009 on the Teku node.

### p2p-udp-port

=== "Syntax"

    ```bash
    --p2p-udp-port=<PORT>
    ```

=== "Example"

    ```bash
    --p2p-udp-port=1789
    ```

=== "Environment variable"

    ```bash
    TEKU_P2P_UDP_PORT=1789
    ```

=== "Configuration file"

    ```bash
    p2p-udp-port: 1789
    ```

The UDP port used for discovery. The default is the port specified in [`--p2p-port`](#p2p-port).

### p2p-advertised-udp-port

=== "Syntax"

    ```bash
    --p2p-advertised-udp-port=<PORT>
    ```

=== "Example"

    ```bash
    --p2p-advertised-udp-port=1789
    ```

=== "Environment variable"

    ```bash
    TEKU_P2P_ADVERTISED_UDP_PORT=1789
    ```

=== "Configuration file"

    ```bash
    p2p-advertised-udp-port: 1789
    ```

The advertised UDP port to external peers.
The default is the port specified in [`--p2p-advertised-port`](#p2p-advertised-port) if it is set.
Otherwise, the default is the port specified in [`--p2p-port`](#p2p-port).

### p2p-private-key-file

=== "Syntax"

    ```bash
    --p2p-private-key-file=<PATH_TO_FILE>
    ```

=== "Example"

    ```bash
    --p2p-private-key-file=/home/me/me_node/key
    ```

=== "Environment variable"

    ```bash
    TEKU_P2P_PRIVATE_KEY_FILE=/home/me/me_node/key
    ```

=== "Configuration file"

    ```bash
    p2p-private-key-file: "/home/me/me_node/key"
    ```

File containing the [node's private key](../../Concepts/P2P-Private-Key.md).

### p2p-static-peers

=== "Syntax"

    ```bash
    --p2p-static-peers=<ADDRESS>[,<ADDRESS>...]...
    ```

=== "Example"

    ```bash
    --p2p-static-peers=/ip4/151.150.191.80/tcp/9000/p2p/16Ui...aXRz,/ip4/151.150.191.80/tcp/9000/p2p/16Ui...q6f1
    ```

=== "Environment variable"

    ```bash
    TEKU_P2P_STATIC_PEERS=/ip4/151.150.191.80/tcp/9000/p2p/16Ui...aXRz,/ip4/151.150.191.80/tcp/9000/p2p/16Ui...q6f1
    ```

=== "Configuration file"

    ```bash
    p2p-static-peers: ["/ip4/151.150.191.80/tcp/9000/p2p/16Ui...aXRz",
                       "/ip4/151.150.191.80/tcp/9000/p2p/16Ui...q6f1"]
    ```

List of comma-separated [multiaddresses](https://docs.libp2p.io/reference/glossary/#multiaddr)
of static peers.

### p2p-subscribe-all-subnets-enabled

=== "Syntax"

    ```bash
    --p2p-subscribe-all-subnets-enabled=<BOOLEAN>
    ```

=== "Example"

    ```bash
    --p2p-subscribe-all-subnets-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_P2P_SUBSCRIBE_ALL_SUBNETS_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    p2p-subscribe-all-subnets-enabled: true
    ```

Forces the beacon node to stay subscribed to all subnets regardless of the number of validators.
The default is `false`.

When set to `true` and running a low number of validators, Teku subscribes and unsubscribes from
subnets as needed for the running validators.

This option is primarily for users running an external validator client and load balancing it
across multiple beacon nodes. Without this flag, depending on how requests are load balanced, the
beacon nodes may not have subscribed to the required subnets and be unable to produce aggregates.

!!! important

    When set to `true`, Teku uses more CPU and bandwidth, and for most users there’s no need to use
    this option.