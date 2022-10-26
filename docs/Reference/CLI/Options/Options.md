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

* In a [YAML configuration file](../../../HowTo/Configure/Use-Configuration-File.md).

If an option is specified in multiple places, the order of priority is command line, environment variable,
configuration file.

The available options could be broken down into the following categories:

- [`Execution Layer`](Execution-Layer.md)
- [`Storage`](Storage.md)
- [`Network`](Network.md)
- [`Deposit`](Deposit.md)
- [`Logging`](Logging.md)
- [`Metrics`](Metrics.md)
- [`REST API`](REST-API.md)
- [`Validator`](Validator.md)
- [`Validator API`](Validator-API.md)
- [`Validator Keys`](Validator-Keys.md)
- [`Validator Proposer`](Validator-Proposer.md)
- [`Weak Subjectivity`](Weak-Subjectivity.md)

General options are provided below.

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

Path to the [YAML configuration file](../../../HowTo/Configure/Use-Configuration-File.md).
The default is `none`.

### help

=== "Syntax"

    ```bash
    -h, --help
    ```

Show the help message and exit.

### version

=== "Syntax"

    ```bash
    -V, --version
    ```

Displays the version and exits.

## Using autocomplete

If using Bash or Z shell, you can enable autocomplete support by navigating to the `build` folder and running:

```bash
source teku.autocomplete.sh
```

Autocomplete allows you to view option suggestions by entering `--` and pressing the Tab key twice.

```bash
teku --Tab+Tab
```

## All options
TODO all options cloud if needed

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
