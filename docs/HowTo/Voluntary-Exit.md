---
title: Voluntarily exit a validaor
---

# Voluntarily exit a validator

A voluntary exit is when a validator chooses to stop performing its duties, and exits the beacon
chain.

The validator must continue performing its validator duties until successfully exited to avoid
penalties.

!!! important

    Even if a validator has successfully exited, you cannot withdraw your funds until withdrawals are
    enabled in a future phase of the Ethereum 2.0 network.

## Initiate a voluntary exit

Use the [`voluntary-exit`](../Reference/CLI/Subcommands/Voluntary-Exit.md) subcommand to initiate
a voluntary exit for specified validators.

!!! example

    ```bash
    teku voluntary-exit --beacon-node-api-endpoint=http://10.32.100.1:5051 \
    --validator-keys=validator/keys/validator_888eef.json:validator/passwords/validator_888eef.txt \
    --epoch=24500
    ```

In the command:

* Specify the location of the beacon node using
    [`--beacon-node-api-endpoint`](../Reference/CLI/Subcommands/Voluntary-Exit.md#beacon-node-api-endpoint).
    You must have a running beacon node which has the [REST API enabled].
* Specify the validators to exit using the
   [`--validator-keys`](../Reference/CLI/Subcommands/Voluntary-Exit.md#validator-keys) option.
* Specify the earliest epoch at which to exit using the [`--epoch`](../Reference/CLI/Subcommands/Voluntary-Exit.md#epoch)
    option. The specified epoch must be a past or current epoch.

If using an external signer such as [Web3Signer], then specify the external signer URL and
public key of the exiting validator:

!!! example

   ```bash
   teku voluntary-exit --beacon-node-api-endpoint=http://10.32.100.1:5051 \
   --validators-external-signer-public-keys=888eef... \
   --validators-external-signer-url=http://localhost:9000 \
   --epoch=24500
   ```

Use the [`/eth/v1/beacon/pool/voluntary_exits`](https://consensys.github.io/teku/#operation/getEthV1BeaconPoolVoluntary_exits)
API to check the pending exit queue.

<!-- links -->
[Web3Signer]: https://docs.web3signer.consensys.net/en/latest/
[REST API enabled]: ../Reference/CLI/CLI-Syntax.md#rest-api-enabled
