---
description: How to connect to Mainnet
---

# Connect to Mainnet

!!! note

    The execution layer was formerly called "Eth 1.0". The consensus layer was formerly called "Eth 2.0".
    For more information on the name change, refer to the [Ethereum Foundation update](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

The following instructions provide the steps run validators on the consensus layer Mainnet. You can
also use Teku to run a [beacon node only].

!!! warning

    If staking funds on the network, the funds are locked until transfers are enabled in a
    future phase of the consensus layer network.

Use the [validator checklist] as a guide to secure your validator keys and hardware.

**Prerequisites**:

* Install the latest stable version of Teku using a [binary distribution](../Installation-Options/Install-Binaries.md),
    or with [Docker](../Installation-Options/Run-Docker-Image.md).
* If running validators, install any execution layer client (for example [Hyperledger Besu]), or access a
    cloud-based service such as [Infura].

## Run validators on Mainnet

Consensus layer validators need to access an execution layer client to onboard new validators.
New validators make deposits into the execution client, and existing consensus layer validators must
process the deposits to allow the new validators to join the consensus layer.

Deposits are made into a deposit contract on the execution layer Mainnet. The deposit contract address
is `0x00000000219ab540356cbb839cbe05303d7705fa`.

The steps to run an consensus layer validator on Mainnet are:

1. If running your own execution client, [sync the execution network containing
    the deposit contract](#sync-the-execution-layer-network).

    !!! note
        This step is only required if running your own execution client such as Besu.
        If using a cloud-based service such as Infura, proceed to
        [sync the beacon node](#sync-the-beacon-node).

1. [Sync the Teku beacon node with the beacon chain](#sync-the-beacon-node).

1. [Generate the validator keys and send the deposit to the deposit
    contract](#generate-the-validators-and-send-the-deposits).

1. [Create a password file for each validator key](#create-a-password-file-for-each-validator-key).

1. [Start Teku with the validator keys](#start-the-validator).

### Sync the execution layer network

This step is only required if running your own execution client.

This example uses Besu to connect to execution, but any client can be used.
Configure Besu to [connect to Mainnet] and expose the RPC-HTTP APIs.

!!! example

    ```bash
    besu --rpc-http-enabled=true --rpc-http-port=8545 \
    --rpc-http-api=ETH,NET,WEB3 --fast-sync-min-peers=2
    ```

### Sync the beacon node

Sync the beacon node to ensure the network is synced before registering the validator.

!!! note

    Before network launch there will be no data to sync.

!!! example

    ```bash
    teku --metrics-enabled --rest-api-enabled
    ```

Syncing is complete when the head slot reaches the current slot.

### Generate the validators and send the deposits

!!! important

    Ensure your Ethereum account has enough ETH to cover the required deposit amount (32 ETH) plus
    gas.

Use the [Ethereum Skating Launchpad] to guide you through a step-by-step process to generate your keys and
send the deposits.

!!! note
    Remember the passwords that you used to create the validator keys, because you need it to
    [create the validator password files](#create-a-password-file-for-each-validator-key).

### Create a password file for each validator key

For each validator key, create a text file containing the password to decrypt the key.

Teku allows you to specify individual keys and passwords in the command line, or you can specify
folders from which to load keys and passwords. If specifying folders, then password files
must have the same name as the keys, but use the `.txt` extension.

!!! example

    If the Launchpad creates a key named `keystore-m_12381_3600_0_0_0-1596485378.json`, then
    the password file must be named `keystore-m_12381_3600_0_0_0-1596485378.txt`.

!!! info

    The password file format follows [`EIP-2335`](https://eips.ethereum.org/EIPS/eip-2335#password-requirements)
    requirements (UTF-8 encoded file, unicode normalization, and control code removal).

### Start the validator

You can run the Teku validator as a [single process] with the beacon node, or you can run the
validator client on a [separate machine].

!!! important

    If running validators as a split process, then connect the validator to the running
    beacon node. Otherwise you need to stop the [running beacon] node and restart it by supplying
    the validator keys.

Once the validator is activated, view it on the beacon chain explorer at
`https://beaconcha.in/validator/<validatorPublicKey>`.

You can also use [Prometheus and Grafana] to monitor your nodes.

#### Run the validator and beacon node as a single process

To run the beacon node and validator client as a single process, stop the [running beacon node]
started previously, and restart it by specifying the validator key files
[created earlier](#generate-the-validators-and-send-the-deposits), and the text files containing the
password to decrypt the validator key.

!!! example

    ```bash
    teku --eth1-endpoint=http://localhost:8545 \
    --validator-keys=validator/keys/validator_888eef.json:validator/passwords/validator_888eef.txt \
    --rest-api-enabled=true --rest-api-docs-enabled=true \
    --metrics-enabled
    ```

Alternatively, use [`--validator-keys`](../../../Reference/CLI/CLI-Syntax.md#validator-keys) to
specify the directory to load multiple keys and passwords from.

!!! example

    ```bash
    teku --eth1-endpoint=http://localhost:8545 \
    --validator-keys=validator/keys:validator/passwords \
    --rest-api-enabled=true --rest-api-docs-enabled=true \
    --metrics-enabled
    ```

#### Run the validator on a separate machine

If running the validator client on a separate machine to the beacon node, then run Teku using the
[`vc`](../../../Reference/CLI/Subcommands/Validator-Client.md) or
[`validator-client`](../../../Reference/CLI/Subcommands/Validator-Client.md) subcommand, and specify
the location of the beacon node's API endpoint using
[`--beacon-node-api-endpoint`](../../../Reference/CLI/Subcommands/Validator-Client.md#beacon-node-api-endpoint).

You also need to specify the validator key files [created earlier](#generate-the-validators-and-send-the-deposits),
and the text files containing the password to decrypt the validator key.

!!! example

    ```bash
    teku validator-client --beacon-node-api-endpoint=http://192.10.10.101:5051 \
    --validator-keys=validator/keys/validator_888eef.json:validator/passwords/validator_888eef.txt
    ```
Alternatively, use [`--validator-keys`](../../../Reference/CLI/Subcommands/Validator-Client.md#validator-keys)
to specify the directory to load multiple keys and passwords from.

!!! example

    ```bash
    teku validator-client --beacon-node-api-endpoint=http://192.10.10.101:5051 \
    --validator-keys=validator/keys:validator/passwords
    ```

<!-- links -->
[connect to Mainnet]: https://besu.hyperledger.org/en/latest/HowTo/Get-Started/Starting-node/#run-a-node-on-ethereum-mainnet
[Ethereum Staking Launchpad]: https://launchpad.ethereum.org/
[validator checklist]: https://launchpad.ethereum.org/checklist
[running beacon]: #sync-the-beacon-node
[single process]: #run-the-validator-and-beacon-node-as-a-single-process
[separate machine]: #run-the-validator-on-a-separate-machine
[Hyperledger Besu]: https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Install-Binaries/
[Infura]: https://infura.io/
[beacon node only]: #sync-the-beacon-node
[running beacon node]: #sync-the-beacon-node
[Prometheus and Grafana]: ../../Monitor/Metrics.md
