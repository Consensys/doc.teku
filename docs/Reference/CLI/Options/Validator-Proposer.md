---
title: Validator Proposer options
---

# `Validator Proposer`

TODO description

### validators-builder-registration-default-enabled

=== "Syntax"

    ```bash
    --validators-builder-registration-default-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --validators-builder-registration-default-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_BUILDER_REGISTRATION_DEFAULT_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    validators-builder-registration-default-enabled: true
    ```

Set to `true` to have all validators managed by the validator client register to the [builder endpoint](../../HowTo/Builder-Network.md) when proposing a block.

### validators-proposer-blinded-blocks-enabled

=== "Syntax"

    ```bash
    --validators-proposer-blinded-blocks-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --validators-proposer-blinded-blocks-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_PROPOSER_BLINDED_BLOCKS_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    validators-proposer-blinded-blocks-enabled: true
    ```

Set to `true` to enable blinded blocks production, a prerequisite for the [builder network](../../HowTo/Builder-Network.md).
When [`--validators-builder-registration-default-enabled`](#validators-builder-registration-default-enabled)
is enabled this option is enabled automatically.
The default is `false`.

### validators-proposer-config

=== "Syntax"

    ```bash
    --validators-proposer-config=<STRING>
    ```

=== "Example"

    ```bash
    --validators-proposer-config=/home/me/node/proposerConfig.json
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_PROPOSER_CONFIG=/home/me/node/proposerConfig.json
    ```

=== "Configuration file"

    ```bash
    validators-proposer-config: "/home/me/node/proposerConfig.json"
    ```

Remote URL or local file path to the [proposer configuration file](../../HowTo/Prepare-for-The-Merge.md), which is a
JSON file that specifies:

* `proposer_config` - (optional) A proposer configuration for multiple validator public keys.
* `default_config` - (required) A default proposer configuration for validator public keys not included in
  `proposer_config`.

`fee_recipient`is optional in `proposal_config` but is mandatory for `default_config`.

`builder` is optional for each proposer configuration and includes two attributes:

* `enabled` - (mandatory when including `builder`) specifies whether to use the [builder endpoint](#builder-endpoint) when proposing blocks.
* `gas_limit` - (optional) specifies the `gas_limit` for the builder. The default is `30000000`.

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
          "gas_limit": "12345654321"
        }
      }
    }
    ```

### validators-proposer-config-refresh-enabled

=== "Syntax"

    ```bash
    --validators-proposer-config-refresh-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --validators-proposer-config-refresh-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_PROPOSER_CONFIG_REFRESH_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    validators-proposer-config-refresh-enabled: true
    ```

Set to `true` to enable reloading the [proposer configuration](#validators-proposer-config) on every proposer
preparation (once per epoch).
The default is `false`.

### validators-proposer-default-fee-recipient

=== "Syntax"

    ```bash
    --validators-proposer-default-fee-recipient=<ADDRESS>
    ```

=== "Example"

    ```bash
    --validators-proposer-default-fee-recipient=0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_PROPOSER_DEFAULT_FEE_RECIPIENT=0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73
    ```

=== "Configuration file"

    ```bash
    validators-proposer-default-fee-recipient: "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73"
    ```

Default [fee recipient](../../HowTo/Prepare-for-The-Merge.md#configure-the-fee-recipient) for all validator keys.
When running a validator, this is an alternative to the `fee_recipient` in the
[default proposer configuration](#validators-proposer-config).

!!! important

    We recommend using this option when running a beacon node serving APIs to other validator clients.
    The specified fee recipient is used in rare cases when a validator requests a block production but its fee recipient
    is still unknown for the beacon node.
