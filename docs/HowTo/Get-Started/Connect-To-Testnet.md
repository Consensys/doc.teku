---
description: How to choose and connect to a testnet
---

# Connect to a Testnet

The PegaSys Teku client allows you to connect a beacon-chain node to a public testnet and run validators on these networks. There are different ETH2 testnets to choose from.

!!! important

    Due to the fast pace of client and testnet development, this guide recommends connecting to the [Schlesi Testnet](https://github.com/goerli/schlesi). However, networks can experience stability issues and are prone to regular resets. It's recommended to regularly check the network's and client's documentation for updates.

**Prerequisites**:

* [Install Teku](/HowTo/Get-Started/Install-Binaries.md) Ethereum 2.0 client or [Build Teku from Source](/HowTo/Get-Started/Build-From-Source.md).

Teku allows to select preconfigured networks with the `--network` flag:

```bash tab="Syntax"
-n, --network=<NETWORK>
```

```bash tab="Command Line"
--network=mainnet
```

```bash tab="Environment Variable"
TEKU_network=mainnet
```

Represents which network to use.
The default is `minimal`.

Available options are: `minimal`, `mainnet`, `topaz`, and `schlesi`:

* `minimal` is an ETH2 network configuration preset used for local testing and dev-nets.
* `mainnet` is an ETH2 network configuration preset used for more dedicated test network setups targeting a future mainnet config.
* `topaz` is a pre-configured single-client testnet maintained by the Prysmatic Labs team.
* `schlesi` is a pre-configured multi-client testnet maintained by the Goerli Testnet Initiative.

!!! tip

    If you don't know which network to pick, choose `--network=schlesi`.

## Connect to Schlesi Testnet

* Name: `schlesi-v0-11`
* Scope: multi-client testnet
* ETH2 Spec version: `v0.11.2`
* Teku version: `master`

The Schlesi Testnet is a multi-client testnet used by developers and users of many different ETH2 clients. It implements version `v0.11.2` of the ETH2 specification and tries to be compatible with all ETH2 clients including Teku.

Teku can connect a beacon-chain node to the Schlesi Testnet and synchronize the chain. Connecting Teku to Schlesi requires the latest `master` version of Teku.

!!! note

    Note, that building from `master` might come with certain instability and features may break without prior warning.

Simply pass the `--network=schlesi` command-line flag to Teku.

!!! example

    ```
    teku --network=schlesi
    ```

## Connect to other Testnets

Under certain circumstances it's possible to connect to other public testnets.

### Prysm Topaz Testnet

* Name: `topaz`
* Scope: single-client testnet (Prysm)
* ETH2 Spec version: `v0.11.1`
* Teku version: _N/A_

Prysm is an ETH2 client written in Go. The _Topaz Testnet_ is the public single-client testnet mainly used by Prysm developers and users. It implements version `v0.11.1` of the ETH2 specification.

Due to a slight diversion from the ETH2 specification in attestation rewards and penalty calculations, it's currently _not_ possible to connect a Teku node to the Topaz Testnet. However, Teku includes a pre-configuration `--network=topaz` for testing purposes.

### Lighthouse Testnet 5

* Name: `testnet5`
* Scope: single-client testnet (Lighthouse)
* Spec version: `v0.10.1`
* Teku version: [`v0.10.0`](https://github.com/PegaSysEng/teku/releases/tag/0.10.0)

Lighthouse is an ETH2 client written in Rust. The _Testnet 5_ is the public single-client testnet mainly used by Lighthouse developers and users. It implements version `v0.10.1` of the ETH2 specification.

It's possible to connect a Teku beacon-chain node to the Testnet 5 and synchronize the chain. Connecting Teku to Testnet 5 requires the pinned version [`v0.10.0`](https://github.com/PegaSysEng/teku/releases/tag/0.10.0) of Teku. Any version after the `v0.10.0` tag targets an updated version of the ETH2 spec and won't be able to connect to the Testnet 5.

Teku does not contain a preset for Testnet 5. The necessary configuration can be found in the [eth2-testnets repository on Github](https://github.com/eth2-clients/eth2-testnets/tree/master/lighthouse/testnet5).

## Enable an ETH1 Connection

**Prerequisites**:

* [Install Hyperledger Besu](https://besu.hyperledger.org/en/latest/HowTo/Get-Started/Install-Binaries) Ethereum 1.0 client in addition to the Teku Ethereum 2.0 client.

The deposit contract for Schlesi and Topaz are deployed to the _Goerli_ ETH1 testing network. To enable an ETH1 connection on Teku, configure Hyperledger Besu to connect to the Goerli testnet and expose the RPC-HTTP APIs:

```bash
besu --network=goerli \
--rpc-http-enabled=true \
--rpc-http-port=8545 \
--rpc-http-api=ETH,NET,WEB3
```

Once you have a local Goerli node running with an activated RPC-HTTP API, you can connect Teku to it by enabling `--eth1-enabled`.

!!! example

    ```
    teku --network=schlesi --eth1-enabled --eth1-endpoint=localhost:8545
    ```

!!! tip

    See also: [Hyperledger Besu - Run a node on Goerli testnet](https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Starting-node/#run-a-node-on-goerli-testnet)

## Boostrap a new Testnet

If you already have created a custom testnet or plan to do so, Teku allows you to pass different configurations to the beacon-chain node. A custom network requires a couple of things:

* A network configuration that can be either one of the `minimal` or `mainnet` presets, or a custom `yaml` file containing the network specification.
* An `ssz` genesis state or information about the ETH1 deposit contract.
* Eventually bootnodes to allow other users to connect to your network.

**Network configuration**:

The network configuration can be either of the presets `minimal` and `mainnet` or a `yaml` file. The custome configuration file can be passed as local file or remote config fetched via HTTP, e.g.:

* `--network="minimal"`
* `--network="mainnet"`
* `--network="./path/to/chain.yaml"`
* `--network="https://github.com/goerli/schlesi/raw/master/teku/chain.yaml"`

!!! example

    ```
    teku --network="https://github.com/goerli/schlesi/raw/master/teku/chain.yaml"
    ```

**Deposit Contract**:

The deposit contract is a deployed instance of the [`validator_registration.vy`](https://github.com/ethereum/eth2.0-specs/blob/dev/deposit_contract/contracts/validator_registration.vy) on an ETH1 network of your choice.

`--eth1-deposit-contract-address="0xaa888248144bc5d584a7f400839d0d912f21c39a"`

!!! tip

    See also: [How to run your own Beacon Chain](https://dev.to/q9/how-to-run-your-own-beacon-chain-e70)

Note, that reading the deposit contract requires an enabled ETH1 connection, e.g.:

`--eth1-enabled --eth1-endpoint="localhost:8545"`

!!! example

    ```
    teku --network="minimal" --eth1-deposit-contract-address="0xaa888248144bc5d584a7f400839d0d912f21c39a" --eth1-enabled --eth1-endpoint="localhost:8545"
    ```

**Genesis State**:

In case the genesis state is already known and available, instead of passing an deposit contract, the initial state can be provided:

* `--initial-state="./path/to/genesis.ssz"`
* `--initial-state="https://github.com/goerli/schlesi/raw/master/teku/genesis.ssz"`

No ETH1 connection is required in case the genesis state is available.

!!! example

    ```
    teku --network="minimal" --initial-state="https://github.com/goerli/schlesi/raw/master/teku/genesis.ssz"`
    ```

**Bootstrap Nodes**:

To allow other developers and users to connect to your custom testnet, you can provide bootstrap nodes and static peers.

* `--p2p-discovery-bootnodes="enr:-LK4QFO0gKFieMiNrUystSk5Xt7DmIgusloLudv-gH8Krjw9SsUDZRk---H-3hwvL9rMfsMcZwU6L5ezK2d1_dG0UgECh2F0dG5ldHOIAAAAAAAAAACEZXRoMpCZJe_WAAAAAP__________gmlkgnY0gmlwhDMPd52Jc2VjcDI1NmsxoQPNb3TG-iN0aGTagN4peO0SEkWKklJOvloWL0He8pnB_4N0Y3CCJRyDdWRwgiUc"`
* `--p2p-static-peers="/ip4/51.15.119.157/tcp/9000/p2p/16Uiu2HAkvLCWwVEfF365ZWXB6siDL1mUpcd1XQ1nSXAHmvM5W7wn"`

If the number of command-line arguments becomes confusing, it's recommended to [Use a Configuration File](HowTo/Configure/Use-Configuration-File.md).

!!! example

    ```
    teku --config-file my-new-testnet.yaml --p2p-static-peers="/ip4/51.15.119.157/tcp/9000/p2p/16Uiu2HAkvLCWwVEfF365ZWXB6siDL1mUpcd1XQ1nSXAHmvM5W7wn" --p2p-discovery-bootnodes="enr:-LK4QFO0gKFieMiNrUystSk5Xt7DmIgusloLudv-gH8Krjw9SsUDZRk---H-3hwvL9rMfsMcZwU6L5ezK2d1_dG0UgECh2F0dG5ldHOIAAAAAAAAAACEZXRoMpCZJe_WAAAAAP__________gmlkgnY0gmlwhDMPd52Jc2VjcDI1NmsxoQPNb3TG-iN0aGTagN4peO0SEkWKklJOvloWL0He8pnB_4N0Y3CCJRyDdWRwgiUc"
    ```
