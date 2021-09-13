---
title: Validator client subcommand options
---

# `validator-client`, `vc`

Run a validator client that connects to a remote beacon node. To use the `validator-client`
subcommand run:

```bash
teku validator-client [options]
```

Or:

```bash
teku vc [options]
```

You can also supply the subcommand options using [environment variables or a configuration file].

## Options

### beacon-node-api-endpoint

=== "Syntax"

    ```bash
    teku vc --beacon-node-api-endpoint=<ENDPOINT>
    ```

=== "Example"

    ```bash
    teku vc --beacon-node-api-endpoint=http://192.138.10.12
    ```

=== "Environment variable"

    ```bash
    TEKU_BEACON_NODE_ENDPOINT=http://192.138.10.12
    ```

=== "Configuration file"

    ```bash
    beacon-node-api-endpoint: "http://192.138.10.12"
    ```

Endpoint of the beacon node's REST API. Default is `http://127.0.0.1:5051`.

### config-file

=== "Syntax"

    ```bash
    teku vc --config-file=<FILE>
    ```

=== "Example"

    ```bash
    teku vc --config-file=/home/me/me_node/config.yaml
    ```

=== "Environment variable"

    ```bash
    TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
    ```

The path to the YAML configuration file.
The default is `none`.

### data-base-path, data-path

=== "Syntax"

    ```bash
    teku vc --data-base-path=<PATH>
    ```

=== "Example"

    ```bash
    teku vc --data-base-path=/home/me/me_node
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_BASE_PATH=/home/me/me_node
    ```

=== "Configuration file"

    ```bash
    data-base-path: "/home/me/me_node"
    ```

The path to the Teku base directory for storage. The default directory is OS dependent:

* macOS: `~/Library/teku`
* Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`
* Windows: `%localappdata%\teku`.

The default Docker image location is `/root/.local/share/teku`.

### data-validator-path

=== "Syntax"

    ```bash
    teku vc --data-validator-path=<PATH>
    ```

=== "Example"

    ```bash
    teku vc --data-validator-path=/home/me/me_validator
    ```

=== "Environment variable"

    ```bash
    TEKU_DATA_VALIDATOR_PATH=/home/me/me_validator
    ```

=== "Configuration file"

    ```bash
    data-validator-path: "/home/me/me_validator"
    ```

Path to the validator client data. Defaults to `<data-base-path>/validator` where `<data-base-path>`
is specified using [`--data-base-path`](#data-base-path-data-path).

### initial-state

=== "Syntax"

    ```bash
    teku vc --initial-state=<FILE>
    ```

=== "Example"

    ```bash
    teku vc --initial-state=/home/me/genesis.ssz
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

