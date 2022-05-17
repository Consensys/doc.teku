---
description: Teku command line interface reference
---

# Teku command line

This reference describes the syntax of the Teku command line interface (CLI) options.

!!! important

    The CLI options are currently under development and may change.

## Specifying options

You can specify Teku options:

* On the command line.
  
    ```bash
    teku [OPTIONS] [COMMAND]
    ```

* As an environment variable.
  For each command line option, the equivalent environment variable is:

    * Uppercase.
    * `-` is replaced by `_`.
    * Has a `TEKU_` prefix.

* In a [YAML configuration file](../../HowTo/Configure/Use-Configuration-File.md).

If an option is specified in multiple places, the order of priority is command line, environment variable,
configuration file.

## Using autocomplete

If using Bash or Z shell, you can enable autocomplete support by navigating to the `build` folder and running:

```bash
source teku.autocomplete.sh
```

Autocomplete allows you to view option suggestions by entering `--` and pressing the Tab key twice.

```bash
teku --Tab+Tab
```

## Options

### config-file

=== "Syntax"

    ```bash
    --config-file=<FILE>
    ```

=== "Example"

    ```bash
    --config-file=/home/me/me_node/config.yaml
    ```

=== "Environment variable"

    ```bash
    TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
    ```

Path to the [YAML configuration file](../../HowTo/Configure/Use-Configuration-File.md).
The default is `none`.

### data-base-path, data-path

=== "Syntax"

    ```bash
    --data-base-path=<PATH>
    ```

=== "Example"

    ```bash
    --data-base-path=/home/me/me_node
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_BASE_PATH=/home/me/me_node
    ```

=== "Configuration file"

    ```bash
    data-base-path: "/home/me/me_node"
    ```

Path to the Teku data directory. The default directory is OS-dependent:

