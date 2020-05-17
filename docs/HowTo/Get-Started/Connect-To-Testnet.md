---
description: How to choose and connect to a testnet
---

# Connect to a testnet

**Prerequisites**:

* Install the latest version of Teku using a [binary distribution](Install-Binaries.md)
    or [from source](Build-From-Source.md).
* If running validators, [install Hyperledger Besu] to connect to an Ethereum 1.0 network.

!!! note
    Any Ethereum 1.0 client can be installed to connect to the Ethereum 1.0 network, but this
    example uses Besu.

Teku allows you run a [beacon chain client only], or you can [run the beacon chain client
with validators] on a public testnet.

!!! important

    This example connects to the [Schlesi testnet](https://github.com/goerli/schlesi). Networks can
    experience stability issues and are prone to regular resets. We recommend you regularly
    check network and client documentation for updates.


## Select a network

Teku allows you to select predefined networks with the
[`--network`](../../Reference/CLI/CLI-Syntax.md#network) CLI option.

Predefined networks can provide defaults such the initial state of the network,
bootnodes, and the address of the Ethereum 1.0 deposit contract.

## Run a validator on a testnet

Each Ethereum 2.0 validator needs access an Ethereum 1.0 client to onboard new validators.
Validators make deposits into Ethereum 1.0, and existing Ethereum 2.0 validators must see these
deposits and process them to enable the validators to join Ethereum 2.0.

The steps to run an Ethereum 2.0 validator on a testnet are:

1. [Sync Besu to the Ethereum 1.0 network containing
    the deposit contract](#sync-besu-to-the-ethereum-10-network).

1. [Load the validator deposit amount (plus gas) into
    your Ethereum 1.0  deposit account](#load-the-deposit-account-with-eth).

1. [Generate the validator key and send the deposit to the deposit
    contract](#send-the-validator-deposit).

1. [Start Teku with the validator key](#start-the-validator).

### Sync Besu to the Ethereum 1.0 network

The deposit contract for the testnets is located in the Goerli Ethereum 1.0 testnet.
Configure Besu to [connect to Goerli] and expose the RPC-HTTP APIs.

!!! example

    ```bash
    besu --network=goerli --data-path=./goerli --rpc-http-enabled=true --rpc-http-port=8545 \
    --rpc-http-api=ETH,NET,WEB3 --sync-mode=FAST --fast-sync-min-peers=2
    ```
    
### Load the deposit account with ETH

You need an Ethereum 1.0 account that contains at least 32 ETH (plus gas). For the
`schlesi` testnet you need an account on Goerli.

!!! tip
    
    You can create an account on Goerli using [Metamask], and use a [faucet] to fund the account.


### Generate the validator and send the deposit

Teku allows you to [generate validator keys and send deposits] to the deposit contract. 
Teku deposits 32 ETH by default, use the
[`--deposit-amount-gwei`](../../Reference/CLI/CLI-Subcommands.md#deposit-amount-gwei) option
to send an alternate amount.

!!! example

    ```bash
    teku validator generate --network=schlesi \
    --eth1-endpoint=http://localhost:8545 --keys-output-path=validator_key \
    --encrypted-keystore-validator-password-file=./schlesi/password.txt \
    --encrypted-keystore-withdrawal-password-file=./schlesi/password.txt \
    --eth1-keystore-file=./schlesi/walletKey --eth1-keystore-password-file=./schlesi/password.txt \
    --number-of-validators=1
    ```

In the command line:

* Specify the network on which to generate the validator using 
    [`--network`](../../Reference/CLI/CLI-Subcommands.md#network).
    
* Specify the endpoint for you Ethereum 1.0 network using
    [`--eth1-endpoint`](../../Reference/CLI/CLI-Subcommands.md#eth1-endpoint).
    
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

### Start the validator 

Run Teku and specify the [validator key created earlier](#generate-the-validator-and-send-the-deposit).

!!! example

    ```bash
    teku --network=schlesi --eth1-endpoint=http://localhost:8545 \
    --validators-key-files=validator_key/validator_888eeef/validator_888eeef.json \
    --validators-key-password-files=password.txt \
    --rest-api-enabled=true --rest-api-docs-enabled=true \
    --metrics-enabled
    ```

Once the validator is activated, view it on the beacon chain explorer at
`https://schlesi.beaconcha.in/validator/<validator_public_key>`.

## Run a beacon chain client only

You can run a Teku beacon chain node on a network without any validators.

!!! example

    ```bash
    teku --eth1-enabled=false --network=schlesi \
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
[install Hyperledger Besu]: https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Install-Binaries/
[beacon chain client only]: #connect-a-beacon-chain-client-only
[run the beacon chain client with validators]: #connect-and-run-validators
[Metamask]: https://metamask.io/
[faucet]: https://faucet.goerli.mudit.blog/
[generate validator keys and send deposits]: https://docs.teku.pegasys.tech/en/latest/HowTo/Get-Started/Register-Validators/#submit-deposits
[connect to Goerli]: https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Starting-node/#run-a-node-on-goerli-testnet