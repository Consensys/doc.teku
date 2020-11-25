---
title: Running Teku
---

# Start Teku

**Prerequisites**:

* [Teku installed](Installation-Options/Install-Binaries.md)
* [Validators keystores] and [password files].

You can run Teku as a beacon chain client and validator in a single process, or as separate
processes.

We recommend you run the beacon chain client and validator as a [single process] if they are to run
on the same machine.

!!! note

    By default, Teku connects to `mainnet`. Use the [`--network`](../../Reference/CLI/CLI-Syntax.md#network)
    command line option to specify an alternate network.
    
    If the genesis state of a network is not yet known, then
    include the [`--eth1-endpoint`](../../Reference/CLI/CLI-Syntax.md#eth1-endpoint) command line
    option.

## Start the clients in a single process

Start the beacon chain client and validator as a single process by specifying the validator options
with the [`teku`](../../Reference/CLI/CLI-Syntax.md#options) command

!!! example

    ```
    teku --network=pyrmont --eth1-endpoint=http://localhost:8545 \
    --validator-keys=validator/keys/validator_888eef.json:validator/passwords/validator_888eef.txt \
    --rest-api-enabled=true --rest-api-docs-enabled=true \
    --metrics-enabled
    ```

Use the [`--validator-keys`](../../Reference/CLI/CLI-Syntax.md#validator-keys) option to specify
the directory or file to load the encrypted keystore file(s) and associated password file(s) from.

## Run the clients separately

Validators need to connect to a beacon chain client to publish attestations or propose blocks. The
beacon node requires internet access, but the connected validators can run on machines without
internet access.

### Start the beacon chain client

Run Teku as a beacon chain client.

!!! example

    ```bash
    teku --network=pyrmont --eth1-endpoint=http://localhost:8545 \
    --metrics-enabled --rest-api-enabled
    ```

Specify [`--rest-api-enabled`](../../Reference/CLI/CLI-Syntax.md#rest-api-enabled) to allow
validators to connect to the beacon node.

!!! warning
    Do not pass the validator keys as a command line option to both the beacon chain client and
    validator client. This can cause a [slashable offence].

By default, [validator clients] can connect to the beacon node at `http://127.0.0.1:5051`.
Use the [`--rest-api-interface`](../../Reference/CLI/CLI-Syntax.md#rest-api-interface)
and [`--rest-api-port`](../../Reference/CLI/CLI-Syntax.md#rest-api-port) options to update the
address.

You can specify
[`--rest-api-host-allowlist`](../../Reference/CLI/CLI-Syntax.md#rest-api-host-allowlist) to
allow access to the REST API from specific hostnames.

### Start the validator

To run a validator, connect to a [running beacon node].

Use the [`validator-client`](../../Reference/CLI/Subcommands/Validator-Client.md#validator-client-vc)
or [`vc`](../../Reference/CLI/Subcommands/Validator-Client.md#validator-client-vc) subcommand to run
a Teku as a validator.

!!! example

    ```
    teku validator-client --network=pyrmont --beacon-node-api-endpoint=http://192.10.10.101:5051 \
    --validator-keys=validator/keys:validator/passwords
    ```

!!! warning
    Ensure that the validator keys are only provided to the validator. Do not pass the validator
    keys as command line options to both the beacon chain client and validator client. This can a
    cause a [slashable offence].

Specify the beacon chain client using the
[`--beacon-node-api-endpoint`](../../Reference/CLI/Subcommands/Validator-Client.md#beacon-node-api-endpoint)
option.

<!-- links -->
[validator clients]: #start-the-validator
[running beacon node]: #start-the-beacon-chain-client
[Validators keystores]: Connect/Connect-To-Testnet.md#generate-the-validators-and-send-the-deposits
[password files]: Connect/Connect-To-Testnet.md#create-a-password-file-for-each-validator-key
[slashable offence]: ../../Concepts/Slashing-Protection.md
[single process]: #start-the-clients-in-a-single-process
