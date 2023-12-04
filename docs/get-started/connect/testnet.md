---
title: Connect to a testnet
description: Connect Teku to a testnet.
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Connect to a testnet

Run Teku as a consensus client with any execution client on a testnet (for example [Goerli](https://github.com/eth-clients/goerli) or
[Sepolia](https://github.com/eth-clients/sepolia).

If you're using [Hyperledger Besu](https://besu.hyperledger.org/en/stable/) as an execution client, you can follow the
[Besu and Teku testnet tutorial](https://besu.hyperledger.org/en/latest/public-networks/tutorials/besu-teku-testnet/).

:::note

Sepolia is a permissioned network and you can't run a validator client on it without [requesting to become a validator](https://notes.ethereum.org/zvkfSmYnT0-uxwwEegbCqg) first. You can connect your consensus client using the beacon node only, without any validator duties.

:::

## Prerequisites

- [Teku installed](../install/install-binaries.md).
- An execution client installed. For example, [Besu].

## 1. Generate the shared secret

Run the following command:

```bash
openssl rand -hex 32 | tr -d "\n" > jwtsecret.hex
```

You will specify `jwtsecret.hex` when starting Teku and the execution client. This is a shared JWT secret the clients use to authenticate each other when using the [Engine API](https://github.com/ethereum/execution-apis/blob/v1.0.0-beta.1/src/engine/specification.md).

## 2. Generate validator keys

If you're running a beacon node only, skip to the [next step](#3-start-the-execution-client).

If you're also running a validator client, create a test Ethereum address
(you can do this in [MetaMask](https://metamask.zendesk.com/hc/en-us/articles/360015289452-How-to-create-an-additional-account-in-your-wallet)).
Fund this address with testnet ETH (32 ETH and gas fees for each validator) using a faucet.
See the list of [Goerli faucets](https://github.com/eth-clients/goerli#meta-data-g%C3%B6rli) or
[Sepolia faucets](https://github.com/eth-clients/sepolia#meta-data-sepolia).

:::note

If you're unable to get ETH using the faucet, you can ask for help on the [EthStaker Discord](https://discord.gg/ethstaker).

:::

Generate validator keys for one or more validators using the [Goerli Staking Launchpad](https://goerli.launchpad.ethereum.org/).

Remember the passwords that you use to create the validator keys, because you
need them to [create the validator password files](#create-a-password-file-for-each-validator-key).

### Create a password file for each validator key

For each validator key, create a text file containing the password to decrypt the key.

Teku allows you to specify individual keys and passwords in the command line, or you can specify directories from which to load keys and passwords. If specifying directories, password files must have the same name as the keys, but use the `.txt` extension.

:::info

- If the Launchpad creates a key named `keystore-m_12381_3600_0_0_0-1596485378.json`,
  then the password file must be named `keystore-m_12381_3600_0_0_0-1596485378.txt`.

- The password file format follows
  [`EIP-2335`](https://eips.ethereum.org/EIPS/eip-2335#password-requirements)
  requirements (UTF-8 encoded file, unicode normalization, and control code removal).

:::

## 3. Start the execution client

Refer to your execution client documentation to configure and start the execution client. Make sure you specify the shared secret generated in [step 1].

If you're using [Besu], you can follow the [Besu and Teku testnet tutorial](https://besu.hyperledger.org/en/latest/public-networks/tutorials/besu-teku-testnet/).

## 4. Start Teku

Open a new terminal window.

### Beacon node only

To run Teku as a beacon node only (without validator duties), run the following command or [specify the options in a configuration file](../../how-to/configure/use-config-file.md):

<Tabs>
  <TabItem value="Goerli" label="Goerli" default>

```bash
teku \
    --network=goerli                             \
    --ee-endpoint=http://localhost:8551          \
    --ee-jwt-secret-file=<path to jwtsecret.hex> \
    --metrics-enabled=true                       \
    --rest-api-enabled=true                      \
    --checkpoint-sync-url=<checkpoint sync URL>
```

  </TabItem>
  <TabItem value="Sepolia" label="Sepolia" >

```bash
teku \
    --network=sepolia                            \
    --ee-endpoint=http://localhost:8551          \
    --ee-jwt-secret-file=<path to jwtsecret.hex> \
    --metrics-enabled=true                       \
    --rest-api-enabled=true                      \
    --checkpoint-sync-url=<checkpoint sync URL>
```

  </TabItem>
</Tabs>

Specify:

- The path to the `jwtsecret.hex` file generated in [step 1] using the
  [`--ee-jwt-secret-file`](../../reference/cli/index.md#ee-jwt-secret-file) option.
- The URL of a checkpoint sync endpoint using the
  [`--checkpoint-sync-url`](../../reference/cli/index.md#checkpoint-sync-url) option.

You can modify the option values and add other [command line options](../../reference/cli/index.md) as needed.

### Beacon node and validator client

You can run the Teku beacon node and validator client as a [single process](#single-process) or as [separate processes](#separate-processes).

You can check your validator status by searching your Ethereum address on the [Goerli Beacon Chain explorer](https://goerli.beaconcha.in/). It may take up to multiple days for your validator to be activated and start proposing blocks.

You can also use [Prometheus and Grafana](../../how-to/monitor/use-metrics.md) to monitor your nodes.

#### Single process

To run the Teku beacon node and validator client in a single process, run the following command or
[specify the options in the configuration file](../../how-to/configure/use-config-file.md):

<Tabs>
  <TabItem value="Goerli" label="Goerli" default>

```bash
teku \
  --network=goerli                                          \
  --ee-endpoint=http://localhost:8551                       \
  --ee-jwt-secret-file=<path to jwtsecret.hex>              \
  --metrics-enabled=true                                    \
  --rest-api-enabled=true                                   \
  --checkpoint-sync-url=<checkpoint sync URL>              \
  --validators-proposer-default-fee-recipient=<ETH address> \
  --validator-keys=<path to key file>:<path to password file>[,<path to key file>:<path to password file>,...]
```

  </TabItem>
  <TabItem value="Sepolia" label="Sepolia" >

Sepolia is a permissioned network and you can't run a validator client on it without [requesting to become a validator](https://notes.ethereum.org/zvkfSmYnT0-uxwwEegbCqg) first.

  </TabItem>
</Tabs>

Specify:

- The path to the `jwtsecret.hex` file generated in [step 1] using the [`--ee-jwt-secret-file`](../../reference/cli/index.md#ee-jwt-secret-file) option.
- The URL of a checkpoint sync endpoint using the
  [`--checkpoint-sync-url`](../../reference/cli/index.md#checkpoint-sync-url) option.
- An Ethereum address you own as the default fee recipient using the [`--validators-proposer-default-fee-recipient`](../../reference/cli/index.md#validators-proposer-default-fee-recipient) option.
- The paths to the keystore `.json` file and password `.txt` file created in [step 2](#create-a-password-file-for-each-validator-key) for each validator using the [`--validator-keys`](../../reference/cli/index.md#validator-keys) option. Separate the `.json` and `.txt` files with a colon, and separate entries for multiple validators with commas. Alternatively, specify paths to directories to load multiple keys and passwords from.

You can modify the option values and add other [command line options](../../reference/cli/index.md) as needed.

#### Separate processes

To run the Teku beacon node and validator client as separate processes, first [start Teku as a beacon node only](#beacon-node-only).

On a separate machine, run Teku using the [`validator-client`](../../reference/cli/subcommands/validator-client.md) subcommand:

<Tabs>
  <TabItem value="Goerli" label="Goerli" default>

```bash
teku validator-client \
    --network=goerli                      \
    --beacon-node-api-endpoint=<endpoint> \
    --validator-keys=<path to key file>:<path to password file>[,<path to key file>:<path to password file>,...]
```

  </TabItem>
  <TabItem value="Sepolia" label="Sepolia" >

Sepolia is a permissioned network and you can't run a validator client on it without [requesting to become a validator](https://notes.ethereum.org/zvkfSmYnT0-uxwwEegbCqg) first.

  </TabItem>
</Tabs>

Specify:

- The location of one or more beacon node API endpoints using the [`--beacon-node-api-endpoint`](../../reference/cli/subcommands/validator-client.md#beacon-node-api-endpoint-beacon-node-api-endpoints) option.
- The paths to the keystore `.json` file and password `.txt` file created in [step 2](#create-a-password-file-for-each-validator-key) for each validator using the [`--validator-keys`](../../reference/cli/index.md#validator-keys) option. Separate the `.json` and `.txt` files with a colon, and separate entries for multiple validators with commas. Alternatively, specify paths to directories to load multiple keys and passwords from.

## 5. Wait for the clients to sync

After starting the execution client and Teku, your node starts syncing and
connecting to peers.

If you're running Teku as a beacon node only, you're all set.
If you're also running Teku as a validator client, ensure your clients are fully
synced before submitting your staking deposit in the next step.
Syncing the execution client can take several days.

## 6. Stake ETH

Stake your testnet ETH for one or more validators using the
[Goerli Staking Launchpad](https://goerli.launchpad.ethereum.org/).

You can check your validator status by searching your Ethereum address on the
[Goerli Beacon Chain explorer](https://goerli.beaconcha.in/).
It may take up to multiple days for your validator to be activated and start
proposing blocks.

<!-- links -->

[Besu]: https://besu.hyperledger.org/en/stable/
[step 1]: #1-generate-the-shared-secret
