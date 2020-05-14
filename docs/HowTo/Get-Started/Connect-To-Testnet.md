---
description: How to choose and connect to a testnet
---

# Connect to a testnet

**Prerequisites**:

* Install the latest version of Teku using a [binary distribution](Install-Binaries.md)
    or [from source](Build-From-Source.md).
* If running validators, [install Hyperledger Besu] to connect to an Ethereum 1.0 network.

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

The steps to run an Ethereum 2.0 validator on a testnet are:

1. [Sync Besu to the Ethereum 1.0 network containing
    the deposit contract](#sync-besu-to-the-ethereum-10-network).

1. [Load the validator deposit amount (plus gas) into
    your Ethereum 1.0  deposit account](#load-the-deposit-account-with-eth).

1. [Generate the validator key and send the deposit to the deposit
    contract](#send-the-validator-deposit).

1. [Start Teku with the validator key](#start-the-validator).

### Sync Besu to the Ethereum 1.0 network

The deposit contract for the `schlesi` and `topaz` testnets is located in the
Goerli Ethereum 1.0 testnet. Configure Besu to [connect to Goerli] and expose the RPC-HTTP APIs.

!!! example

    ```bash
    besu --network=goerli --data-path=./goerli --rpc-http-enabled=true --rpc-http-port=8545 \
    --p2p-port=30404 --rpc-http-api=ETH,NET,WEB3 --sync-mode=FAST --fast-sync-min-peers=2
    ```

!!! note
    Teku and Besu currently share the same default P2P port number (30303). Update the Besu
    `--p2p-port` option accordingly.
    
### Load the deposit account with ETH

You need an Ethereum 1.0 account that contains at least 32 ETH (plus gas). For the
`schlesi` testnet you need an account on Goerli.

!!! tip
    
    You can create an account on Goerli using [Metamask], and use a [faucet] to fund the account.


### Send the validator deposit

Teku allows you to [generate validator keys and send deposits] to the deposit contract.

!!! example

    ```bash
    teku validator generate --network=schlesi \
    --eth1-endpoint=http://localhost:8545 --encrypted-keystore-enabled=false \
    --keys-output-path=validator_key \
    --eth1-private-key=c645f4fde391ef45f26c877787c14c0557a9d83446280b957f7f9f12441c4af6 \
    --number-of-validators=1
    ```
It may take more than 8 hours for a deposit to become active.

### Start the validator 

Run Teku and specify the validator key

!!! example

    ```bash
    teku --network=schlesi --eth1-endpoint=http://localhost:8545 \
    --validators-key-file=validator_key \
    --rest-api-enabled=true --rest-api-docs-enabled=true \
    --metrics-enabled
    ```

## Run a beacon chain client only

You can run a Teku beacon chain node on a network without any validators.

!!! example

    ```bash
    teku --eth1-enabled=false --network=schlesi \
    --metrics-enabled --rest-api-enabled --rest-api-docs-enabled
    ```

If you do not need to load data from the Ethereum 1.0 network set the
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