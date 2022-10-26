---
title: Validator options
---

# `Validator`

TODO description

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
