---
description: How to connect to a testnet
---

# Connect to a testnet

The following instructions describe the process to connect Teku to an Ethereum 2.0 testnet.

!!! important

    This example connects to the [Witti testnet](https://github.com/goerli/Witti). Networks can
    experience stability issues and are prone to regular resets. We recommend you regularly
    check network and client documentation for updates.

**Prerequisites**:

* Install the latest version of Teku using a [binary distribution](Install-Binaries.md)
    or [from source](Build-From-Source.md).
* If running validators, install any Ethereum 1.0 client (for example [Hyperledger Besu]), or access a
    cloud-based service such as [Infura].

Teku allows you run a [beacon chain client only], or you can [run the beacon chain client
with validators] on a public testnet.

## Run a validator on a testnet

Each Ethereum 2.0 validator needs access an Ethereum 1.0 client to onboard new validators.
Validators make deposits into Ethereum 1.0, and existing Ethereum 2.0 validators must
process the deposits to allow the validators to join Ethereum 2.0.

Deposits are made into a deposit contract on the Goerli Ethereum 1.0 testnet.

The steps to run an Ethereum 2.0 validator on a testnet are:

1. If using a local Ethereum 1.0 client, [sync the Ethereum 1.0 network containing
    the deposit contract](#sync-the-ethereum-10-network).

    !!! note
        This step is only required if using a local Ethereum 1.0 client such as Besu.
        If using a cloud-based service such as Infura then proceed to
        [fund your deposit account](#load-the-deposit-account-with-eth).

1. [Fund the Ethereum 1.0 deposit account](#load-the-deposit-account-with-eth).

1. [Generate the validator key and send the deposit to the deposit
    contract](#send-the-validator-deposit).

1. [Start Teku with the validator key](#start-the-validator).

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

You need an Ethereum 1.0 account that contains the amount of ETH (plus gas) required to activate
the validator. The `witti` testnet requires 32 ETH, and the account must be on Goerli.

!!! tip

    You can create an account on Goerli using [Metamask], and use a [faucet] to fund the account.

You will need the private key of the Ethereum 1.0 account when sending the deposit to the
deposit contract. The private key can be stored in a [password protected V3 Keystore file].

### Generate the validator and send the deposit

Teku allows you to generate validator keys and send deposits to the deposit contract.

!!! example

    ```bash
    teku validator generate --network=witti \
    --eth1-endpoint=http://localhost:8545 --keys-output-path=validator_key \
    --encrypted-keystore-validator-password-file=./witti/password.txt \
    --encrypted-keystore-withdrawal-password-file=./witti/password.txt \
    --eth1-keystore-file=./witti/walletKey --eth1-keystore-password-file=./witti/password.txt \
    --number-of-validators=1
    ```

On the command line:

* Specify the network on which to generate the validator using
    [`--network`](../../Reference/CLI/CLI-Subcommands.md#network).

* Specify the endpoint for the Ethereum 1.0 network using
    [`--eth1-endpoint`](../../Reference/CLI/CLI-Subcommands.md#eth1-endpoint). If using a
    cloud-based service like [Infura], then set the endpoint to the supplied URL. For example.
    `https://goerli.infura.io/v3/<Project_ID>`

* Specify the location in which to create the encrypted validator and withdrawal key files using
    [`--keys-output-path`](../../Reference/CLI/CLI-Subcommands.md#keys-output-path).

    !!! note
        To create an unencryped file, set
        [`--encrypted-keystore-enabled`](../../Reference/CLI/CLI-Subcommands.md#encrypted-keystore-enabled)
        to `false`. However, this is not recommended in production.

* Specify the password of the encrypted validator and withdrawal key files using
    [`--encrypted-keystore-validator-password-file`](../../Reference/CLI/CLI-Subcommands.md#encrypted-keystore-validator-password-file)
    and [`--encrypted-keystore-withdrawal-password-file`](../../Reference/CLI/CLI-Subcommands.md#encrypted-keystore-withdrawal-password-file).
    If not set, then manually enter a password at the command line when prompted.

* Specify the encrypted Ethereum 1.0 deposit account private key
    using [`--eth1-keystore-file`](../../Reference/CLI/CLI-Subcommands.md#eth1-keystore-file).

    !!! note
        Use [`--eth1-private-key`](../../Reference/CLI/CLI-Subcommands.md#eth1-private-key) to specify
        the private key on the command line instead. However, this is insecure and therefore not
        recommended.

* Specify the file containing the password of the V3 keystore using
    [`--eth1-keystore-password-file`](../../Reference/CLI/CLI-Subcommands.md#eth1-keystore-password-file).

* Specify the number of validators to create using
    [`--number-of-validators`](../../Reference/CLI/CLI-Subcommands.md#number-of-validators).

It may take more than 8 hours for a deposit to become active.

!!! tip

    View the deposit details on Etherscan by visiting `https://goerli.etherscan.io/address/<accountPublicKey>`.

### Start the validator

Run Teku and specify the [validator key created earlier](#generate-the-validator-and-send-the-deposit).

!!! example

    ```bash
    teku --network=witti --eth1-endpoint=http://localhost:8545 \
    --validators-key-files=validator_key/validator_888eeef/validator_888eeef.json \
    --validators-key-password-files=./witti/password.txt \
    --rest-api-enabled=true --rest-api-docs-enabled=true \
    --metrics-enabled
    ```

Once the validator is activated, view it on the beacon chain explorer at
`https://witti.beaconcha.in/validator/<validatorPublicKey>`.

## Run a beacon chain client only

You can run a Teku beacon chain node on a network without any validators.

!!! example

    ```bash
    teku --eth1-enabled=false --network=witti \
    --metrics-enabled --rest-api-enabled --rest-api-docs-enabled
    ```

Since you do not need to load data from the Ethereum 1.0 network set the
[`--eth1-enabled`](../../Reference/CLI/CLI-Syntax.md#eth1-enabled) CLI option to
`false`.

## Add a beacon chain client to Eth2stats

You can add the beacon chain node to [Eth2stats](https://eth2stats.io/add-node) for monitoring.

Ensure you enable metrics using the
[`--metrics-enabled`](../../Reference/CLI/CLI-Syntax.md#metrics-enabled) option when
starting Teku.

<!-- links -->
[Hyperledger Besu]: https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Install-Binaries/
[beacon chain client only]: #connect-a-beacon-chain-client-only
[run the beacon chain client with validators]: #connect-and-run-validators
[Metamask]: https://metamask.io/
[faucet]: https://faucet.goerli.mudit.blog/
[connect to Goerli]: https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Starting-node/#run-a-node-on-goerli-testnet
[password protected V3 Keystore file]: https://docs.ethsigner.pegasys.tech/en/latest/Tutorials/Start-EthSigner/#create-password-and-key-files
[Infura]: https://infura.io/