---
description: How to connect to a builder endpoint
---

# Connect to a builder endpoint

You can connect a [builder endpoint](../Concepts/Builder-Endpoint.md) to generate execution
payloads for the [consensus client](../Concepts/Merge.md#consensus-clients).

New blocks are recommended by the builder and validated by consensus client.
You can [configure an endpoint](#configure-an-endpoint) and [monitor logging](#monitor-logging).

## Configure an endpoint

To configure a builder endpoint, specify the following options:

* [enable blinded block production](#enable-blinded-block-production)
* [specify the builder endpoint](#specify-the-builder-endpoint)
* [register the validator ](#register-the-validator)

### Enable blinded block production

Enable blinded block production using the command line option [`--validators-proposer-blinded-blocks-enabled`](../Reference/CLI/CLI-Syntax.md#validators-proposer-blinded-blocks-enabled)

!!! note

    If [--validators-builder-registration-default-enabled](../Reference/CLI/CLI-Syntax.md#validators-builder-registration-default-enabled) is set to true, then `--validators-proposer-blinded-blocks-enabled` is automatically enabled, so you don't need to set it explicitly.

### Specify the builder endpoint

Specify the builder endpoint using [`--builder-endpoint`](../Reference/CLI/CLI-Syntax.md#builder-endpoint)

```bash
--builder-endpoint="https://builder-relay-sepolia.flashbots.net/"
```

The following builder relay endpoints are live and can be used for testing.

| Network | Endpoint |
|:--------|:-------:|
| Kiln    | https://builder-relay-kiln.flashbots.net/    |
| Ropsten | https://builder-relay-ropsten.flashbots.net/ |
| Sepolia | https://builder-relay-sepolia.flashbots.net/ |

You can also use middleware like [`mev-boost`](https://github.com/flashbots/mev-boost):

```bash
--builder-endpoint=http://127.0.0.1:18550
```

### Register the validator

You must register your validator with the builder before proposing a block. 
Enable registration for all validators using [`--validators-builder-registration-default-enabled`](../Reference/CLI/CLI-Syntax.md#validators-builder-registration-default-enabled)

To enable registration for specific validators only, use a [proposer configuration](../Reference/CLI/CLI-Syntax.md#validators-proposer-config)
and specify the enabled validators in the `proposer_config`.

!!! example "Example proposer configuration"

    ```bash
    {
      "proposer_config": {
        "0xa057816155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a": {
          "fee_recipient": "0x50155530FCE8a85ec7055A5F8b2bE214B3DaeFd3",
          "builder": {
            "enabled": true,
            "gas_limit": "12345654321"
          }
        }
      },
      "default_config": {
        "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A",
        "builder": {
          "enabled": false
        }
      }
    }
    ```
    In this example, validator `0xa057816...` is registered with the builder, but validator `0x6e35733...` is not.

!!! note

    If you use a proposer configuration, you must enable blinded block production using [`--validators-proposer-blinded-blocks-enabled`](../Reference/CLI/CLI-Syntax.md#validators-proposer-blinded-blocks-enabled)

### Example builder configurations

!!! example "Solo staker, validator client and beacon node in a single process"

    ```bash
    teku --validators-proposer-default-fee-recipient="0x6e35733c5af9B61374A128e6F85f553aF09ff89A" --ee-endpoint="http://127.0.0.1:8551" --ee-jwt-secret-file="/etc/jwt-secret.hex" --validators-builder-registration-default-enabled=true --builder-endpoint="http://127.0.0.1:18550"
    ```

!!! example "Validator client and beacon node in separate processes"

    Validator client parameters
    ```bash
    Teku validator-client --validators-proposer-blinded-blocks-enabled=true --validators-proposer-config="/etc/teku/proposerConfig.json"
    ```

    Proposer configuration
    ```bash
    {
      "proposer_config": {
        "0xa057816155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a": {
          "fee_recipient": "0x50155530FCE8a85ec7055A5F8b2bE214B3DaeFd3",
          "builder": {
            "enabled": false
          }
        }
      },
      "default_config": {
        "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A",
        "builder": {
          "enabled": true
        }
      }
    }
    ```

    Beacon node paramaters
    ```bash
    Teku --validators-proposer-default-fee-recipient="0x6e35733c5af9B61374A128e6F85f553aF09ff89A" --ee-endpoint="http://127.0.0.1:8551" --ee-jwt-secret-file="/etc/jwt-secret.hex" --builder-endpoint="http://127.0.0.1:18550"
    ```

## Monitor logging

Whenever the beacon node receives a [BuilderBid](https://github.com/ethereum/builder-specs/blob/440113761fe692bef23b2e507162bd96c6087745/specs/builder.md), it is logged.

```bash
INFO  | ExecutionLayerManagerImpl | Received Builder Bid (Block Number = 622344, Block Hash = 0x7bfb24a2c4f54524e41af074557684e0ab17391af425ef23268640dace637954, MEV Reward (wei) = 105000000147000, Gas Limit = 29999972, Gas Used = 21000)

```

If the builder goes down while Teku is running, a warning is logged.
If the builder is still down during proposing, block production duty falls back to the execution client.

```bash
WARN  | teku-event-log | The execution builder is offline: <error-message>. Block production will fallback to the execution engine.

```

At the beginning of every epoch, the validator client sends validator registrations to the beacon node,
which forwards them to the builder network.

```bash
INFO | validator-async-0 | 2500 out of 2500 validator(s) registrations were successfully sent to the Beacon Node.
```

In case of error during registration, the error is logged.
Note some registrations may still have succeeded, because they are sent in batches.

```bash
INFO | validator-async-3 | 500 out of 2500 validator(s) registrations were successfully sent to the Beacon Node.
ERROR | validator-async-3 | Validator   *** Failed to send validator registrations to Beacon Node
java.util.concurrent.CompletionException:java.util.concurrent.CompletionException...............
```