* macOS: `~/Library/teku`
* Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`
* Windows: `%localappdata%\teku`.

The default Docker image location is `/root/.local/share/teku`.

### data-beacon-path

=== "Syntax"

    ```bash
    --data-beacon-path=<PATH>
    ```

=== "Example"

    ```bash
    --data-beacon-path=/home/me/me_beacon
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_BEACON_PATH=/home/me/me_beacon
    ```

=== "Configuration file"

    ```bash
    data-beacon-path: "/home/me/me_beaon"
    ```

Path to the beacon node data. The default is `<data-base-path>/beacon` where `<data-base-path>`
is specified using [`--data-base-path`](#data-base-path-data-path).

### data-storage-archive-frequency

=== "Syntax"

    ```bash
    --data-storage-archive-frequency=<NUMBER>
    ```

=== "Example"

    ```bash
    --data-storage-archive-frequency=1028
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_STORAGE_ARCHIVE_FREQUENCY=1028
    ```

=== "Configuration file"

    ```bash
    data-storage-archive-frequency: 1028
    ```

Set the frequency (in slots) at which to store finalized states to disk. The default is 2048.

This option is ignored if [`--data-storage-mode`](#data-storage-mode) is set to `prune`.

!!! note
    Specifying a larger number of slots as the archive frequency has a potentially higher overhead
    for retrieving finalized states since more states may need to be regenerated to get to the
    requested state. Specifying a lower number of slots as the frequency increases the disk space
    usage.

    For example, `--data-storage-archive-frequency=1` uses maximum disk space but has the lowest
    response time for retrieving a finalized state since each slot state is saved, whereas
    `--data-storage-archive-frequency=2048` uses less disk space, but may need to regenerate the
    state because every 2048th slot state is saved.

### data-storage-mode

=== "Syntax"

    ```bash
    --data-storage-mode=<STORAGE_MODE>
    ```

=== "Example"

    ```bash
    --data-storage-mode=archive
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_STORAGE_MODE=archive
    ```

=== "Configuration file"

    ```bash
    data-storage-mode: "archive"
    ```

Set the strategy for handling historical chain data. Valid options are `prune` and `archive`.
The default is `prune`.

### data-storage-non-canonical-blocks-enabled

=== "Syntax"

    ```bash
    --data-storage-non-canonical-blocks-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --data-storage-non-canonical-blocks-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_STORAGE_NON_CANONICAL_BLOCKS_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    data-storage-non-canonical-blocks-enabled: true
    ```

Specify whether to store non-canonical blocks.
The default is `false`.

### data-validator-path

=== "Syntax"

    ```bash
    --data-validator-path=<PATH>
    ```

=== "Example"

    ```bash
    --data-validator-path=/home/me/me_validator
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_VALIDATOR_PATH=/home/me/me_validator
    ```

=== "Configuration file"

    ```bash
    data-validator-path: "/home/me/me_validator"
    ```

Path to the validator client data. The default is `<data-base-path>/validator` where `<data-base-path>`
is specified using [`--data-base-path`](#data-base-path-data-path).

### ee-endpoint

=== "Syntax"

    ```bash
    --ee-endpoint=<URL>
    ```

=== "Example"

    ```bash
    --ee-endpoint=http://localhost:8550
    ```

=== "Environment variable"

    ```bash
    TEKU_EE_ENDPOINT=http://localhost:8550
    ```

=== "Configuration file"

    ```bash
    ee-endpoint: "http://localhost:8550"
    ```

URL of the [execution client's](../../Concepts/Merge.md#execution-clients) Engine JSON-RPC APIs.
This replaces [`eth1-endpoint`](#eth1-endpoint-eth1-endpoints) after [The Merge](../../Concepts/Merge.md).

### ee-jwt-secret-file

=== "Syntax"

    ```bash
    --ee-jwt-secret-file=<FILE>
    ```

=== "Example"

    ```bash
    --ee-jwt-secret-file=ee-jwt-secret.hex
    ```

=== "Environment variable"

    ```bash
    TEKU_EE_JWT_SECRET_FILE=ee-jwt-secret.hex
    ```

=== "Configuration file"

    ```bash
    ee-jwt-secret-file: "ee-jwt-secret.hex"
    ```

Shared secret used to authenticate [execution clients](../../Concepts/Merge.md#execution-and-consensus-clients) when
using the Engine JSON-RPC API.
Contents of file must be 32 hex-encoded bytes.
May be a relative or absolute path.
See an [example of how to generate this](../../HowTo/Prepare-for-The-Merge.md#configure-the-java-web-token).

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

### eth1-deposit-contract-max-request-size

=== "Syntax"

    ```bash
    --eth1-deposit-contract-max-request-size=<INTEGER>
    ```

=== "Example"

    ```bash
    --eth1-deposit-contract-max-request-size=8000
    ```

=== "Environment variable"

    ```bash
    TEKU_ETH1_DEPOSIT_CONTRACT_MAX_REQUEST_SIZE=8000
    ```

=== "Configuration file"

    ```bash
    eth1-deposit-contract-max-request-size: 8000
    ```

The maximum number of blocks to request deposit contract event logs for in a single request.
The default is 10000.

Setting a smaller max size may help if your ETH1 node is slow at loading deposit event logs, or when
receiving warnings that the ETH1 node is unavailable.

### eth1-endpoint, eth1-endpoints

=== "Syntax"

    ```bash
    --eth1-endpoint=<URL>[,<URL>...]...
    ```

=== "Example"

    ```bash
    --eth1-endpoint=http://localhost:8545,https://mainnet.infura.io/v3/d0e21ccd0b1e4eef7784422eabc51111
    ```

=== "Environment variable"

    ```bash
    TEKU_ETH1_ENDPOINT=http://localhost:8545,https://mainnet.infura.io/v3/d0e21ccd0b1e4eef7784422eabc51111
    ```

=== "Configuration file"

    ```bash
    eth1-endpoint: ["http://localhost:8545","https://mainnet.infura.io/v3/d0e21ccd0b1e4eef7784422eabc51111"]
    ```

Comma-separated list of JSON-RPC URLs of execution layer (Ethereum 1.0) nodes.
Each time Teku makes a call, it finds the first provider in the list that is available, on the right chain, and in sync.
This option must be specified if running a validator.

If not specified (that is, you're running a beacon node only), then provide an initial state
using the [`--initial-state`](#initial-state) option, or start Teku from an existing database using
[`--data-path`](#data-base-path-data-path), which provides the initial state to work from. You do not need to
provide an initial state if running a public network which has already started (for example,
Mainnet or Prater).

If using a cloud-based service such as [Infura], then set the endpoint to the supplied URL.
For example, `https://goerli.infura.io/v3/<Project_ID>`.

