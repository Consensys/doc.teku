---
description: Teku command line interface reference
---

# Teku Command Line

This reference describes the syntax of the Teku Command Line Interface (CLI) options and subcommands.

!!! important
    The command line interface options are currently under development and may change.

## Specifying Options

Teku options can be specified:

* On the command line
* As an [environment variable](#teku-environment-variables)
* In a YAML configuration file.

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
teku [OPTIONS] [COMMAND]
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
data-path: "/home/me/me_node"
```

The path to the Teku data directory. The default directory is OS dependent:

* macOS: `~/Library/teku`
* Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`
* Windows: `%localappdata%\teku`.

The default Docker image location is `/root/.local/share/teku`.

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
data-storage-mode: "archive"
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
eth1-deposit-contract-address: "0x77f7bED277449F51505a4C54550B074030d989bC"
```

Ethereum 1.0 address of the deposit contract. A deposit contract address must be defined
if [`--eth1-endpoint`](#eth1-endpoint) is specified.

The deposit contract address can also be defined in:

* The genesis file specified using [`--initial-state`](#initial state)
* The predefined network supplied using [`--network`](#network).

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
eth1-endpoint: "http://localhost:8545"
```

The JSON-RPC URL of Ethereum 1.0 node.

If not specified, then provide an initial state using the [`--initial-state`](#initial-state) option, or
start Teku from an existing database using [`--data-path`](#data-path), which provides the initial
state to work from.

If using a cloud-based service such as [Infura], then set the endpoint to the supplied URL. For
example, `https://goerli.infura.io/v3/<Project_ID>`

### help

```bash tab="Syntax"
-h, --help
```

Show the help message and exit.

### initial-state

```bash tab="Syntax"
--initial-state=<FILE>
```

```bash tab="Command Line"
--initial-state=/home/me/genesis.ssz
```

```bash tab="Environment Variable"
TEKU_INITIAL_STATE=/home/me/genesis.ssz
```

```bash tab="Configuration File"
initial-state: "/home/me/genesis.ssz"
```

Path or URL to the network genesis file.

This option does not need to be specified if the initial state is provided by the network specified
using the [`--network`](#network) option.

### logging

```bash tab="Syntax"
-l, --logging=<LEVEL>
```

```bash tab="Command Line"
--logging=DEBUG
```

```bash tab="Environment Variable"
TEKU_LOGGING=DEBUG
```

```bash tab="Configuration File"
logging: "DEBUG"
```

Sets the logging verbosity.
Log levels are `OFF`, `FATAL`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`, `ALL`.
Default is `INFO`.

### log-color-enabled

```bash tab="Syntax"
--log-color-enabled[=<BOOLEAN>]
```

```bash tab="Command Line"
--log-color-enabled=false
```

```bash tab="Environment Variable"
TEKU_LOG_COLOR_ENABLED=false
```

```bash tab="Configuration File"
log-color-enabled: false
```

Specify whether status and event log messages include a console color display code.
Defaults to `true`.

### log-destination

```bash tab="Syntax"
--log-destination=<LOG_DESTINATION>
```

```bash tab="Command Line"
--log-destination=CONSOLE
```

```bash tab="Environment Variable"
TEKU_LOG_DESTINATION=CONSOLE
```

```bash tab="Configuration File"
log-destination: "CONSOLE"
```

Specify where to output log information. Valid options are:

* `BOTH`
* `CONSOLE`
* `DEFAULT_BOTH`
* `FILE`

Defaults to `DEFAULT_BOTH`. When using `BOTH` or `DEFAULT_BOTH`, system updates such as blockchain events 
are displayed on the console, and errors and other information are logged to a file. The log file
location can be specified with the [`--log-file`](#log-file) command-line option.

For production systems we recommend using the `CONSOLE` or `FILE` options. When using `CONSOLE` you can
configure `systemd` to handle the output.

!!! note
    `DEFAULT_BOTH` and `BOTH` have the same behavior, except when using a custom Log4J2 configuration
    file. When using a custom file, `DEFAULT_BOTH` will not apply logging changes, whereas `BOTH` will
    apply logging changes.

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
log-file: "teku_2020-01-01.log"
```

Relative or absolute location, and filename of the log file.

The default directory is OS dependent:

* macOS: `~/Library/teku/logs`
* Unix/Linux: `$XDG_DATA_HOME/teku/logs` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku/logs`
* Windows: `%localappdata%\teku\logs`

The default Docker image location is `/root/.local/share/teku/logs`.

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
log-file-name-pattern: "tekuL_%d{yyyy-MM-dd}.log"
```

Filename pattern to apply when creating log files.

### log-include-events-enabled

```bash tab="Syntax"
--log-include-events-enabled[=<BOOLEAN>]
```

```bash tab="Command Line"
--log-include-events-enabled=false
```

```bash tab="Environment Variable"
TEKU_LOG_INCLUDE_EVENTS_ENABLED=false
```

```bash tab="Configuration File"
log-include-events-enabled: false
```

Specify whether to log frequent update events. For example every slot event with
validators and attestations. Defaults to `true`.

### metrics-enabled

```bash tab="Syntax"
--metrics-enabled[=<BOOLEAN>]
```

```bash tab="Command Line"
--metrics-enabled=true
```

```bash tab="Environment Variable"
TEKU_METRICS_ENABLED=true
```

```bash tab="Configuration File"
metrics-enabled: true
```

Set to `true` to enable the metrics exporter.
The default is `false`.

### metrics-categories

```bash tab="Syntax"
--metrics-categories=<CATEGORY>[,<CATEGORY>...]...
```

```bash tab="Command Line"
--metrics-categories=BEACON,JVM,PROCESS
```

```bash tab="Environment Variable"
TEKU_METRICS_CATEGORIES=BEACON,JVM,PROCESS
```

```bash tab="Configuration File"
metrics-categories: ["BEACON", "JVM", "PROCESS"]
```

Categories for which to track metrics. Options are `JVM`, `PROCESS`, `BEACON`, `EVENTBUS`,
`LIBP2P`, `NETWORK`. All categories are enabled by default.

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
metrics-interface: "192.168.10.101"
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
metrics-port: 6174
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
network: "mainnet"
```

Predefined network configuration. Accepts a predefined network name, or file path or URL
to a YAML configuration file. The default is `minimal`.

Possible values are:

| Network   | Chain   | Type        | Description                                                         |
|-----------|---------|-------------|---------------------------------------------------------------------|
| `mainnet` | Eth 2.0 | Production  | Intended main network that targets future mainnet configuration.    |
| `minimal` | Eth 2.0 | Test        | Used for local testing and development networks.                    |
| `topaz`   | Eth 2.0 | Test        | Single-client testnet maintained by the Prysmatic Labs.             |
| `witti`   | Eth 2.0 | Test        | Multi-client testnet maintained by the Goerli testnet initiative.   |

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
p2p-advertised-ip: "192.168.1.132"
```

Advertised peer-to-peer IP address. Default is `127.0.0.1`.

### p2p-enabled

```bash tab="Syntax"
--p2p-enabled[=<BOOLEAN>]
```

```bash tab="Command line"
--p2p-enabled=false
```

```bash tab="Environment Variable"
TEKU_P2P_ENABLED=false
```

```bash tab="Configuration File"
p2p-enabled: false
```

Enables or disables all P2P communication.
The default is `true`.

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
p2p-interface: "192.168.1.132"
```

Specifies the network interface on which the node listens for P2P communication.
The default is `0.0.0.0` (all interfaces).

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
p2p-peer-lower-bound: 25
```

Lower bound on the target number of peers. The default is `20`.

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
p2p-peer-upper-bound: 40
```

Upper bound on the target number of peers. The default is `30`.

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
p2p-port: 1789
```

Specifies the P2P listening ports (UDP and TCP).
The default is `30303`.

### p2p-discovery-enabled

```bash tab="Syntax"
--p2p-discovery-enabled[=<BOOLEAN>]
```

```bash tab="Command line"
--p2p-discovery-enabled=false
```

```bash tab="Environment Variable"
TEKU_P2P_DISCOVERY_ENABLED=false
```

```bash tab="Configuration File"
p2p-discovery-enabled: false
```

Enables or disables P2P peer discovery. If disabled, [`p2p-static-peers`](#p2p-static-peers) defines
the peer connections. The default is `true`.

### p2p-discovery-bootnodes

```bash tab="Syntax"
--p2p-discovery-bootnodes=<ENR_ADDRESS>[,<ENR_ADDRESS>...]...
```

```bash tab="Command line"
--p2p-discovery-bootnodes=enr:-Iu4QG...wgiMo,enr:-Iu4QL...wgiMo
```

```bash tab="Environment Variable"
TEKU_P2P_DISCOVERY_BOOTNODES=enr:-Iu4QG...wgiMo,enr:-Iu4QL...wgiMo
```

```bash tab="Configuration File"
p2p-discovery-bootnodes: ["enr:-Iu4QG...wgiMo",
                          "enr:-Iu4QL...wgiMo"]
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
p2p-advertised-port: 1789
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
p2p-private-key-file: "/home/me/me_node/key"
```

File containing the node's private key.

### p2p-static-peers

```bash tab="Syntax"
--p2p-static-peers=<ADDRESS>[,<ADDRESS>...]...
```

```bash tab="Command line"
--p2p-static-peers=/ip4/151.150.191.80/tcp/9000/p2p/16Ui...aXRz,/ip4/151.150.191.80/tcp/9000/p2p/16Ui...q6f1
```

```bash tab="Environment Variable"
TEKU_P2P_STATIC-PEERS=/ip4/151.150.191.80/tcp/9000/p2p/16Ui...aXRz,/ip4/151.150.191.80/tcp/9000/p2p/16Ui...q6f1
```

```bash tab="Configuration File"
p2p-static-peers: ["/ip4/151.150.191.80/tcp/9000/p2p/16Ui...aXRz",
                   "/ip4/151.150.191.80/tcp/9000/p2p/16Ui...q6f1"]
```

List of comma-separated [multiaddresses](https://docs.libp2p.io/reference/glossary/#multiaddr)
of static peers.

### rest-api-docs-enabled

```bash tab="Syntax"
--rest-api-docs-enabled[=<BOOLEAN>]
```

```bash tab="Command Line"
--rest-api-docs-enabled=true
```

```bash tab="Environment Variable"
TEKU_REST_API_DOCS_ENABLED=true
```

```bash tab="Configuration File"
rest-api-docs-enabled: true
```

Set to `true` to enable the REST API documentation.
The default is `false`.

The documentation can be accessed at `http://<interface>:<port>/swagger-ui` where:

* `interface` is specified using [`--rest-api-interface`](#rest-api-interface)
* `port` is specified using [`--rest-api-port`](#rest-api-port)

### rest-api-enabled

```bash tab="Syntax"
--rest-api-enabled[=<BOOLEAN>]
```

```bash tab="Command Line"
--rest-api-enabled=true
```

```bash tab="Environment Variable"
TEKU_REST_API_ENABLED=true
```

```bash tab="Configuration File"
rest-api-enabled: true
```

Set to `true` to enable the [REST API service](../Rest_API/Rest.md).
The default is `false`.

### rest-api-host-whitelist

```bash tab="Syntax"
--rest-api-host-whitelist=<hostname>[,<hostname>...]... or "*"
```

```bash tab="Command Line"
--rest-api-host-whitelist=medomain.com,meotherdomain.com
```

```bash tab="Environment Variable"
TEKU_REST_API_HOST_WHITELIST=medomain.com,meotherdomain.com
```

```bash tab="Configuration File"
rest-api-host-whitelist: ["medomain.com", "meotherdomain.com"]
```

A comma-separated list of hostnames to allow access to the REST API. By
default, Teku accepts access from `localhost` and `127.0.0.1`.

!!! tip

    To allow all hostnames, use `"*"`. We don't recommend allowing all hostnames for production
    environments.

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
rest-api-interface: "0.0.0.0"
```

Specifies the interface on which the REST API listens.
The default is `127.0.0.1`.

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
rest-api-port: 3435
```

Specifies REST API listening port (HTTP).
The default is 5051.

### version

```bash tab="Syntax"
  -V, --version
```

Displays the version and exits.

### validators-external-signer-public-keys

```bash tab="Syntax"
--validators-external-signer-public-keys=<KEY>[,<KEY>...]
```

```bash tab="Command Line"

--validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b
```

```bash tab="Environment Variable"
TEKU_VALIDATORS_EXTERNAL_SIGNER_PUBLIC_KEYS=0xa99a...e44c,0xb89b...4a0b
```

```bash tab="Configuration File"
validators-external-signer-public-keys: ["0xa99a...e44c","0xb89b...4a0b"]
```

List of validator public keys used by an external signer (for example, Eth2Signer).

### validators-external-signer-timeout

```bash tab="Syntax"
--validators-external-signer-timeout=<INTEGER>
```

```bash tab="Command Line"
--validators-external-signer-timeout=2000
```

```bash tab="Environment Variable"
TEKU_VALIDATORS_EXTERNAL_SIGNER_TIMEOUT=2000
```

```bash tab="Configuration File"
validators-external-signer-timeout: 2000
```

Timeout in milliseconds for requests to the external signer. Default is 1000.

### validators-external-signer-url

```bash tab="Syntax"
--validators-external-signer-url=<URL>
```

```bash tab="Command Line"
--validators-external-signer-url=http://localhost:9000
```

```bash tab="Environment Variable"
TEKU_VALIDATORS_EXTERNAL_SIGNER_URL=http://localhost:9000
```

```bash tab="Configuration File"
validators-external-signer-url: "http://localhost:9000"
```

URL on which the external signer (for example, Eth2Signer) is running.

### validators-key-files

```bash tab="Syntax"
--validators-key-files=<FILENAME>[,<FILENAME>...]...
```

```bash tab="Command Line"
--validators-key-files=validator_0xa245...58cf.json,validator_0xb880...1f09.json
```

```bash tab="Environment Variable"
TEKU_VALIDATORS_KEY_FILES=validator_0xa245...58cf.json,validator_0xb880...1f09.json
```

```bash tab="Configuration File"
validators-key-files: ["validator_0xa245...58cf.json","validator_0xb880...1f09.json"]
```

List of encrypted BLS12-381 keystore files to load the validator keys from.

The keystore files can be created when generating validators using the
`teku validator generate --keys-output-path` option.

### validators-key-password-files

```bash tab="Syntax"
--validators-key-password-files=<PASSWORDFILE>[,<PASSWORDFILE...]...
```

```bash tab="Command Line"
validators-key-password-files=/home/me/me_node/password1.txt,/home/me/me_node/password2.txt
```

```bash tab="Environment Variable"
TEKU_VALIDATORS_KEY_PASSWORD_FILES=/home/me/me_node/password1.txt,/home/me/me_node/password2.txt
```

```bash tab="Configuration File"
validators-key-password-files: ["home/me/me_node/password1.txt","home/me/me_node/password2.txt"]
```

List of plain text files containing the password to decrypt the BLS12-381 keystore files.

Each keystore file requires its own password file. The password file must match
the list position of the keystore file listed using [`--validators-key-files`](#validators-key-files).

### validators-unencrypted-key-file

```bash tab="Syntax"
--validators-unencrypted-key-file=<PATH_TO_FILE>
```

```bash tab="Command Line"
--validators-unencrypted-key-file=/home/me/me_node/key.
```

```bash tab="Environment Variable"
TEKU_VALIDATORS_UNENCRYPTED_KEY_FILE=/home/me/me_node/key.yaml
```

```bash tab="Configuration File"
validators-unencrypted-key-file: "/home/me/me_node/key.yaml"
```

Path to the YAML-formatted file to load unencrypted validator keys from.

A YAML-formatted file that stores unencrypted validator keys can be generated using
the `teku validator generate --keys-output-path` option.
