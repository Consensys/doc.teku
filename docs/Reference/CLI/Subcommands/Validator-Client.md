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

=== "Command Line"

    ```bash
    teku vc --beacon-node-api-endpoint=http://192.138.10.12
    ```

=== "Environment Variable"

    ```bash
    TEKU_BEACON_NODE_ENDPOINT=http://192.138.10.12
    ```

=== "Configuration File"

    ```bash
    beacon-node-api-endpoint: "http://192.138.10.12"
    ```

Endpoint of the beacon node's REST API. Default is `http://127.0.0.1:5051`.

### config-file

=== "Syntax"

    ```bash
    teku vc --config-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku vc --config-file=/home/me/me_node/config.yaml
    ```

=== "Environment Variable"

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

=== "Command Line"

    ```bash
    teku vc --data-base-path=/home/me/me_node
    ```

=== "Environment Variable"

    ```bash
    TEKU_DATA_BASE_PATH=/home/me/me_node
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    teku vc --data-validator-path=/home/me/me_validator
    ```

=== "Environment Variable"

    ```bash
    TEKU_DATA_VALIDATOR_PATH=/home/me/me_validator
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    teku vc --initial-state=/home/me/genesis.ssz
    ```

=== "Environment Variable"

    ```bash
    TEKU_INITIAL_STATE=/home/me/genesis.ssz
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    teku vc --log-color-enabled=false
    ```

=== "Environment Variable"

    ```bash
    TEKU_LOG_COLOR_ENABLED=false
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    teku vc --log-destination=CONSOLE
    ```

=== "Environment Variable"

    ```bash
    TEKU_LOG_DESTINATION=CONSOLE
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    teku vc --log-file=teku_2020-01-01.log
    ```

=== "Environment Variable"

    ```bash
    TEKU_LOG_FILE=teku_2020-01-01.log
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    teku vc --log-file-name-pattern=tekuL_%d{yyyy-MM-dd}.log
    ```

=== "Environment Variable"

    ```bash
    TEKU_LOG_FILE_NAME_PATTERN=tekuL_%d{yyyy-MM-dd}.log
    ```

=== "Configuration File"

    ```bash
    log-file-name-pattern: "tekuL_%d{yyyy-MM-dd}.log"
    ```

Filename pattern to apply when creating log files.

### log-include-events-enabled

=== "Syntax"

    ```bash
    teku vc --log-include-events-enabled[=<BOOLEAN>]
    ```

=== "Command Line"

    ```bash
    teku vc --log-include-events-enabled=false
    ```

=== "Environment Variable"

    ```bash
    TEKU_LOG_INCLUDE_EVENTS_ENABLED=false
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    teku vc --log-include-validator-duties-enabled=true
    ```

=== "Environment Variable"

    ```bash
    TEKU_LOG_INCLUDE_VALIDATOR_DUTIES_ENABLED=true
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    teku vc --metrics-enabled=true
    ```

=== "Environment Variable"

    ```bash
    TEKU_METRICS_ENABLED=true
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    teku vc --metrics-host-allowlist=medomain.com,meotherdomain.com
    ```

=== "Environment Variable"

    ```bash
    TEKU_METRICS_HOST_ALLOWLIST=medomain.com,meotherdomain.com
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    teku vc --metrics-categories=BEACON,JVM,PROCESS
    ```

=== "Environment Variable"

    ```bash
    TEKU_METRICS_CATEGORIES=BEACON,JVM,PROCESS
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    teku vc --metrics-interface=192.168.10.101
    ```

=== "Environment Variable"

    ```bash
    TEKU_METRICS_INTERFACE=192.168.10.101
    ```

=== "Configuration File"

    ```bash
    metrics-interface: "192.168.10.101"
    ```

Host on which Prometheus accesses Teku metrics. The default is `0.0.0.0`.

### metrics-port

=== "Syntax"

    ```bash
    teku vc --metrics-port=<PORT>
    ```

