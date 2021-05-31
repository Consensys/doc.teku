---
description: How to start Teku using a recent finalized checkpoint state
---

# Start Teku from a recent state

To get Teku up and running in only a few minutes, you can start Teku from a recent finalized
checkpoint state rather than syncing from genesis.

When starting from a recent checkpoint, Teku downloads historic chain data in the background.

!!! important

    You need access to a beacon chain client with [REST API enabled] (for example Teku) to download the 
    finalized checkpoint state file.

The following command downloads a recent finalized checkpoint state from a beacon chain client, and
starts Teku:

```bash
teku --eth1-endpoint=http://localhost:8545 \
--validator-keys=/Users/me/mainnet/validator/keys:/Users/me/mainnet/validator/passwords \
--initial-state=http://other-node:5051/eth/v1/debug/beacon/states/finalized
```

The command uses the [`--initial-state`](../../Reference/CLI/CLI-Syntax.md#initial-state) option
to download the finalized checkpoint state from the
[`/eth/v1/debug/beacon/states/`](https://consensys.github.io/teku/#operation/getEthV1DebugBeaconStatesWithState_id) endpoint
on the beacon chain client (for example Teku).

!!! note

    You can also download a finalized checkpoint state file, and specify the location
    using the [`--initial-state`](../../Reference/CLI/CLI-Syntax.md#initial-state) option. To
    download the file and name it `state.ssz` run:

    ```bash
    curl -o state.ssz -H 'Accept: application/octet-stream' http://other-node:5051/eth/v1/debug/beacon/states/finalized
    ```
    [Infura](https://infura.io/) provides initial state endpoints for free.
    Registration to Infura services is required.
    Watch the ("Teku Snapshot Sync from Infura" video)[https://youtu.be/ce9uVRl23zI] for more details.

<!--links-->
[REST API enabled]: ../../Reference/CLI/CLI-Syntax.md#rest-api-enabled
