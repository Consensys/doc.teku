---
description: How to connect to a testnet
---

# Connect to a testnet

The following instructions describe the process to connect Teku to an Ethereum 2.0 testnet.

!!! important

    This example connects to the [Prater testnet]. If connecting to a different testnet,
    update the [`--network`](../../../Reference/CLI/CLI-Syntax.md#network) option in the examples
    accordingly.

    Networks can experience stability issues and are prone to regular resets. We recommend you
    regularly check network and client documentation for updates.

**Prerequisites**:

* Install the latest stable version of Teku using a [binary distribution](../Installation-Options/Install-Binaries.md),
    or with [Docker](../Installation-Options/Run-Docker-Image.md).
* If running validators, install any Ethereum 1.0 client (for example [Hyperledger Besu]), or access a
    cloud-based service such as [Infura].

Teku allows you run a [beacon chain client only], or you can [run the beacon chain client
with validators] on a public testnet.

## Run validators on a testnet

Ethereum 2.0 validators need to access an Ethereum 1.0 client to onboard new validators.
Validators make deposits into Ethereum 1.0, and existing Ethereum 2.0 validators must
process the deposits to allow the validators to join Ethereum 2.0.

Deposits are made into a deposit contract on the Goerli Ethereum 1.0 testnet.

The steps to run an Ethereum 2.0 validator on a testnet are:

1. If using a local Ethereum 1.0 client, [sync the Ethereum 1.0 network containing
    the deposit contract](#sync-the-ethereum-10-network).

    !!! note
        This step is only required if using a local Ethereum 1.0 client such as Besu.
        If using a cloud-based service such as Infura, proceed to
        [fund your deposit account](#load-the-deposit-account-with-eth).

1. [Fund the Ethereum 1.0 deposit account](#load-the-deposit-account-with-eth).

1. [Generate the validator keys and send the deposit to the deposit
    contract](#generate-the-validators-and-send-the-deposits).

1. [Create a password file for each validator key](#create-a-password-file-for-each-validator-key).

1. [Start Teku with the validator keys](#start-the-validator).

### Sync the Ethereum 1.0 network

This step is only required if using a local Ethereum 1.0 client.

This example uses Besu to connect to Ethereum 1.0, but any client can be used.
Configure Besu to [connect to Goerli] and expose the RPC-HTTP APIs.

!!! example

    ```bash
    besu --network=goerli --data-path=./goerli --rpc-http-enabled=true --rpc-http-port=8545 \
    --rpc-http-api=ETH,NET,WEB3 --sync-mode=FAST --fast-sync-min-peers=2
    ```

### Load the deposit account with ETH

You need an Ethereum 1.0 Goerli testnet account that contains the amount of
Goerli ETH (plus gas) required to activate the validator. The `prater` testnet
requires 32 Goerli ETH per validator.

!!! tip

    You can create an account on Goerli using [Metamask], and use a [faucet] to
    fund the account.

### Generate the validators and send the deposits

Use the [Prater Launchpad] to guide you through a step-by-step process to generate your keys and
send the deposits.

!!! note
    Remember the passwords that you used to create the validator keys, because you need it to
    [create the validator password files](#create-a-password-file-for-each-validator-key).

### Create a password file for each validator key

For each validator key, create a text file containing the password to decrypt the key. The password
file must have the same name as the key, but use the `.txt` extension.

!!! example

    If the Launchpad creates a key named `keystore-m_12381_3600_0_0_0-1596485378.json`, then
    the password file must be named `keystore-m_12381_3600_0_0_0-1596485378.txt`.

!!! info

    The password file format follows [`EIP-2335`](https://eips.ethereum.org/EIPS/eip-2335#password-requirements)
    requirements (UTF-8 encoded file, unicode normalization, and control code removal).

### Start the validator

Run Teku and specify the validator key files [created earlier](#generate-the-validators-and-send-the-deposits),
and the text files containing the password to decrypt the validator key.

!!! example

    ```bash
    teku --network=prater --eth1-endpoint=http://localhost:8545 \
    --validator-keys=validator/keys/validator_888eef.json:validator/passwords/validator_888eef.txt \
    --rest-api-enabled=true --rest-api-docs-enabled=true \
    --metrics-enabled
    ```

!!! note

    If using a cloud-based service such as [Infura], then set
    [`--eth1-endpoint`](../../../Reference/CLI/CLI-Syntax.md#eth1-endpoint-eth1-endpoints) to the
    supplied URL. For example, `https://goerli.infura.io/v3/<Project_ID>`.

Alternatively, use [`--validator-keys`](../../../Reference/CLI/CLI-Syntax.md#validator-keys) to
specify the directory to load multiple keys and passwords from.

!!! example

    ```bash
    teku --network=prater --eth1-endpoint=http://localhost:8545 \
    --validator-keys=validator/keys:validator/passwords \
    --rest-api-enabled=true --rest-api-docs-enabled=true \
    --metrics-enabled
    ```

Once the validator is activated, view it on the beacon chain explorer at
`https://prater.beaconcha.in/validator/<validatorPublicKey>`.

## Run a beacon chain client only

You can run a Teku beacon chain node on a network without any validators.

!!! example

    ```bash
    teku --network=prater --metrics-enabled --rest-api-enabled --rest-api-docs-enabled
    ```

## Finding help

* The `#prater` channel on the Ethereum Foundation Discord. [Invite link](https://discord.gg/zyZXUN7)

* The `#teku` channel on the ConsenSys Discord. [Invite link](https://discord.gg/aT5TcBQ)

* Please raise any bugs or errors on the [Teku GitHub](https://github.com/Consensys/teku/issues) repository.

<!-- links -->
[Hyperledger Besu]: https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Install-Binaries/
[beacon chain client only]: #run-a-beacon-chain-client-only
[run the beacon chain client with validators]: #run-validators-on-a-testnet
[Metamask]: https://metamask.io/
[faucet]: https://faucet.goerli.mudit.blog/
[connect to Goerli]: https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Starting-node/#run-a-node-on-goerli-testnet
[password protected V3 Keystore file]: https://docs.ethsigner.consensys.net/Tutorials/Start-EthSigner/#create-password-and-key-files
[Infura]: https://infura.io/
[Launchpad]: https://prater.launchpad.ethereum.org/
[Prater Launchpad]: https://prater.launchpad.ethereum.org/
