# Preparing for the Merge

## Overview
'The Merge' is the process where Ethereum changes from a proof of work network, to a proof of stake consensus network.

It's been described anecdotally as 'switch engines in the car from gas to electric while going 90 down the freeway'.

## What to expect
The consensus layer client (previously eth2 client, eg. Teku, Lighthouse, Prysm, Nimbus, loadstar) will have configuration defined to instruct it to start listening for a certain terminal difficulty to be reached on the eth1 endpoint.

Once that difficulty is reached, eth1 will then become the execution layer of Ethereum, and the consensus layer will be responsible for progressing the chain.

The consensus layer will enable Bellatrix (the merge configuration) prior to the terminal difficulty being reached, then it is up to eth1 blocks to reach the pre-determined difficulty, then from that point Ethereum moves to a proof of stake network.

Post merge, as well as validators earning rewards for performing duties, there are also earnings from the inclusion of execution layer transactions, and these earnings are directed to a fee recipient address on the execution layer. Other rewards such as attestation and block rewards will continue to be paid to the validator's balance on the beacon chain.

## Execution Engine

Pre-merge, an eth1-client is required for block proposal to get deposits for validators. They're intermittent, and you get the data from other blocks if your eth1 client is offline for some reason.

Once the merge is complete, the execution engine becomes much more heavily relied upon for execution. It will be no longer viable for an external provider to be referenced, each beacon-node will need to be closely associated with an execution engine (eth1 client).

Each beacon-node will require its own execution-engine, so if you are maintaining multiple beacon-nodes, you will need to set up an execution-engine for each beacon-node. Service providers that provide eth1 access will not be adequate for a beacon-node to continue to function on the network.

To configure the execution-engine for teku, the [ee-endpoint](https://docs.teku.consensys.net/en/latest/Reference/CLI/CLI-Syntax/#ee-endpoint) will need to be set in teku configuration. this can be done prior to the merge block, and can replace [eth1-endpoint](https://docs.teku.consensys.net/en/latest/Reference/CLI/CLI-Syntax/#ee-endpoint).

JWT authentication is used to secure the communication between beacon-node and execution engine. This can be generated through the use of a command line tool, for example:
```
openssl rand -hex 32 -out <file>
```

The JWT token will then be provided to teku with [ee-jwt-secret-file](https://docs.teku.consensys.net/en/latest/Reference/CLI/CLI-Syntax/#ee-jwt-secret-file), and also provided to the chosen execution-endpoint through its configuration options.

Teku configuration changes will look similar to:
```
< eth1-endpoint: "http://eth1endpoint:8545/"
---
> ee-endpoint: "http://localhost:8550/"
> ee-jwt-secret-file: "secret.hex"
```

The execution-endpoint requirements depends on the client used, and there is no requirement to use any particular eth1 client. The traffic between execution endpoint and the  beacon-node will be relatively high, so that should be taken into account when planning your solution.

Prior to Bellatrix coming online, all eth1 clients required for use as an execution-engine should be sync'd on mainnet so that this does not delay network participation. Validators are not able to produce attestations or blocks without an execution-endpoint that is fully synchronized.

## Fee recipient
Once the merge transition completes and execution layer transactions are included in beacon node blocks, transaction fees will start being earned by validators.  The recipient of these fees will be the defined fee recipient, and can be configured for each validator key.

For simpler configurations, all that is needed is for the beacon-node to be configured with a default fee recipient via [validators-proposer-default-fee-recipient](https://docs.teku.consensys.net/en/latest/Reference/CLI/CLI-Syntax/#validators-proposer-config). This fee recipient will then be used for any duties performed by the beacon-node.
More complex configurations are able to provide a configuration file that defines the default fee recipient, plus fee recipients for any validators that use a fee recipient other than the default with [validators-proposer-config](https://docs.teku.consensys.net/en/latest/Reference/CLI/CLI-Syntax/#validators-proposer-config).

 
## Update teku

Once a block has been determined for Bellatrix on mainnet, teku will be updated to contain that in the mainnet network settings built with the release. Clients should ensure they are up to date prior to the time that Bellatrix gets enabled.

Stay up to date with release notifications for teku and your eth1 client. Teku notifications are available via:
 - Sign up to [release announcements](https://pages.consensys.net/teku-sign-up) email list (release and important announcements only, no marketing)
 - Follow us on [Twitter](https://twitter.com/Teku_ConsenSys)
 - `teku` in Consensys [Discord](https://discord.gg/7hPv2T6)
 - Subscribe to release notifications on github for [teku](https://github.com/ConsenSys/teku)