=== "Command Line"

    ```bash
    teku vc --metrics-port=6174
    ```

=== "Environment Variable"

    ```bash
    TEKU_METRICS_PORT=6174
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    teku vc --network=mainnet
    ```

=== "Environment Variable"

    ```bash
    TEKU_NETWORK=mainnet
    ```

=== "Configuration File"

    ```bash
    network: "mainnet"
    ```

Predefined network configuration. Accepts a predefined network name, or file path or URL
to a YAML configuration file. The default is `mainnet`.

Possible values are:

| Network   | Chain   | Type        | Description                                                         |
|-----------|---------|-------------|---------------------------------------------------------------------|
| `mainnet` | Eth 2.0 | Production  | Main network.                                                       |
| `minimal` | Eth 2.0 | Test        | Used for local testing and development networks.                    |
| `pyrmont` | Eth 2.0 | Test        | Multi-client testnet.                                               |

Predefined networks can provide defaults such the initial state of the network,
bootnodes, and the address of the Ethereum 1.0 deposit contract.

### validator-keys

=== "Syntax"

    ```bash
    teku vc --validator-keys=<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>[,<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>...]...
    ```

=== "Command Line for Directory"

    ```bash
    teku vc --validator-keys=/home/validator/keys:home/validator/passwords
    ```

=== "Command Line for File"

    ```bash
    teku vc --validator-keys=/home/validator/keys/validator_217179e.json:/home/validator/passwords/validator_217179e.txt
    ```

=== "Environment Variable"

    ```bash
    TEKU_VALIDATOR_KEYS=/home/validator/keys:home/validator/passwords
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    teku vc --validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b
    ```

=== "Environment Variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_PUBLIC_KEYS=0xa99a...e44c,0xb89b...4a0b
    ```

=== "Configuration File"

    ```bash
    validators-external-signer-public-keys: ["0xa99a...e44c","0xb89b...4a0b"]
    ```

List of validator public keys used by an external signer (for example, [Web3Signer]).

### validators-external-signer-slashing-protection-enabled

=== "Syntax"

    ```bash
    teku vc --validators-external-signer-slashing-protection-enabled[=<BOOLEAN>]
    ```

=== "Command Line"

    ```bash
    teku vc --validators-external-signer-slashing-protection-enabled=false
    ```

=== "Environment Variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_SLASHING_PROTECTION_ENABLED=false
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    teku vc --validators-external-signer-timeout=2000
    ```

=== "Environment Variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_TIMEOUT=2000
    ```

=== "Configuration File"

    ```bash
    validators-external-signer-timeout: 2000
    ```

Timeout in milliseconds for requests to the external signer. Default is 1000.

### validators-external-signer-url

=== "Syntax"

    ```bash
    teku vc --validators-external-signer-url=<URL>
    ```

=== "Command Line"

    ```bash
    teku vc --validators-external-signer-url=http://localhost:9000
    ```

=== "Environment Variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_URL=http://localhost:9000
    ```

=== "Configuration File"

    ```bash
    validators-external-signer-url: "http://localhost:9000"
    ```

URL on which the external signer (for example, Web3Signer) is running.

### validators-graffiti

=== "Syntax"

    ```bash
    teku vc --validators-graffiti=<STRING>
    ```

=== "Command Line"

    ```bash
    teku vc --validators-graffiti="Teku validator"
    ```

=== "Environment Variable"

    ```bash
    TEKU_VALIDATORS_GRAFFITI="Teku validator"
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    teku vc --validators-keystore-locking-enabled=true
    ```

=== "Environment Variable"

    ```bash
    TEKU_VALIDATORS_KEYSTORE_LOCKING_ENABLED=true
    ```

=== "Configuration File"

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

=== "Command Line"

    ```bash
    --validators-performance-tracking-mode=LOGGING
    ```

=== "Environment Variable"

    ```bash
    TEKU_VALIDATORS_PERFORMANCE_TRACKING_MODE=LOGGING
    ```

=== "Configuration File"

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