!!! important

    After [The Merge](../../Concepts/Merge.md), you can't use `eth1-endpoint` to specify an external execution layer
    provider.
    This option will be replaced by [`ee-endpoint`](#ee-endpoint) for each beacon node.
    You can [configure your execution client](../../HowTo/Prepare-for-The-Merge.md) before The Merge.

### help

=== "Syntax"

    ```bash
    -h, --help
    ```

Show the help message and exit.

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

### logging

=== "Syntax"

    ```bash
    -l, --logging=<LEVEL>
    ```

=== "Example"

    ```bash
    --logging=DEBUG
    ```

=== "Environment variable"

    ```bash
    TEKU_LOGGING=DEBUG
    ```

=== "Configuration file"

    ```bash
    logging: "DEBUG"
    ```

Sets the logging verbosity.
Log levels are `OFF`, `FATAL`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`, `ALL`.
Default is `INFO`.

### log-color-enabled

=== "Syntax"

    ```bash
    --log-color-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --log-color-enabled=false
    ```

=== "Environment variable"

    ```bash
    TEKU_LOG_COLOR_ENABLED=false
    ```

=== "Configuration file"

    ```bash
    log-color-enabled: false
    ```

Specify whether status and event log messages include a console color display code.
The default is `true`.

### log-destination

=== "Syntax"

    ```bash
    --log-destination=<LOG_DESTINATION>
    ```

=== "Example"

    ```bash
    --log-destination=CONSOLE
    ```

=== "Environment variable"

    ```bash
    TEKU_LOG_DESTINATION=CONSOLE
    ```

=== "Configuration file"

    ```bash
    log-destination: "CONSOLE"
    ```

Specify where to output log information. Valid options are:

* `BOTH`
* `CONSOLE`
* `DEFAULT_BOTH`
* `FILE`

The default is `DEFAULT_BOTH`. When using `BOTH` or `DEFAULT_BOTH`, system updates such as blockchain
events are displayed on the console, and errors and other information are logged to a file. Specify
the log file with the [`--log-file`](#log-file) command-line option.

For production systems we recommend using the `CONSOLE` or `FILE` options to ensure all log
information is available in one place.

!!! note

    Use `DEFAULT_BOTH` when using a
    [custom Log4J2 configuration file](../../HowTo/Monitor/Logging.md#advanced-custom-logging). Any
    other option applies the custom logging changes on top of its default settings.

### log-file

=== "Syntax"

    ```bash
    --log-file=<FILENAME>
    ```

=== "Example"

    ```bash
    --log-file=teku_2020-01-01.log
    ```

=== "Environment variable"

    ```bash
    TEKU_LOG_FILE=teku_2020-01-01.log
    ```

=== "Configuration file"

    ```bash
    log-file: "teku_2020-01-01.log"
    ```

Relative or absolute location, and filename of the log file.

The default directory is OS-dependent:

* macOS: `~/Library/teku/logs`
* Unix/Linux: `$XDG_DATA_HOME/teku/logs` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku/logs`
* Windows: `%localappdata%\teku\logs`

The default Docker image location is `/root/.local/share/teku/logs`.

### log-file-name-pattern

=== "Syntax"

    ```bash
    --log-file-name-pattern=<REGEX>
    ```

=== "Example"

    ```bash
    --log-file-name-pattern=tekuL_%d{yyyy-MM-dd}.log
    ```

=== "Environment variable"

    ```bash
    TEKU_LOG_FILE_NAME_PATTERN=tekuL_%d{yyyy-MM-dd}.log
    ```

=== "Configuration file"

    ```bash
    log-file-name-pattern: "tekuL_%d{yyyy-MM-dd}.log"
    ```

Filename pattern to apply when creating log files. The default pattern is `teku_%d{yyyy-MM-dd}.log`

### log-include-events-enabled

=== "Syntax"

    ```bash
    --log-include-events-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --log-include-events-enabled=false
    ```

=== "Environment variable"

    ```bash
    TEKU_LOG_INCLUDE_EVENTS_ENABLED=false
    ```

=== "Configuration file"

    ```bash
    log-include-events-enabled: false
    ```

Specify whether to log frequent update events. For example every slot event with
validators and attestations. The default is `true`.

### log-include-validator-duties-enabled

=== "Syntax"

    ```bash
    --log-include-validator-duties-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --log-include-validator-duties-enabled=false
    ```

=== "Environment variable"

    ```bash
    TEKU_LOG_INCLUDE_VALIDATOR_DUTIES_ENABLED=false
    ```

=== "Configuration file"

    ```bash
    log-include-validator-duties-enabled: false
    ```

Specify whether to log details of validator event duties. The default is `true`.

!!! note
    Logs could become noisy when running many validators.

### metrics-enabled

=== "Syntax"

    ```bash
    --metrics-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --metrics-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    metrics-enabled: true
    ```

Set to `true` to enable the metrics exporter.
The default is `false`.

### metrics-host-allowlist

=== "Syntax"

    ```bash
    --metrics-host-allowlist=<hostname>[,<hostname>...]... or "*"
    ```

=== "Example"

    ```bash
    --metrics-host-allowlist=medomain.com,meotherdomain.com
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_HOST_ALLOWLIST=medomain.com,meotherdomain.com
    ```

=== "Configuration file"

    ```bash
    metrics-host-allowlist: ["medomain.com", "meotherdomain.com"]
    ```

A comma-separated list of hostnames to allow access to the [Teku metrics]. By
default, Teku accepts access from `localhost` and `127.0.0.1`.

!!! tip

    To allow all hostnames, use `"*"`. We don't recommend allowing all hostnames for production
    environments.

### metrics-categories

=== "Syntax"

    ```bash
    --metrics-categories=<CATEGORY>[,<CATEGORY>...]...
    ```

=== "Example"

    ```bash
    --metrics-categories=BEACON,JVM,PROCESS
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_CATEGORIES=BEACON,JVM,PROCESS
    ```

=== "Configuration file"

    ```bash
    metrics-categories: ["BEACON", "JVM", "PROCESS"]
    ```

Categories for which to track metrics. Options are `JVM`, `PROCESS`, `BEACON`, `DISCOVERY`, `EVENTBUS`, `EXECUTOR`, `LIBP2P`, `NETWORK`, `STORAGE`, `STORAGE_HOT_DB`, `STORAGE_FINALIZED_DB`,
`REMOTE_VALIDATOR`, `VALIDATOR`, `VALIDATOR_PERFORMANCE`. All categories are enabled by default.

### metrics-interface

=== "Syntax"

    ```bash
    --metrics-interface=<HOST>
    ```

=== "Example"

    ```bash
    --metrics-interface=192.168.10.101
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_INTERFACE=192.168.10.101
    ```

=== "Configuration file"

    ```bash
    metrics-interface: "192.168.10.101"
    ```

Host on which Prometheus accesses Teku metrics. The default is `127.0.0.1`.

### metrics-port

=== "Syntax"

    ```bash
    --metrics-port=<PORT>
    ```

=== "Example"

    ```bash
    --metrics-port=6174
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_PORT=6174
    ```

=== "Configuration file"

    ```bash
    metrics-port: 6174
    ```

Specifies the port (TCP) on which [Prometheus](https://prometheus.io/) accesses Teku metrics.
The default is `8008`.

### metrics-publish-endpoint

=== "Syntax"

    ```bash
    --metrics-publish-endpoint=<URL>
    ```

=== "Example"

    ```bash
    --metrics-publish-endpoint=https://beaconcha.in/api/v1/client/metrics?apikey={apikey}
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_PUBLISH_ENDPOINT=https://beaconcha.in/api/v1/client/metrics?apikey={apikey}
    ```

=== "Configuration file"

    ```bash
    metrics-publish-endpoint: "https://beaconcha.in/api/v1/client/metrics?apikey={apikey}"
    ```

Endpoint URL of an external service such as [beaconcha.in](https://beaconcha.in/) to which Teku publishes metrics for node monitoring.

### metrics-publish-interval

=== "Syntax"

    ```bash
    --metrics-publish-interval=<INTEGER>
    ```

=== "Example"

    ```bash
    --metrics-publish-interval=60
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_PUBLISH_INTERVAL=60
    ```

=== "Configuration file"

    ```bash
    metrics-publish-interval: "60"
    ```

Interval between metric publications to the external service defined in [metrics-publish-endpoint](#metrics-publish-endpoint), measured in seconds.
The default is `60`.

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

| Network   | Chain           | Type       | Description                                      |
|:----------|:----------------|:-----------|:-------------------------------------------------|
| `mainnet` | Consensus layer | Production | Main network.                                    |
| `minimal` | Consensus layer | Test       | Used for local testing and development networks. |
| `prater`  | Consensus layer | Test       | Multi-client testnet.                            |

Predefined networks can provide defaults such as the initial state of the network,
bootnodes, and the address of the deposit contract.

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

Upper bound on the target number of peers. Teku will refuse new peer requests that would cause the number of peers to exceed this value. The default is `74`.

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
    TEKU_P2P_STATIC-PEERS=/ip4/151.150.191.80/tcp/9000/p2p/16Ui...aXRz,/ip4/151.150.191.80/tcp/9000/p2p/16Ui...q6f1
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

### rest-api-cors-origins

=== "Syntax"

    ```bash
    --rest-api-cors-origins[=<url>[,<url>...]...] or "*"
    ```

=== "Example"

    ```bash
    --rest-api-cors-origins="http://medomain.com","https://meotherdomain.com"
    ```

=== "Environment variable"

    ```bash
    TEKU_REST_API_CORS_ORIGINS="http://medomain.com","https://meotherdomain.com"
    ```

=== "Configuration file"

    ```bash
    rest-api-cors-origins: ["http://medomain.com","https://meotherdomain.com"]
    ```

A list of domain URLs for CORS validation. You must enclose the URLs in double quotes and separate
them with commas.

Listed domains can access the node using HTTP REST API calls. If your client interacts with Teku
using a browser app (such as a block explorer), add the client domain to the list.

The default is "none." If you don't list any domains, browser apps can't interact with your
Teku node.

!!! tip

    For testing and development purposes, use `*` to accept requests from any domain.
    We don’t recommend accepting requests from any domain for production environments.

### rest-api-docs-enabled

=== "Syntax"

    ```bash
    --rest-api-docs-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --rest-api-docs-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_REST_API_DOCS_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    rest-api-docs-enabled: true
    ```

Set to `true` to enable the REST API documentation.
The default is `false`.

The documentation can be accessed at `http://<interface>:<port>/swagger-ui` where:

* `interface` is specified using [`--rest-api-interface`](#rest-api-interface)
* `port` is specified using [`--rest-api-port`](#rest-api-port)

### rest-api-enabled

=== "Syntax"

    ```bash
    --rest-api-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --rest-api-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_REST_API_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    rest-api-enabled: true
    ```

Set to `true` to enable the [REST API service](../Rest_API/Rest.md).
The default is `false`.

If set to `true`, then use [`--rest-api-host-allowlist`](#rest-api-host-allowlist) to limit access
to trusted parties.

### rest-api-host-allowlist

=== "Syntax"

    ```bash
    --rest-api-host-allowlist=<hostname>[,<hostname>...]... or "*"
    ```

=== "Example"

    ```bash
    --rest-api-host-allowlist=medomain.com,meotherdomain.com
    ```

=== "Environment variable"

    ```bash
    TEKU_REST_API_HOST_ALLOWLIST=medomain.com,meotherdomain.com
    ```

=== "Configuration file"

    ```bash
    rest-api-host-allowlist: ["medomain.com", "meotherdomain.com"]
    ```

A comma-separated list of hostnames to allow access to the REST API. By
default, Teku accepts access from `localhost` and `127.0.0.1`.

!!! warning

    Only trusted parties should access the REST API. Do not directly expose these APIs publicly on
    production nodes.

    We don't recommend allowing all hostnames (`"*"`) for production environments.

### rest-api-interface

=== "Syntax"

    ```bash
    --rest-api-interface=<HOST>
    ```

=== "Example"

    ```bash
    # to listen on all interfaces
    --rest-api-interface=0.0.0.0
    ```

=== "Environment variable"

    ```bash
    TEKU_REST_API_INTERFACE=0.0.0.0
    ```

=== "Configuration file"

    ```bash
    rest-api-interface: "0.0.0.0"
    ```

Specifies the interface on which the REST API listens.
The default is `127.0.0.1`.

### rest-api-port

=== "Syntax"

    ```bash
    --rest-api-port=<PORT>
    ```

=== "Example"

    ```bash
    # to listen on port 3435
    --rest-api-port=3435
    ```

=== "Environment variable"

    ```bash
    TEKU_REST_API_PORT=3435
    ```

=== "Configuration file"

    ```bash
    rest-api-port: 3435
    ```

Specifies REST API listening port (HTTP).
The default is 5051.

### version

=== "Syntax"

    ```bash
    -V, --version
    ```

Displays the version and exits.

### validator-api-cors-origins

=== "Syntax"

    ```bash
    --validator-api-cors-origins="<URL>"[,"<URL>",...] or "*"
    ```

=== "Example"

    ```bash
    --validator-api-cors-origins="http://medomain.com","https://meotherdomain.com"
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_CORS_ORIGINS="http://medomain.com","https://meotherdomain.com"
    ```

=== "Configuration file"

    ```bash
    validator-api-cors-origins: ["http://medomain.com","https://meotherdomain.com"]
    ```

A comma-separated list of domain URLs for CORS validation.

Listed domains can access the node using validator API calls. If your client interacts with Teku
using a browser app (such as a block explorer), add the client domain to the list.

The default is "none." If you don't list any domains, browser apps can't interact with your
Teku node.

!!! tip

    For testing and development purposes, use `*` to accept requests from any domain.
    We don’t recommend accepting requests from any domain for production environments.

### validator-api-docs-enabled

=== "Syntax"

    ```bash
    --validator-api-docs-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --validator-api-docs-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_DOCS_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    validator-api-docs-enabled: true
    ```

Set to `true` to enable the [validator REST API documentation](../Rest_API/Rest.md#enable-the-validator-client-api).
The default is `false`.

When enabling the API documentation endpoint, you must also specify:

* `interface` by using [`--validator-api-interface`](#validator-api-interface).
* `port` by using [`--validator-api-port`](#validator-api-port).

### validator-api-enabled

=== "Syntax"

    ```bash
    --validator-api-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --validator-api-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    validator-api-enabled: true
    ```

Set to `true` to enable the [validator client API](../Rest_API/Rest.md#enable-the-validator-client-api).
The default is `false`.

If set to `true`, then use [`--validator-api-host-allowlist`](#validator-api-host-allowlist) to limit access
to trusted parties.

### validator-api-host-allowlist

=== "Syntax"

    ```bash
    --validator-api-host-allowlist=<hostname>[,<hostname>...]... or "*"
    ```

=== "Example"

    ```bash
    --validator-api-host-allowlist=medomain.com,meotherdomain.com
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_HOST_ALLOWLIST=medomain.com,meotherdomain.com
    ```

=== "Configuration file"

    ```bash
    validator-api-host-allowlist: ["medomain.com", "meotherdomain.com"]
    ```

A comma-separated list of hostnames to allow access to the [validator REST API](../Rest_API/Rest.md#enable-the-validator-client-api). By
default, Teku accepts access from `localhost` and `127.0.0.1`.

!!! warning

    Only trusted parties should access the API. Do not directly expose these APIs publicly on
    production nodes.

    We don't recommend allowing all hostnames (`"*"`) for production environments.

### validator-api-interface

=== "Syntax"

    ```bash
    --validator-api-interface=<HOST>
    ```

=== "Example"

    ```bash
    # to listen on all interfaces
    --validator-api-interface=0.0.0.0
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_INTERFACE=0.0.0.0
    ```

=== "Configuration file"

    ```bash
    validator-api-interface: "0.0.0.0"
    ```

The interface on which the [validator REST API](../Rest_API/Rest.md#enable-the-validator-client-api) listens.
The default is `127.0.0.1`.

### validator-api-keystore-file

=== "Syntax"

    ```bash
    --validator-api-keystore-file=<keystoreFile>
    ```

=== "Example"

    ```bash
    --validator-api-keystore-file=validator_keystorstore.p12
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_KEYSTORE_FILE=validator_keystore.p12
    ```

=== "Configuration file"

    ```bash
    validator-api-keystore-file: "validator_keystore.p12"
    ```

Keystore file for the [validator REST API](../Rest_API/Rest.md#enable-the-validator-client-api).
Teku can use PKCS12 or JKS keystore types.

### validator-api-keystore-password-file

=== "Syntax"

    ```bash
    --validator-api-keystore-password-file=<keystorePasswordFile>
    ```

=== "Example"

    ```bash
    --validator-api-keystore-password-file=validator_keystore_pass.txt
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_KEYSTORE_PASSWORD_FILE=validator_keystore_pass.txt
    ```

=== "Configuration file"

    ```bash
    validator-api-keystore-password-file: "validator_keystore_pass.txt"
    ```

Password used to decrypt the keystore for the [validator REST API](../Rest_API/Rest.md#enable-the-validator-client-api).

### validator-api-port

=== "Syntax"

    ```bash
    --validator-api-port=<PORT>
    ```

=== "Example"

    ```bash
    --validator-api-port=5052
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_PORT=5052
    ```

=== "Configuration file"

    ```bash
    validator-api-port: 5052
    ```

The [validator REST API](../Rest_API/Rest.md#enable-the-validator-client-api) listening port (HTTP).
The default is 5052.

### validator-keys

=== "Syntax"

    ```bash
    --validator-keys=<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>[,<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>...]...
    ```

=== "Example for directory"

    ```bash
    --validator-keys=/home/validator/keys:home/validator/passwords
    ```

=== "Example for file"

    ```bash
    --validator-keys=/home/validator/keys/validator_217179e.json:/home/validator/passwords/validator_217179e.txt
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_KEYS=/home/validator/keys:home/validator/passwords
    ```

=== "Configuration file"

    ```bash
    validator-keys: "/home/validator/keys:home/validator/passwords"
    ```

Directory or file to load the encrypted keystore file(s) and associated password file(s) from.
Keystore files must use the `.json` file extension, and password files must use the `.txt` file
extension.

When specifying directories, Teku expects to find identically named
keystore and password files. For example `validator_217179e.json` and `validator_217179e.txt`.

!!! tip

    You can [load new validators without restarting Teku] if you specify a directory from which
    to load the keystore files.

When specifying file names, Teku expects that the files exist.

!!! note

    The path separator is operating system dependent, and should be `;` in Windows rather than `:`.

### validators-early-attestations-enabled

=== "Syntax"

    ```bash
    --validators-early-attestations-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --validators-early-attestations-enabled=false
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EARLY_ATTESTATIONS_ENABLED=false
    ```

=== "Configuration file"

    ```bash
    validators-early-attestations-enabled: false
    ```

Specify whether to use Teku's built-in early attestation production, which creates an
attestation as soon as a block is received. The default is `true`.

Set this option to `false` if running a validator client connected to a load balanced beacon node
(including most hosted beacon nodes such as [Infura]), and validator effectiveness is poor.

!!! note

    Delaying attestation production increases the chances of generating a correct
    attestation when using a load balanced beacon node, but it increases the risk of inclusion delays.

### validators-external-signer-keystore

=== "Syntax"

    ```bash
    --validators-external-signer-keystore=<FILE>
    ```

=== "Example"

    ```bash
    --validators-external-signer-keystore=teku_client_keystore.p12
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_KEYSTORE=teku_client_keystore.p12
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-keystore: "teku_client_keystore.p12"
    ```

The keystore that Teku presents to the external signer for TLS authentication. Teku can use
PKCS12 or JKS keystore types.

Use the PKCS12 keystore type if connecting to Web3Signer.

### validators-external-signer-keystore-password-file

=== "Syntax"

    ```bash
    --validators-external-signer-keystore-password-file=<FILE>
    ```

=== "Example"

    ```bash
    --validators-external-signer-keystore-password-file=keystore_pass.txt
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_KEYSTORE_PASSWORD_FILE=keystore_pass.txt
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-keystore-password-file: "keystore_pass.txt"
    ```

Password file used to decrypt the keystore.

### validators-external-signer-public-keys

=== "Syntax"

    ```bash
    --validators-external-signer-public-keys=<KEY>[,<KEY>...]
    ```

=== "Example"

    ```bash
    --validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_PUBLIC_KEYS=0xa99a...e44c,0xb89b...4a0b
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-public-keys: ["0xa99a...e44c","0xb89b...4a0b"]
    ```

List or URL of validator public keys used by an external signer (for example, Web3Signer).

Use the URL of the external signer's [`/publicKeys` endpoint](https://consensys.github.io/web3signer/web3signer-eth2.html#tag/Public-Key)
to load the public keys of all registered validators. For example:

```bash
--validators-external-signer-public-keys=http://localhost:9000/api/v1/eth2/publicKeys
```

!!! tip

    You can [load new validators without restarting Teku] if you specify a URL from which
    to load the public keys.

Ensure the external signer is running before starting Teku.

### validators-external-signer-slashing-protection-enabled

=== "Syntax"

    ```bash
    --validators-external-signer-slashing-protection-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --validators-external-signer-slashing-protection-enabled=false
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_SLASHING_PROTECTION_ENABLED=false
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-slashing-protection-enabled: false
    ```

Specify whether to use Teku's built-in [slashing protection] when using an external signer such as
[Web3Signer]. The default is `true`.

Set this option to `false` if using the slashing protection implemented by an external signer.

!!! warning

    Ensure the external signer has slashing protection enabled before disabling Teku
    slashing protection, otherwise a validator may get slashed.

Built-in slashing protection can only be disabled for validators using external signers. Validators
using Teku to sign blocks and attestations always uses its built-in slashing protection.

### validators-external-signer-timeout

=== "Syntax"

    ```bash
    --validators-external-signer-timeout=<INTEGER>
    ```

=== "Example"

    ```bash
    --validators-external-signer-timeout=2000
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_TIMEOUT=2000
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-timeout: 2000
    ```

Timeout in milliseconds for requests to the external signer. The default is 5000.

### validators-external-signer-truststore

=== "Syntax"

    ```bash
    --validators-external-signer-truststore=<FILE>
    ```

=== "Example"

    ```bash
    --validators-external-signer-truststore=websigner_truststore.p12
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_TRUSTSTORE=websigner_truststore.p12
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-truststore: "websigner_truststore.p12"
    ```

PKCS12 or JKS keystore used to trust external signer's self-signed certificate or CA certificate
which signs the external signer's certificate.

### validators-external-signer-truststore-password-file

=== "Syntax"

    ```bash
    --validators-external-signer-truststore-password-file=<FILE>
    ```

=== "Example"

    ```bash
    --validators-external-signer-truststore-password-file=truststore_pass.txt
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_TRUSTSTORE_PASSWORD_FILE=truststore_pass.txt
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-truststore-password-file: "truststore_pass.txt"
    ```

Password file used to decrypt the keystore.

### validators-external-signer-url

=== "Syntax"

    ```bash
    --validators-external-signer-url=<URL>
    ```

=== "Example"

    ```bash
    --validators-external-signer-url=http://localhost:9000
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_URL=http://localhost:9000
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-url: "http://localhost:9000"
    ```

URL on which the external signer (for example, Web3Signer) is running.

### validators-graffiti

=== "Syntax"

    ```bash
    --validators-graffiti=<STRING>
    ```

=== "Example"

    ```bash
    --validators-graffiti="Teku validator"
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_GRAFFITI="Teku validator"
    ```

=== "Configuration file"

    ```bash
    validators-graffiti: "Teku validator"
    ```

Graffiti to add when creating a block. Gets converted to bytes and padded to Bytes32.

The same graffiti is used for all validators started with this beacon node.

[`--validators-graffiti-file`](#validators-graffiti-file) takes precedence if both options are set.

### validators-graffiti-file

=== "Syntax"

    ```bash
    --validators-graffiti-file=<FILE>
    ```

=== "Example"

    ```bash
    --validators-graffiti-file=/Users/me/mynode/graffiti.txt
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_GRAFFITI_FILE=/Users/me/mynode/graffiti.txt
    ```

=== "Configuration file"

    ```bash
    validators-graffiti-file: "/Users/me/mynode/graffiti.txt"
    ```

File containing the validator graffiti to add when creating a block. The file contents is
converted to `bytes` and padded to `Bytes32`. The same graffiti is used for all validators started
with this beacon node.

You can overwrite the file while Teku is running to update the graffiti.

This option takes precedence over [`--validators-graffiti`](#validators-graffiti).

### validators-keystore-locking-enabled

=== "Syntax"

    ```bash
    --validators-keystore-locking-enabled=<BOOLEAN>
    ```

=== "Example"

    ```bash
    --validators-keystore-locking-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_KEYSTORE_LOCKING_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    validators-keystore-locking-enabled: true
    ```

Locks the keystore files listed in [`--validator-keys`](#validator-keys). The default is `true`.

Attempts to lock all keystores in a directory if a directory is specified in
[`--validator-keys`](#validator-keys).

### validators-performance-tracking-mode

=== "Syntax"

    ```bash
    --validators-performance-tracking-mode=<STRING>
    ```

=== "Example"

    ```bash
    --validators-performance-tracking-mode=LOGGING
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_PERFORMANCE_TRACKING_MODE=LOGGING
    ```

=== "Configuration file"

    ```bash
    validators-performance-tracking-mode: LOGGING
    ```

Set the validator performance tracking strategy. Valid options are `LOGGING`, `METRICS`, `ALL`, and
`NONE`. The default is `ALL`.

When `LOGGING` is enabled, attestation and block performance is reported as log messages. When
`METRICS` is enabled, attestation and block performance is reported using [metrics] in the
[`VALIDATOR_PERFORMANCE`](#metrics-categories) metrics category.

### validators-proposer-config

=== "Syntax"

    ```bash
    --validators-proposer-config=<STRING>
    ```

=== "Example"

    ```bash
    --validators-proposer-config=/home/me/node/proposerConfig.json
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_PROPOSER_CONFIG=/home/me/node/proposerConfig.json
    ```

=== "Configuration file"

    ```bash
    validators-proposer-config: "/home/me/node/proposerConfig.json"
    ```

Remote URL or local file path to the [proposer configuration file](../../HowTo/Prepare-for-The-Merge.md), which is a
JSON file that specifies:

* `proposer_config` - (optional) A proposer configuration for multiple validator public keys.
* `default_config` - (required) A default proposer configuration for validator public keys not included in
  `proposer_config`.
  
Each proposer configuration must specify a `fee_recipient`.

!!! example "`proposerConfig.json`"

    ```json
    {
      "proposer_config": {
        "0xa057816155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a": {
          "fee_recipient": "0x50155530FCE8a85ec7055A5F8b2bE214B3DaeFd3",
        }
      },
      "default_config": {
        "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A"
      }
    }
    ```

### validators-proposer-config-refresh-enabled

=== "Syntax"

    ```bash
    --validators-proposer-config-refresh-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --validators-proposer-config-refresh-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_PROPOSER_CONFIG_REFRESH_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    validators-proposer-config-refresh-enabled: true
    ```

Set to `true` to enable reloading the [proposer configuration](#validators-proposer-config) on every proposer
preparation (once per epoch).
The default is `false`.

### validators-proposer-default-fee-recipient

=== "Syntax"

    ```bash
    --validators-proposer-default-fee-recipient=<ADDRESS>
    ```

=== "Example"

    ```bash
    --validators-proposer-default-fee-recipient=0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_PROPOSER_DEFAULT_FEE_RECIPIENT=0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73
    ```

=== "Configuration file"

    ```bash
    validators-proposer-default-fee-recipient: "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73"
    ```

Default [fee recipient](../../HowTo/Prepare-for-The-Merge.md#configure-the-fee-recipient) for all validator keys.
When running a validator, this is an alternative to the `fee_recipient` in the
[default proposer configuration](#validators-proposer-config).

!!! important

    We recommend using this option when running a beacon node serving APIs to other validator clients.
    The specified fee recipient is used in rare cases when a validator requests a block production but its fee recipient
    is still unknown for the beacon node.

### ws-checkpoint

=== "Syntax"

    ```bash
    --ws-checkpoint=<BLOCK_ROOT>:<EPOCH_NUMBER>
    ```

=== "Example"

    ```bash
    --ws-checkpoint=0x5a642bb8f367e98c0d11426d98d28c465f8988fc960500886cb49faf0372883a:3600
    ```

=== "Environment variable"

    ```bash
    TEKU_WS_CHECKPOINT=0x5a642bb8f367e98c0d11426d98d28c465f8988fc960500886cb49faf0372883a:3600
    ```

=== "Configuration file"

    ```bash
    ws-checkpoint: "0x5a642bb8f367e98c0d11426d98d28c465f8988fc960500886cb49faf0372883a:3600"
    ```

A recent checkpoint within the [weak subjectivity period]. Accepts the checkpoint using
`<blockRoot>:<epochNumber>`, where `<blockRoot>` must start with `0x`.

The weak subjectivity checkpoint is a recent, finalized checkpoint on the correct chain. By
supplying a weak subjectivity checkpoint, you ensure that nodes that have been offline for a long
period follow the correct chain. It protects the node from long-range attacks by malicious actors.

Use the [`admin weak-subjectivity`](Subcommands/Admin.md#weak-subjectivity) subcommand to display
or clear your weak subjectivity settings.

<!-- links -->
[Infura]: https://infura.io/
[Teku metrics]: ../../HowTo/Monitor/Metrics.md
[Web3Signer]: https://docs.web3signer.consensys.net/en/latest/
[slashing protection]: ../../Concepts/Slashing-Protection.md
[weak subjectivity period]: ../../Concepts/Weak-Subjectivity.md
[load new validators without restarting Teku]: ../../HowTo/Load-Validators-No-Restart.md
[recent finalized checkpoint state from which to sync]: ../../HowTo/Get-Started/Checkpoint-Start.md
[consensus specification]: https://github.com/ethereum/consensus-specs/tree/master/configs
[metrics]: ../../HowTo/Monitor/Metrics.md
