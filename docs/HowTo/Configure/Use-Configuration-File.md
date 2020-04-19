---
description: Use Teku configuration file
---

# Using the Teku configuration file

To specify command line options in a file, use a YAML configuration file.

Save the configuration file and reuse it across node startups. To specify the configuration file,
use the [`--config-file`](../../Reference/CLI/CLI-Syntax.md#config-file) option.

To override an option specified in the configuration file, either specify the same option on the
command line or as an
[environment variable](../../Reference/CLI/CLI-Syntax.md#teku-environment-variables). For options
specified in more than one place, the order of precedence is command line, environment variable,
configuration file.

## YAML specification

The configuration file must be a valid YAML file composed of key/value pairs. Each key is the same
as the corresponding command line option name without the leading dashes (`--`).

Values must conform to YAML specifications for string, numbers, arrays, and booleans. Specific
differences between the command line and the TOML file format are:

* Comma-separated lists on the command line are string arrays in the YAML file.
* Enclose file paths, hexadecimal numbers, URLs, and &lt;host:port&gt; values in quotes.

!!!tip

    The [command line reference](../../Reference/CLI/CLI-Syntax.md) includes configuration file
    examples for each option.

!!! example "Sample YAML configuration file"

    ```yaml
    # network
    network: "minimal"

    # p2p
    p2p-enabled: true
    p2p-port: 9000

    # validators
    validators-key-file: "validator_keys.yaml"

    # deposit
    eth1-deposit-contract-address: "dddddddddddddddddddddddddddddddddddddddd"
    eth1-endpoint: "http://localhost:8545"

    # metrics
    metrics-enabled: true
    metrics-categories: ["BEACON","LIBP2P","NETWORK"]

    # database
    data-path: "~/tekudata"
    data-storage-mode: "archive"

    # beacon rest api
    rest-api-port: 5051
    rest-api-docs-enabled: true
    rest-api-enabled: true
    ```