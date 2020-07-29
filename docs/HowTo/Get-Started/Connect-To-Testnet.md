---
description: How to connect to a testnet
---

# Connect to a testnet

The following instructions describe the process to connect Teku to an Ethereum 2.0 testnet.

!!! important

    This example connects to the [Medalla testnet](https://github.com/goerli/medalla). Networks can
    experience stability issues and are prone to regular resets. We recommend you regularly
    check network and client documentation for updates.

**Prerequisites**:

* Install the latest version of Teku using a [binary distribution](Install-Binaries.md),
    [from source](Build-From-Source.md), or with [Docker](Run-Docker-Image.md).
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

1. [Generate the validator key and send the deposit to the deposit
    contract](#generate-the-validator-and-send-the-deposit).
    
    !!! note
        You can use the Medalla [Launchpad] to generate your keys and send the deposits, or you can
        use Teku. For convenience, we recommend using Teku if generating more than approximately 10
        validators.

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

You need an Ethereum 1.0 Goerli testnet account that contains the amount of
Goerli ETH (plus gas) required to activate the validator. The `medalla` testnet
requires 32 Goerli ETH per validator.

!!! tip

    You can create an account on Goerli using [Metamask], and use a [faucet] to
    fund the account. You can also request Goerli testnet ETH on the Medalla
    Discord channel.

If you use the [Launchpad] in the next step, then Metamask can handle your
Ethereum 1.0 account. Otherwise you will need the private key of the account
when sending the deposit to the deposit contract. The private key can be stored
in a [password protected V3 Keystore file].

### Generate the validator and send the deposit

!!! tip

    For small numbers of validators, we recommend using the Medalla [Launchpad]
    to generate your keys and send the deposits. For more than around 10
    validators, the workflow below is more convenient.

Teku allows you to generate validator keys and send deposits to the deposit contract.

!!! example

    ```bash
    teku validator generate-and-register --network=medalla \
    --eth1-endpoint=http://localhost:8545 --keys-output-path=validator_key \
    --encrypted-keystore-validator-password-file=./medalla/password.txt \
    --encrypted-keystore-withdrawal-password-file=./medalla/password.txt \
    --eth1-keystore-file=./medalla/walletKey --eth1-keystore-password-file=./medalla/password.txt \
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
    [`--keys-output-path`](../../Reference/CLI/CLI-Subcommands.md#keys-output-path_1).

    !!! note
        To create an unencryped file, set
        [`--encrypted-keystore-enabled`](../../Reference/CLI/CLI-Subcommands.md#encrypted-keystore-enabled_1)
        to `false`. However, this is not recommended in production.

* Specify the password of the encrypted validator and withdrawal key files using
    [`--encrypted-keystore-validator-password-file`](../../Reference/CLI/CLI-Subcommands.md#encrypted-keystore-validator-password-file_1)
    and [`--encrypted-keystore-withdrawal-password-file`](../../Reference/CLI/CLI-Subcommands.md#encrypted-keystore-withdrawal-password-file_1).
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
    [`--number-of-validators`](../../Reference/CLI/CLI-Subcommands.md#number-of-validators_1).

It may take more than 8 hours for a deposit to become active.

!!! tip

    View the deposit details on Etherscan by visiting `https://goerli.etherscan.io/address/<accountPublicKey>`.

### Start the validator

Run Teku and specify the validator key file [created earlier](#generate-the-validator-and-send-the-deposit).

!!! example

    ```bash
    teku --network=medalla --eth1-endpoint=http://localhost:8545 \
    --validators-key-files=validator_key/validator_888eeef/validator_888eeef.json \
    --validators-key-password-files=./medalla/password.txt \
    --rest-api-enabled=true --rest-api-docs-enabled=true \
    --metrics-enabled
    ```

!!! tip

    If you have multiple validator key files, list them comma-separated. You
    must also list one password file per validator key file even if it is the
    same. Using a [configuration file](../Configure/Use-Configuration-File.md)
    might be easier when managing many validators.

Once the validator is activated, view it on the beacon chain explorer at
`https://medalla.beaconcha.in/validator/<validatorPublicKey>`.

## Run a beacon chain client only

You can run a Teku beacon chain node on a network without any validators.

!!! example

    ```bash
    teku --network=medalla --metrics-enabled --rest-api-enabled --rest-api-docs-enabled
    ```

!!! note

    If you plan to run only a beacon node for Medalla, it is best to wait until
    after the genesis event on August the 4th, 2020 at 1300 UTC. This is
    because nothing happens on the network until then, and you require access to an Ethereum 1.0
    node.

    After Genesis, an Ethereum 1.0 node is no longer required if you are not running validators.

## Add a beacon chain client to Eth2stats

You can add the beacon chain node to [Eth2stats](https://eth2stats.io/add-node) for monitoring.

Ensure you enable metrics using the
[`--metrics-enabled`](../../Reference/CLI/CLI-Syntax.md#metrics-enabled) option when
starting Teku.

!!! note

    The Medalla testnet has not been added to Eth2Stats at the time of writing.
    Keep an eye on it so you can add your node later.

## Finding help

* The `#medalla` channel on the Ethereum Foundation Discord. [Invite link](https://discord.gg/zyZXUN7)

* The `#teku` channel on the ConsenSys Discord. [Invite link](https://discord.gg/aT5TcBQ)

* Please raise any bugs or errors on the [Teku GitHub](https://github.com/pegasyseng/teku/issues) repository.

<!-- links -->
[Hyperledger Besu]: https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Install-Binaries/
[beacon chain client only]: #run-a-beacon-chain-client-only
[run the beacon chain client with validators]: #run-validators-on-a-testnet
[Metamask]: https://metamask.io/
[faucet]: https://faucet.goerli.mudit.blog/
[connect to Goerli]: https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Starting-node/#run-a-node-on-goerli-testnet
[password protected V3 Keystore file]: https://docs.ethsigner.pegasys.tech/en/latest/Tutorials/Start-EthSigner/#create-password-and-key-files
[Infura]: https://infura.io/
[Launchpad]: https://medalla.launchpad.ethereum.org/
