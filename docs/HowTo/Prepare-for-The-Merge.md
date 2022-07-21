---
description: How to prepare for The Merge
---

# Prepare for The Merge

If you're running one or more Teku beacon nodes and validators on Ethereum Mainnet, prepare for
[The Merge](../Concepts/Merge.md) by:

1. [Configuring the execution client](#configure-the-execution-client).
1. [Configuring the fee recipient](#configure-the-fee-recipient).
1. [Staying up to date on Teku releases](#update-teku).

You can make the configuration changes in Teku's [configuration file](Configure/Use-Configuration-File.md) before The Merge.

You can also
[test Teku with Hyperledger Besu on the Kiln Merge testnet](https://besu.hyperledger.org/en/stable/Tutorials/Merge-Testnet/).

## Configure the execution client

Before The Merge, validators require an [execution client](../Concepts/Merge.md#execution-clients) to get deposits for
block proposals.
Block proposals are intermittent, and a validator can get the data from other blocks if its execution client is offline.

After The Merge, execution clients will play a more crucial role in executing transactions.
Service providers that provide execution layer access, such as Infura, won't be adequate for a beacon node to continue
to function on the network.
You must set up an execution client for each beacon node you maintain, using the following steps.
You can use any execution client with Teku.

!!! note "Notes"

    - After The Merge, a beacon node won't be able to have a failover execution client; a validator client will need a
      beacon node and execution client pair to provide failover functionality.
    - When planning your solution, take into account that the traffic between the execution client and beacon node
      will be relatively high.

### 1. Configure the execution endpoint

Specify the execution client endpoint using [`ee-endpoint`](../Reference/CLI/CLI-Syntax.md#ee-endpoint) in the Teku
configuration file.
This can replace [`eth1-endpoint`](../Reference/CLI/CLI-Syntax.md#eth1-endpoint-eth1-endpoints).

!!! important

    After The Merge, you can't use `eth1-endpoint` to specify an external execution layer provider.
    This option will be replaced by specifying `ee-endpoint` for each beacon node.

### 2. Sync the execution client

Validators can't produce attestations or blocks without a fully synced execution endpoint.
To expedite network participation, sync your execution client on Ethereum Mainnet before the Merge configuration
(Bellatrix) comes online.

### 3. Configure the JSON Web Token

JSON Web Token (JWT) authentication is used to secure the communication between the beacon node and execution client.
You can generate a JWT using a command line tool, for example:

```bash
openssl rand -hex 32 > token.txt
```

Provide the JWT to Teku using the [`ee-jwt-secret-file`](../Reference/CLI/CLI-Syntax.md#ee-jwt-secret-file)
configuration option, and to the execution client using its configuration options.
For example, provide the JWT to [Hyperledger Besu](https://besu.hyperledger.org/) using the
[`engine-jwt-secret`](https://besu.hyperledger.org/en/stable/Reference/CLI/CLI-Syntax/#engine-jwt-secret) option.

## Configure the fee recipient

After The Merge, execution layer transactions will be included in beacon node blocks, and validators will earn
transaction fees.
You can configure the recipient of these fees for each validator key.

For simpler configurations, configure the beacon node (and validator client if
[run in a separate process](Get-Started/Run-Teku.md#run-the-clients-separately)) with a default fee recipient using
the [`validators-proposer-default-fee-recipient`](../Reference/CLI/CLI-Syntax.md#validators-proposer-default-fee-recipient)
option.
This fee recipient will be used for any duties performed by the beacon node.

For more complex configurations, provide a proposer configuration file that defines the default fee recipient plus
non-default fee recipients for any validators using the
[`validators-proposer-config`](../Reference/CLI/CLI-Syntax.md#validators-proposer-config) option.

A full consensus client (beacon node and validator client combined) can use either configuration option.
A stand-alone validator client should only specify `validators-proposer-config`, and its attached beacon node should
specify `validators-proposer-default-fee-recipient`.

## Update Teku

Once Bellatrix is scheduled for activation on Mainnet, Teku will be released with updated configuration for Mainnet.
Ensure your Teku client and execution client is up to date before Bellatrix is enabled.

You can follow Teku notifications by:

- Signing up to the [release announcements](https://pages.consensys.net/teku-sign-up) email list (release and important
  announcements only, no marketing).
- Following Teku on [Twitter](https://twitter.com/Teku_ConsenSys).
- Following the Teku channel in the ConsenSys [Discord](https://discord.gg/7hPv2T6).
- Subscribing to release notifications on GitHub for [Teku](https://github.com/ConsenSys/teku).
