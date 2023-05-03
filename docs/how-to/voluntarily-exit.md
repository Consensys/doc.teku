---
title: Voluntarily exit
description: Voluntarily exit a validator from the Beacon Chain.
sidebar_position: 10
---

# Voluntarily exit a validator

A voluntary exit is when a validator chooses to stop performing its duties, and exits the Beacon Chain permanently.

To voluntarily exit, the validator must continue performing its validator duties until successfully exited to avoid penalties.

:::caution

To voluntarily exit, you must have a running beacon node with the [REST API enabled].

:::

:::warning

A validator **cannot** rejoin the network once it voluntarily exits.

:::

:::warning

Even if a validator has successfully exited, it **cannot withdraw** its funds until withdrawals are enabled in a future upgrade of the consensus layer.

:::

## Initiate a voluntary exit

Use the [`voluntary-exit`](../reference/cli/subcommands/voluntary-exit.md) subcommand to initiate a voluntary exit for specified validators.

```bash title="Example"
teku voluntary-exit --beacon-node-api-endpoint=http://127.0.0.1:5051 \
--validator-keys=validator/keys/validator_1e9f2a.json:validator/passwords/validator_1e9f2a.txt
```

In the command:

- Specify the location of the beacon node using [`--beacon-node-api-endpoint`](../reference/cli/subcommands/voluntary-exit.md#beacon-node-api-endpoint).
- Specify the validators to exit using the [`--validator-keys`](../reference/cli/subcommands/voluntary-exit.md#validator-keys) option.
- Specify the earliest epoch at which to exit using the [`--epoch`](../reference/cli/subcommands/voluntary-exit.md#epoch) option. If not specified, this defaults to the current epoch. You cannot specify a future epoch.

If using an external signer such as [Web3Signer], then specify the external signer URL and public key of the exiting validator:

```bash title="Example"
teku voluntary-exit --beacon-node-api-endpoint=http://127.0.0.1:5051 \
--validators-external-signer-public-keys=1e9f2afcc0737f4502e8d4238e4fe82d45077b2a549902b61d65367acecbccba \
--validators-external-signer-url=http://localhost:9000
```

Use the [`/eth/v1/beacon/pool/voluntary_exits`](https://consensys.github.io/teku/#operation/getEthV1BeaconPoolVoluntary_exits) API to check the pending exit queue.

<!-- links -->

[Web3Signer]: https://docs.web3signer.consensys.net/en/latest/
[REST API enabled]: ../reference/cli/index.md#rest-api-enabled
