---
title: Voluntarily exit a validaor
---

# Voluntarily exit a validator

A voluntary exit is when a validator chooses to stop performing its duties, and exits the beacon
chain permanently.

To voluntarily exit, the validator must continue performing its validator duties until successfully
exited to avoid penalties.

!!! danger

    A validator cannot rejoin the network once it voluntarily exits.

!!! important

    To voluntarily exit, you must have a running beacon node with the [REST API enabled].

!!! important

    Even if a validator has successfully exited, it cannot withdraw its funds until withdrawals are
    enabled in a future phase of the Ethereum 2.0 network.

## Initiate a voluntary exit

Use the [`voluntary-exit`](../Reference/CLI/Subcommands/Voluntary-Exit.md) subcommand to initiate
a voluntary exit for specified validators.

!!! example

    ```bash
    teku voluntary-exit --beacon-node-api-endpoint=http://127.0.0.1:5051 \
    --validator-keys=validator/keys/validator_1e9f2a.json:validator/passwords/validator_1e9f2a.txt
    ```

In the command:

* Specify the location of the beacon node using
    [`--beacon-node-api-endpoint`](../Reference/CLI/Subcommands/Voluntary-Exit.md#beacon-node-api-endpoint).
* Specify the validators to exit using the
   [`--validator-keys`](../Reference/CLI/Subcommands/Voluntary-Exit.md#validator-keys) option.
* Specify the earliest epoch at which to exit using the [`--epoch`](../Reference/CLI/Subcommands/Voluntary-Exit.md#epoch)
    option. If not specified, this defaults to the current epoch. You cannot specify a future epoch.

If using an external signer such as [Web3Signer], then specify the external signer URL and
public key of the exiting validator:

!!! example

   ```bash
   teku voluntary-exit --beacon-node-api-endpoint=http://127.0.0.1:5051 \
   --validators-external-signer-public-keys=1e9f2afcc0737f4502e8d4238e4fe82d45077b2a549902b61d65367acecbccba \
   --validators-external-signer-url=http://localhost:9000
   ```

Use the [`/eth/v1/beacon/pool/voluntary_exits`](https://consensys.github.io/teku/#operation/getEthV1BeaconPoolVoluntary_exits)
API to check the pending exit queue.

<!-- links -->
[Web3Signer]: https://docs.web3signer.consensys.net/en/latest/
[REST API enabled]: ../Reference/CLI/CLI-Syntax.md#rest-api-enabled
