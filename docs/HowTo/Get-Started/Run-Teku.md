---
title: Running Teku
---

# Start Teku

You can run Teku as a beacon node and validator in a single process, or as separate
processes.

We recommend you run the beacon node and validator as a [single process] if they are to run
on the same machine.

!!! note

    By default, Teku connects to `mainnet`. Use the [`--network`](../../Reference/CLI/CLI-Syntax.md#network)
    command line option to specify an alternate network.

    If the genesis state of a network is not yet known, then include the
    [`--eth1-endpoint`](../../Reference/CLI/CLI-Syntax.md#eth1-endpoint-eth1-endpoints) command line
    option.

## Prerequisites

* [Teku installed](Installation-Options/Install-Binaries.md)
* [Validator keystores] and [password files]

## Start the clients in a single process

Start the beacon node and validator as a single process by specifying the validator options
with the [`teku`](../../Reference/CLI/CLI-Syntax.md#options) command. For example:

!!! example

    ```
    teku --network=goerli --eth1-endpoints=http://localhost:8545,http://backup-host:8545/ \
    --validator-keys=validator/keys/validator_888eef.json:validator/passwords/validator_888eef.txt \
    --rest-api-enabled=true --rest-api-docs-enabled=true \
    --metrics-enabled
    ```

Use the [`--validator-keys`](../../Reference/CLI/CLI-Syntax.md#validator-keys) option to specify
the directory or file to load the encrypted keystore file(s) and associated password file(s) from.

## Run the clients separately

Validators must connect to a beacon node to publish attestations or propose blocks. The
beacon node requires internet access, but the connected validators can run on machines without
internet access.

### Start the beacon node

Run Teku as a beacon node.

!!! example

    ```bash
    teku --network=goerli --eth1-endpoint=http://localhost:8545 \
    --metrics-enabled --rest-api-enabled
    ```

Specify [`--rest-api-enabled`](../../Reference/CLI/CLI-Syntax.md#rest-api-enabled) to allow
validators to connect to the beacon node.

!!! warning
    Don't pass the validator keys as a command line option to both the beacon node and
    validator client. This can cause a [slashable offense].

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
    teku validator-client --network=goerli --beacon-node-api-endpoint=http://192.10.10.101:5051 \
    --validator-keys=validator/keys:validator/passwords
    ```

!!! warning
    Ensure that the validator keys are only provided to the validator. Don't pass the validator
    keys as command line options to both the beacon node and validator client. This can a
    cause a [slashable offense].

Specify the beacon node using the
[`--beacon-node-api-endpoint`](../../Reference/CLI/Subcommands/Validator-Client.md#beacon-node-api-endpoint)
option.

## Confirm Teku is running

Use the [`/liveness`](https://consensys.github.io/teku/#operation/getTekuV1AdminLiveness) endpoint
to check whether the node is up.

The endpoint returns the status `200 OK` if the node is up or syncing.

!!! example

    === "curl HTTP request"

        ```bash
        curl -I -X GET "http://192.10.10.101:5051/teku/v1/admin/liveness"
        ```

    === "Result"

        ```bash
        HTTP/1.1 200 OK
        Date: Fri, 05 Feb 2021 03:58:30 GMT
        Server: Javalin
        Content-Type: application/json
        Cache-Control: max-age=0
        Content-Length: 0
        ```
<!-- links -->
[validator clients]: #start-the-validator
[running beacon node]: #start-the-beacon-node
[Validator keystores]: Connect/Connect-To-Testnet.md#generate-the-validators-and-send-the-deposits
[password files]: Connect/Connect-To-Testnet.md#create-a-password-file-for-each-validator-key
[slashable offense]: ../../Concepts/Slashing-Protection.md
[single process]: #start-the-clients-in-a-single-process
