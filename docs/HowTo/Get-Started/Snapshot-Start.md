---
description: How to start Teku using a recent finalized checkpoint state
---

# Start Teku from a recent state

You can start Teku from a recent finalized checkpoint state to avoid syncing a node from a
historic state.

When starting from a recent checkpoint, Teku downloads historic chain data in the background.

!!! important

    You need access to a beacon chain client with [REST API enabled] to download the finalized
    checkpoint state file.

The following example downloads a finalized checkpoint state file (`state.ssz`) from the beacon
chain client, and starts Teku with the downloaded file:

1. Download a recent finalized checkpoint state using the
    [`/eth/v1/debug/beacon/states/`](https://consensys.github.io/teku/#operation/getEthV1DebugBeaconStatesWithState_id) endpoint:

    ```bash
    curl -o state.ssz -H 'Accept: application/octet-stream' http://localhost:5051/eth/v1/debug/beacon/states/finalized
    ```

1. Start Teku with the [`--initial-state`](../../Reference/CLI/CLI-Syntax.md#initial-state) option:

     ```bash
     teku --eth1-endpoint=http://localhost:8545 --initial-state=state.ssz --validator-keys=/Users/me/mainnet/validator/keys:/Users/me/mainnet/validator/passwords
     ```

  <!--links-->
  [REST API enabled]: ../../Reference/CLI/CLI-Syntax.md#rest-api-enabled
