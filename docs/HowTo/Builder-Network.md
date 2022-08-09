---
description: How to connect to a builder network
---

# Connect to a builder network

You can connect a [builder network](../Concepts/Builder-Network.md) to generate execution
payloads for the [consensus client](../Concepts/Merge.md#consensus-clients).

The builder recommends new blocks that are validated by the consensus client.
If the builder goes down, the local execution client proposes a block instead.

## Configure an endpoint

To configure a builder endpoint:

* [enable blinded block production](#enable-blinded-block-production)
* [specify the builder endpoint](#specify-the-builder-endpoint)
* [register the validator](#register-the-validator)

### Enable blinded block production

Enable blinded block production using the [`--validators-proposer-blinded-blocks-enabled`](../Reference/CLI/CLI-Syntax.md#validators-proposer-blinded-blocks-enabled) command line option.

!!! note

    If [--validators-builder-registration-default-enabled](../Reference/CLI/CLI-Syntax.md#validators-builder-registration-default-enabled) is set to true, then `--validators-proposer-blinded-blocks-enabled` is automatically enabled, so you don't need to set it explicitly.

### Specify the builder endpoint

Specify the builder endpoint using [`--builder-endpoint`](../Reference/CLI/CLI-Syntax.md#builder-endpoint)

```bash
--builder-endpoint="https://builder-relay-sepolia.flashbots.net/"
```

View the [list of relay endpoints](https://github.com/flashbots/mev-boost#usage) for available endpoints.

You can also use external software such as [MEV-Boost](https://github.com/flashbots/mev-boost) to connect to multiple relays:

```bash
--builder-endpoint=http://127.0.0.1:18550
```

### Register the validator

You must register your validator with the builder before proposing a block.
Enable registration for all validators using [`--validators-builder-registration-default-enabled`](../Reference/CLI/CLI-Syntax.md#validators-builder-registration-default-enabled)

To enable registration for specific validators only, use the
[--validators-proposal-config](../Reference/CLI/CLI-Syntax.md#validators-proposer-config) option
and specify the enabled validators in the `proposer_config` of the proposer configuration JSON file.

Note the `default_config` applies to all validators who don't have their own proposer configuration.

!!! example "`proposerConfig.json`"

    ```json
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
        "fee_recipient": "0x6e35733c5af9B61374A128e6F85f553aF09ff89A"
        "builder": {
          "enabled": false,
        }
      }
    }
    ```

    In this example, validator `0xa057816...` is registered with the builder,
    but any validator using the default configuration is not.

!!! note

    If you use a proposer configuration, you must enable blinded block production using [`--validators-proposer-blinded-blocks-enabled`](../Reference/CLI/CLI-Syntax.md#validators-proposer-blinded-blocks-enabled)

### Example builder configurations

!!! example "Validator client and beacon node in a single process"

    ```bash
    teku --validators-proposer-default-fee-recipient="0x6e35733c5af9B61374A128e6F85f553aF09ff89A" --ee-endpoint="http://127.0.0.1:8551" --ee-jwt-secret-file="/etc/jwt-secret.hex" --validators-builder-registration-default-enabled=true --builder-endpoint="http://127.0.0.1:18550"
    ```

!!! example "Validator client and beacon node in separate processes"

    === "Validator client parameters"

        ```bash
        Teku validator-client --validators-proposer-blinded-blocks-enabled=true --validators-proposer-config="/etc/teku/proposerConfig.json"
        ```

    === "Proposer configuration"

        ```json
        {
          "proposer_config": {
            "0xa057816155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a": {
              "fee_recipient": "0x50155530FCE8a85ec7055A5F8b2bE214B3DaeFd3",
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

    === "Beacon node paramaters"

        ```bash
        Teku --validators-proposer-default-fee-recipient="0x6e35733c5af9B61374A128e6F85f553aF09ff89A" --ee-endpoint="http://127.0.0.1:8551" --ee-jwt-secret-file="/etc/jwt-secret.hex" --builder-endpoint="http://127.0.0.1:18550"
        ```