This option does not need to be specified if the initial state is provided by the network specified
using the [`--network`](#network) option.

### log-color-enabled

=== "Syntax"

    ```bash
    teku vc --log-color-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    teku vc --log-color-enabled=false
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
Defaults to `true`.

### log-destination

=== "Syntax"

    ```bash
    teku vc --log-destination=<LOG_DESTINATION>
    ```

=== "Example"

    ```bash
    teku vc --log-destination=CONSOLE
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

Defaults to `DEFAULT_BOTH`. When using `BOTH` or `DEFAULT_BOTH`, system updates such as blockchain
events are displayed on the console, and errors and other information are logged to a file. Specify
the log file with the [`--log-file`](#log-file) command-line option.

For production systems we recommend using the `CONSOLE` or `FILE` options to ensure all log
information is available in one place.

!!! note

    Use `DEFAULT_BOTH` when using a
    [custom Log4J2 configuration file](../../../HowTo/Monitor/Logging.md#advanced-custom-logging).
    Any other option applies the custom logging changes on top of its default settings.

### log-file

=== "Syntax"

    ```bash
    teku vc --log-file=<FILENAME>
    ```

=== "Example"

    ```bash
    teku vc --log-file=teku_2020-01-01.log
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

The default directory is OS dependent:

* macOS: `~/Library/teku/logs`
* Unix/Linux: `$XDG_DATA_HOME/teku/logs` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku/logs`
* Windows: `%localappdata%\teku\logs`

The default Docker image location is `/root/.local/share/teku/logs`.

### log-file-name-pattern

=== "Syntax"

    ```bash
    teku vc --log-file-name-pattern=<REGEX>
    ```

=== "Example"

    ```bash
    teku vc --log-file-name-pattern=tekuL_%d{yyyy-MM-dd}.log
    ```

=== "Environment variable"

    ```bash
    TEKU_LOG_FILE_NAME_PATTERN=tekuL_%d{yyyy-MM-dd}.log
    ```

=== "Configuration file"

    ```bash
    log-file-name-pattern: "tekuL_%d{yyyy-MM-dd}.log"
    ```

Filename pattern to apply when creating log files.

### log-include-events-enabled

=== "Syntax"

    ```bash
    teku vc --log-include-events-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    teku vc --log-include-events-enabled=false
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
validators and attestations. Defaults to `true`.

### log-include-validator-duties-enabled

=== "Syntax"

    ```bash
    teku vc --log-include-validator-duties-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    teku vc --log-include-validator-duties-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_LOG_INCLUDE_VALIDATOR_DUTIES_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    log-include-validator-duties-enabled: true
    ```

Specify whether to log details of validator event duties. Defaults to `false`.

!!! note
    Logs could become noisy when running many validators.

### metrics-enabled

=== "Syntax"

    ```bash
    teku vc --metrics-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    teku vc --metrics-enabled=true
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
    teku vc --metrics-host-allowlist=<hostname>[,<hostname>...]... or "*"
    ```

=== "Example"

    ```bash
    teku vc --metrics-host-allowlist=medomain.com,meotherdomain.com
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
    teku vc --metrics-categories=<CATEGORY>[,<CATEGORY>...]...
    ```

=== "Example"

    ```bash
    teku vc --metrics-categories=BEACON,JVM,PROCESS
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_CATEGORIES=BEACON,JVM,PROCESS
    ```

=== "Configuration file"

    ```bash
    metrics-categories: ["BEACON", "JVM", "PROCESS"]
    ```

Categories for which to track metrics. Options are `JVM`, `PROCESS`, `BEACON`, `EVENTBUS`,
`EXECUTOR`, `LIBP2P`, `NETWORK`, `STORAGE`, `STORAGE_HOT_DB`, `STORAGE_FINALIZED_DB`,
`REMOTE_VALIDATOR`, `VALIDATOR`, `VALIDATOR_PERFORMANCE`. All categories are enabled by default.

### metrics-interface

=== "Syntax"

    ```bash
    teku vc --metrics-interface=<HOST>
    ```

=== "Example"

    ```bash
    teku vc --metrics-interface=192.168.10.101
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_INTERFACE=192.168.10.101
    ```

=== "Configuration file"

    ```bash
    metrics-interface: "192.168.10.101"
    ```

Host on which Prometheus accesses Teku metrics. The default is `0.0.0.0`.

### metrics-port

=== "Syntax"

    ```bash
    teku vc --metrics-port=<PORT>
    ```

=== "Example"

    ```bash
    teku vc --metrics-port=6174
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

### network

=== "Syntax"

    ```bash
    teku vc --network=<NETWORK>
    ```

=== "Example"

    ```bash
    teku vc --network=mainnet
    ```

=== "Environment variable"

    ```bash
    TEKU_NETWORK=mainnet
    ```

=== "Configuration file"

    ```bash
    network: "mainnet"
    ```

Predefined network configuration. Accepts a predefined network name, or file path or URL
to a YAML configuration file. The default is `mainnet`.

Possible values are:

| Network   | Chain   | Type        | Description                                      |
|-----------|---------|-------------|--------------------------------------------------|
| `mainnet` | Eth 2.0 | Production  | Main network.                                    |
| `minimal` | Eth 2.0 | Test        | Used for local testing and development networks. |
| `pyrmont` | Eth 2.0 | Test        | Multi-client testnet.                            |
| `prater`  | Eth 2.0 | Test        | Multi-client testnet.                            |

Predefined networks can provide defaults such the initial state of the network,
bootnodes, and the address of the Ethereum 1.0 deposit contract.

### validator-keys

=== "Syntax"

    ```bash
    teku vc --validator-keys=<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>[,<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>...]...
    ```

=== "Example for directory"

    ```bash
    teku vc --validator-keys=/home/validator/keys:home/validator/passwords
    ```

=== "Example for file"

    ```bash
    teku vc --validator-keys=/home/validator/keys/validator_217179e.json:/home/validator/passwords/validator_217179e.txt
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

When specifying file names, Teku expects that the files exist.

!!! note

    The path separator is operating system dependent, and should be `;` in Windows rather than `:`.

### validators-external-signer-public-keys

=== "Syntax"

    ```bash
    teku vc --validators-external-signer-public-keys=<KEY>[,<KEY>...]
    ```

=== "Example"

    ```bash
    teku vc --validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_PUBLIC_KEYS=0xa99a...e44c,0xb89b...4a0b
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-public-keys: ["0xa99a...e44c","0xb89b...4a0b"]
    ```

List of validator public keys used by an external signer (for example, [Web3Signer]).

### validators-external-signer-slashing-protection-enabled

=== "Syntax"

    ```bash
    teku vc --validators-external-signer-slashing-protection-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    teku vc --validators-external-signer-slashing-protection-enabled=false
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
[Web3Signer]. Defaults to `true`.

Set this option to `false` if using the slashing protection implemented by an external signer.

!!! warning

    Ensure the external signer has slashing protection enabled before disabling Teku
    slashing protection, otherwise a validator may get slashed.

Built-in slashing protection can only be disabled for validators using external signers. Validators
using Teku to sign blocks and attestations always uses its built-in slashing protection.

### validators-external-signer-timeout

=== "Syntax"

    ```bash
    teku vc --validators-external-signer-timeout=<INTEGER>
    ```

=== "Example"

    ```bash
    teku vc --validators-external-signer-timeout=2000
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_TIMEOUT=2000
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-timeout: 2000
    ```

Timeout in milliseconds for requests to the external signer. Default is 1000.

### validators-external-signer-url

=== "Syntax"

    ```bash
    teku vc --validators-external-signer-url=<URL>
    ```

=== "Example"

    ```bash
    teku vc --validators-external-signer-url=http://localhost:9000
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
    teku vc --validators-graffiti=<STRING>
    ```

=== "Example"

    ```bash
    teku vc --validators-graffiti="Teku validator"
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

### validators-keystore-locking-enabled

=== "Syntax"

    ```bash
    teku vc --validators-keystore-locking-enabled=<BOOLEAN>
    ```

=== "Example"

    ```bash
    teku vc --validators-keystore-locking-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_KEYSTORE_LOCKING_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    validators-keystore-locking-enabled: true
    ```

Locks the keystore files listed in [`--validator-keys`](#validator-keys). Defaults to `true`.

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
`NONE`. Defaults to `ALL`.

When `LOGGING` is enabled, attestation and block performance is reported as log messages. When
`METRICS` is enabled, attestation and block performance is reported using [metrics] in the
[`VALIDATOR_PERFORMANCE`](#metrics-categories) metrics category.

<!-- links -->
[environment variables or a configuration file]: ../CLI-Syntax.md#specifying-options
[Web3Signer]: https://docs.web3signer.consensys.net/en/latest/
[slashing protection]: ../../../Concepts/Slashing-Protection.md
[recent finalized checkpoint state from which to sync]: ../../../HowTo/Get-Started/Checkpoint-Start.md
[metrics]: ../../../HowTo/Monitor/Metrics.md
