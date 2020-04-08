description: Teku command line interface reference
<!--- END of page meta data -->

# Teku Command Line

This reference describes the syntax of the Teku Command Line Interface (CLI) options and subcommands.

!!! important
    The command line interface options are currently under development and may change.

## Specifying Options

Teku options can be specified: 

* On the command line 
* As an [environment variable](#teku-environment-variables) 
* In a configuration file.

If an option is specified in multiple places, the order of priority is command line, environment variable, 
configuration file. 

### Teku Environment Variables

For each command line option, the equivalent environment variable is: 

* Upper-case
* `-` is replaced by `_` 
* Has a `TEKU_` prefix

For example, set `--p2p-port` using the `TEKU_P2P_PORT` environment variable.

## Options

To start a Teku node run:

```bash
Teku [OPTIONS] [COMMAND]
```

### config-file

```bash tab="Syntax"
--config-file=<FILE>
```

```bash tab="Command Line"
--config-file=/home/me/me_node/config.yaml
```

```bash tab="Environment Variable"
TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
```

The path to the YAML configuration file.
The default is `none`.
        
### data-path

```bash tab="Syntax"
--data-path=<PATH>
```

```bash tab="Command Line"
--data-path=/home/me/me_node
```

```bash tab="Environment Variable"
TEKU_DATA_PATH=/home/me/me_node
```

```bash tab="Configuration File"
data-path="/home/me/me_node"
```

The path to the Teku data directory. The default is the directory in which Teku is installed
or `/opt/teku/database` if using the Teku Docker image.

### data-storage-mode

```bash tab="Syntax"
--data-storage-mode=<STORAGE_MODE>
```

```bash tab="Command Line"
--data-storage-mode=archive
```

```bash tab="Environment Variable"
TEKU_DATA_STORAGE_MODE=archive
```

```bash tab="Configuration File"
data-storage-mode="archive"
```

Set the strategy for handling historical chain data. Valid options are `prune` and `archive`.
Defaults to `prune`.

### eth1-deposit-contract-address

```bash tab="Syntax"
--eth1-deposit-contract-address=<ADDRESS>
```

```bash tab="Command Line"
--eth1-deposit-contract-address=0x77f7bED277449F51505a4C54550B074030d989bC
```

```bash tab="Environment Variable"
TEKU_ETH1_DEPOSIT_CONTRACT_ADDRESS=0x77f7bED277449F51505a4C54550B074030d989bC
```

```bash tab="Configuration File"
eth1-deposit-contract-address="0x77f7bED277449F51505a4C54550B074030d989bC"
```

Eth1 address of deposit contract.

### eth1-endpoint

```bash tab="Syntax"
--eth1-endpoint=<URL>
```

```bash tab="Command Line"
--eth1-endpoint=http://localhost:8545
```

```bash tab="Environment Variable"
TEKU_ETH1_ENDPOINT=http://localhost:8545
```

```bash tab="Configuration File"
eth1-endpoint="http://localhost:8545"
```

JSON-RPC URL of Eth1 node.

### help

```bash tab="Syntax"
-h, --help
```

Show the help message and exit.

### logging

```bash tab="Syntax"
-l, --logging=<LEVEL>
```

```bash tab="Example"
--logging=DEBUG
```

Sets the logging verbosity.
Log levels are `OFF`, `FATAL`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`, `ALL`.
Default is `INFO`.

### log-colour-enabled

```bash tab="Syntax"
--log-colour-enabled=<BOOLEAN>
```

```bash tab="Command Line"
--log-colour-enabled=false
```

```bash tab="Environment Variable"
TEKU_LOG_COLOUR_ENABLED=false
```

```bash tab="Configuration File"
log-colour-enabled=false
```

Specify whether status and event log messages include a console color display code.
Defaults to `true`.

### log-destination

```bash tab="Syntax"
--log-destination=<LOG_DESTINATION>
```

```bash tab="Command Line"
--log-destination=console
```

```bash tab="Environment Variable"
TEKU_LOG_DESTINATION=console
```

```bash tab="Configuration File"
log-destination="console"
```

Specify where to output log information. Valid options are:

* `console`
* `file`
* `both`

Defaults to `both`.

### log-file

```bash tab="Syntax"
--log-file=<FILENAME>
```

```bash tab="Command Line"
--log-file=teku_2020-01-01.log
```

```bash tab="Environment Variable"
TEKU_LOG_FILE=teku_2020-01-01.log
```

```bash tab="Configuration File"
log-file="teku_2020-01-01.log"
```

Relative or absolute location, and filename of the log file.

### log-file-name-pattern

```bash tab="Syntax"
--log-file-name-pattern=<REGEX>
```

```bash tab="Command Line"
--log-file-name-pattern=tekuL_%d{yyyy-MM-dd}.log
```

```bash tab="Environment Variable"
TEKU_LOG_FILE_NAME_PATTERN=tekuL_%d{yyyy-MM-dd}.log
```

```bash tab="Configuration File"
log-file-name-pattern="tekuL_%d{yyyy-MM-dd}.log"
```

Filename pattern to apply when creating log files.

### log-include-events-enabled

```bash tab="Syntax"
--log-include-events-enabled=<BOOLEAN>
```

```bash tab="Command Line"
--log-include-events-enabled=false
```

```bash tab="Environment Variable"
TEKU_LOG_INCLUDE_EVENTS_ENABLED=false
```

```bash tab="Configuration File"
log-include-events-enabled=false
```

Specify whether to log frequent update events. For example every slot event with
validators and attestations. Defaults to `true`.

### metrics-enabled

```bash tab="Syntax"
--metrics-enabled
```

```bash tab="Environment Variable"
TEKU_METRICS_ENABLED=true
```

```bash tab="Configuration File"
metrics-enabled=true
```

Set to `true` to enable the metrics exporter.
The default is `false`.

### metrics-categories

```bash tab="Syntax"
--metrics-categories=<CATEGORIES>
```

```bash tab="Command Line"
--metrics-categories=BEACONCHAIN,JVM,PROCESS
```

```bash tab="Environment Variable"
TEKU_METRICS_CATEGORIES=BEACONCHAIN,JVM,PROCESS
```

```bash tab="Configuration File"
metrics-categories=["BEACONCHAIN", "JVM", "PROCESS"]
```

Categories for which to track metrics. Options are `BEACONCHAIN`, `JVM`, `PROCESS`, `NETWORK`.
All categories are enabled by default.

### metrics-interface

```bash tab="Syntax"
--metrics-interface=<HOST>
```

```bash tab="Command Line"
--metrics-interface=192.168.10.101
```

```bash tab="Environment Variable"
TEKU_METRICS_INTERFACE=192.168.10.101
```

```bash tab="Configuration File"
metrics-interface="192.168.10.101"
```

Host on which Prometheus accesses Teku metrics. The default is `127.0.0.1`.

### metrics-port

```bash tab="Syntax"
--metrics-port=<PORT>
```

```bash tab="Command Line"
--metrics-port=6174
```

```bash tab="Environment Variable"
TEKU_METRICS_PORT=6174
```

```bash tab="Configuration File"
metrics-port="6174"
```

Specifies the port (TCP) on which [Prometheus](https://prometheus.io/) accesses Teku metrics.
The default is `8008`.

### network

```bash tab="Syntax"
--network=<NETWORK>
```

```bash tab="Command Line"
--network=mainnet
```

```bash tab="Environment Variable"
BESU_NETWORK=mainnet
```

```bash tab="Configuration File"
network="mainnet"
```

Predefined network configuration.
The default is `minimal`.

### p2p-advertised-ip

```bash tab="Syntax"
--p2p-advertised-ip=<IP_ADDRESS>
```

```bash tab="Command Line"
--p2p-advertised-ip=192.168.1.132
```

```bash tab="Environment Variable"
TEKU_P2P_ADVERTISED_IP=192.168.1.132
```

```bash tab="Configuration File"
p2p-advertised-ip="192.168.1.132"
```

Advertised peer-to-peer IP address. Default is 127.0.0.1.

### p2p-enabled

```bash tab="Syntax"
--p2p-enabled=<true|false>
```

```bash tab="Command line"
--p2p-enabled=false
```

```bash tab="Environment Variable"
TEKU_P2P_ENABLED=false
```

```bash tab="Configuration File"
p2p-enabled=false
```

Enables or disables all p2p communication.
The default is true.

### p2p-interface

```bash tab="Syntax"
--p2p-interface=<HOST>
```

```bash tab="Command Line"
--p2p-interface=192.168.1.132
```

```bash tab="Environment Variable"
TEKU_P2P_INTERFACE=192.168.1.132
```

```bash tab="Configuration File"
p2p-interface="192.168.1.132"
```

Specifies the network interface on which the node listens for P2P communication.
The default is 0.0.0.0 (all interfaces).

### p2p-peer-lower-bound

```bash tab="Syntax"
--p2p-peer-lower-bound=<INTEGER>
```

```bash tab="Command Line"
--p2p-peer-lower-bound=25
```

```bash tab="Environment Variable"
TEKU_P2P_PEER_LOWER_BOUND=25
```

```bash tab="Configuration File"
p2p-peer-lower-bound=25
```

Lower bound on the target number of peers. Defaults to 20.

### p2p-peer-upper-bound

```bash tab="Syntax"
--p2p-peer-upper-bound=<INTEGER>
```

```bash tab="Command Line"
--p2p-peer-upper-bound=40
```

```bash tab="Environment Variable"
TEKU_P2P_PEER_UPPER_BOUND=40
```

```bash tab="Configuration File"
p2p-peer-upper-bound=40
```

Upper bound on the target number of peers. Defaults to 30.

### p2p-port

```bash tab="Syntax"
--p2p-port=<PORT>
```

```bash tab="Command Line"
# to listen on port 1789
--p2p-port=1789
```

```bash tab="Environment Variable"
# to listen on port 1789
TEKU_P2P_PORT=1789
```

```bash tab="Configuration File"
p2p-port="1789"
```

Specifies the P2P listening ports (UDP and TCP).
The default is 30303.

### p2p-discovery-enabled

```bash tab="Syntax"
--p2p-discovery-enabled=<true|false>
```

```bash tab="Command line"
--p2p-discovery-enabled=false
```

```bash tab="Environment Variable"
TEKU_P2P_DISCOVERY_ENABLED=false
```

```bash tab="Configuration File"
p2p-discovery-enabled=false
```

Enables or disables P2P peer discovery.
The default is true.
<!--- Confirm difference between this CLI option and p2p-enabled -->

### p2p-discovery-bootnodes

```bash tab="Syntax"
--p2p-discovery-bootnodes=<ENR_ADDRESSES>
```

```bash tab="Command line"
--p2p-discovery-bootnodes=enr:-Iu4QGuiaVXBEoi4kcLbsoPYX7GTK9ExOODTuqYBp9CyHN_PSDtnLMCIL91ydxUDRPZ-jem-o0WotK6JoZjPQWhTfEsTgmlkgnY0gmlwhDbOLfeJc2VjcDI1NmsxoQLVqNEoCVTC74VmUx25USyFe7lL0TgpXHaCX9CDy9H6boN0Y3CCIyiDdWRwgiMo,enr:-Iu4QLNTiVhgyDyvCBnewNcn9Wb7fjPoKYD2NPe-jDZ3_TqaGFK8CcWr7ai7w9X8Im_ZjQYyeoBP_luLLBB4wy39gQ4JgmlkgnY0gmlwhCOhiGqJc2VjcDI1NmsxoQMrmBYg_yR_ZKZKoLiChvlpNqdwXwodXmgw_TRow7RVwYN0Y3CCIyiDdWRwgiMo
```

```bash tab="Environment Variable"
TEKU_P2P_DISCOVERY_BOOTNODES=enr:-Iu4QGuiaVXBEoi4kcLbsoPYX7GTK9ExOODTuqYBp9CyHN_PSDtnLMCIL91ydxUDRPZ-jem-o0WotK6JoZjPQWhTfEsTgmlkgnY0gmlwhDbOLfeJc2VjcDI1NmsxoQLVqNEoCVTC74VmUx25USyFe7lL0TgpXHaCX9CDy9H6boN0Y3CCIyiDdWRwgiMo,enr:-Iu4QLNTiVhgyDyvCBnewNcn9Wb7fjPoKYD2NPe-jDZ3_TqaGFK8CcWr7ai7w9X8Im_ZjQYyeoBP_luLLBB4wy39gQ4JgmlkgnY0gmlwhCOhiGqJc2VjcDI1NmsxoQMrmBYg_yR_ZKZKoLiChvlpNqdwXwodXmgw_TRow7RVwYN0Y3CCIyiDdWRwgiMo
```

```bash tab="Configuration File"
p2p-discovery-bootnodes=["enr:-Iu4QGuiaVXBEoi4kcLbsoPYX7GTK9ExOODTuqYBp9CyHN_PSDtnLMCIL91ydxUDRPZ-jem-o0WotK6JoZjPQWhTfEsTgmlkgnY0gmlwhDbOLfeJc2VjcDI1NmsxoQLVqNEoCVTC74VmUx25USyFe7lL0TgpXHaCX9CDy9H6boN0Y3CCIyiDdWRwgiMo",
                         "enr:-Iu4QLNTiVhgyDyvCBnewNcn9Wb7fjPoKYD2NPe-jDZ3_TqaGFK8CcWr7ai7w9X8Im_ZjQYyeoBP_luLLBB4wy39gQ4JgmlkgnY0gmlwhCOhiGqJc2VjcDI1NmsxoQMrmBYg_yR_ZKZKoLiChvlpNqdwXwodXmgw_TRow7RVwYN0Y3CCIyiDdWRwgiMo"]
```

List of comma-separated Ethereum Node Records (ENRs) for P2P discovery bootstrap.

### p2p-advertised-port

```bash tab="Syntax"
--p2p-advertised-port=<PORT>
```

```bash tab="Command Line"
--p2p-advertised-port=1789
```

```bash tab="Environment Variable"
TEKU_P2P_ADVERTISED_PORT=1789
```

```bash tab="Configuration File"
p2p-port="1789"
```

The advertised P2P port. The default is the port specified in [`--p2p-port`](#p2p-port)

### p2p-private-key-file

```bash tab="Syntax"
--p2p-private-key-file=<PATH_TO_FILE>
```

```bash tab="Command Line"
--p2p-private-key-file=/home/me/me_node/key
```

```bash tab="Environment Variable"
TEKU_P2P_PRIVATE_KEY_FILE=/home/me/me_node/key
```

```bash tab="Configuration File"
p2p-private-key-file="/home/me/me_node/key"
```

File containing the node's private key.

### p2p-static-peers

```bash tab="Syntax"
--p2p-static-peers=<ADDRESSES>
```

```bash tab="Command line"
--p2p-static-peers=/ip4/151.150.191.80/tcp/9000/p2p/16Uiu2HAm7qrY2oodyds7msWm33pHAi1W4Co53ZJmZsjp3pqEaXRz,/ip4/151.150.191.80/tcp/9000/p2p/16Uiu2HAmVjXWDfhXaapVpop72r58ctKSDyT7k3Wy2AciwCbxq6f1
```

```bash tab="Environment Variable"
TEKU_P2P_STATIC-PEERS=/ip4/151.150.191.80/tcp/9000/p2p/16Uiu2HAm7qrY2oodyds7msWm33pHAi1W4Co53ZJmZsjp3pqEaXRz,/ip4/151.150.191.80/tcp/9000/p2p/16Uiu2HAmVjXWDfhXaapVpop72r58ctKSDyT7k3Wy2AciwCbxq6f1
```

```bash tab="Configuration File"
p2p-static-peers=["/ip4/151.150.191.80/tcp/9000/p2p/16Uiu2HAm7qrY2oodyds7msWm33pHAi1W4Co53ZJmZsjp3pqEaXRz",
                  "/ip4/151.150.191.80/tcp/9000/p2p/16Uiu2HAmVjXWDfhXaapVpop72r58ctKSDyT7k3Wy2AciwCbxq6f1"]
```

List of comma-separated [multiaddresses](https://docs.libp2p.io/reference/glossary/#multiaddr) of static peers. 

### rest-api-enabled

```bash tab="Syntax"
--rest-api-enabled
```

```bash tab="Environement Variable"
TEKU_REST_API_ENABLED=true
```

```bash tab="Configuration File"
--rest-api-enabled=true
```

Set to `true` to enable the [REST API service](../Rest_API/Rest.md).
The default is `false`.

### rest-api-docs-enabled

```bash tab="Syntax"
--rest-api-docs-enabled
```

```bash tab="Environement Variable"
TEKU_REST_API_DOCS_ENABLED=true
```

```bash tab="Configuration File"
--rest-api-docs-enabled=true
```

Set to `true` to enable the REST API documentation.
The default is `false`.

The documentation can be accessed at `http:<interface>:<port>/swagger-ui` where:

* `interface` is specified using [`--rest-api-interface`](#rest-api-interface)
* `port` is specified using [`--rest-api-port`](#rest-api-port)

### rest-api-interface

```bash tab="Syntax"
--rest-api-interface=<HOST>
```

```bash tab="Command Line"
# to listen on all interfaces
--rest-api-interface=0.0.0.0
```

```bash tab="Environment Variable"
TEKU_REST_API_INTERFACE=0.0.0.0
```

```bash tab="Configuration File"
rest-api-interface="0.0.0.0"
```

Specifies the interface on which the REST API listens.
The default is 127.0.0.1.

### rest-api-port

```bash tab="Syntax"
--rest-api-port=<PORT>
```

```bash tab="Command Line"
# to listen on port 3435
--rest-api-port=3435
```

```bash tab="Environment Variable"
TEKU_REST_API_PORT=3435
```

```bash tab="Configuration File"
rest-api-port="3435"
```

Specifies REST API listening port (TCP).
The default is 5051.

### version

```bash tab="Syntax"
  -V, --version
``` 

Displays the version and exits. 
