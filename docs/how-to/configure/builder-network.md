---
title: Configure Teku to use a builder network
description: Connect to a builder network to generate execution payloads.
sidebar_position: 3
---

# Configure Teku to use a builder network

You can connect to a [builder network](../../concepts/builder-network.md) to generate execution payloads for the [consensus client](../../concepts/merge.md#consensus-clients).

The builder recommends new blocks that are validated by the consensus client. If the builder goes down, the local execution client proposes a block instead.

To configure Teku to use a builder network:

- [Configure Teku to use a builder network](#configure-teku-to-use-a-builder-network)
  - [1. Enable blinded block production](#1-enable-blinded-block-production)
  - [2. Specify the builder endpoint](#2-specify-the-builder-endpoint)
  - [3. Register the validator](#3-register-the-validator)
  - [Example builder configurations](#example-builder-configurations)

## 1. Enable blinded block production

Enable blinded block production using the [`--validators-proposer-blinded-blocks-enabled`](../../reference/cli/index.md#validators-proposer-blinded-blocks-enabled) command line option.

:::note

If [--validators-builder-registration-default-enabled](../../reference/cli/index.md#validators-builder-registration-default-enabled) is set to `true`, then `--validators-proposer-blinded-blocks-enabled` is automatically enabled.

:::

## 2. Specify the builder endpoint

Specify the builder endpoint using the [`--builder-endpoint`](../../reference/cli/index.md#builder-endpoint) command line option.

```bash title="Example"
--builder-endpoint="https://builder-relay-sepolia.flashbots.net/"
```

View the [list of relay endpoints](https://github.com/flashbots/mev-boost#usage) for available endpoints.

You can also use external software such as [MEV-Boost](https://github.com/flashbots/mev-boost) to connect to multiple relays.

```bash title="Example"
--builder-endpoint=http://127.0.0.1:18550
```

## 3. Register the validator

You must register your validator with the builder before proposing a block. Enable registration for all validators using the [`--validators-builder-registration-default-enabled`](../../reference/cli/index.md#validators-builder-registration-default-enabled) command line option on the validator client.

To enable registration for specific validators only, use the [`--validators-proposal-config`](../../reference/cli/index.md#validators-proposer-config) option and specify the enabled validators in the `proposer_config` field of the [proposer configuration file](use-proposer-config-file.md).

```json title="proposerConfig.json"
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

In this example, validator `0xa057816...` is registered with the builder, but any validator using the default configuration isn't.

:::note

If you use a proposer configuration, you must enable blinded block production using [`--validators-proposer-blinded-blocks-enabled`](../../reference/cli/index.md#validators-proposer-blinded-blocks-enabled).

:::

## Example builder configurations

```bash title="Validator client and beacon node in a single process"
teku \
    --validators-proposer-default-fee-recipient="0x6e35733c5af9B61374A128e6F85f553aF09ff89A" \
    --ee-endpoint="http://127.0.0.1:8551"                  \
    --ee-jwt-secret-file="/etc/jwt-secret.hex"             \
    --validators-builder-registration-default-enabled=true \
    --builder-endpoint="http://127.0.0.1:18550"
```

```bash title="Validator client parameters"
teku validator-client \
    --validators-proposer-blinded-blocks-enabled=true \
    --validators-proposer-config="/etc/teku/proposerConfig.json"
```

```json title="Proposer configuration"
{
  "proposer_config": {
    "0xa057816155ad77931185101128655c0191bd0214c201ca48ed887f6c4c6adf334070efcd75140eada5ac83a92506dd7a": {
      "fee_recipient": "0x50155530FCE8a85ec7055A5F8b2bE214B3DaeFd3"
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

```bash title="Beacon node parameters"
teku \
    --validators-proposer-default-fee-recipient="0x6e35733c5af9B61374A128e6F85f553aF09ff89A" \
    --ee-endpoint="http://127.0.0.1:8551" \
    --ee-jwt-secret-file="/etc/jwt-secret.hex" \
    --builder-endpoint="http://127.0.0.1:18550"
```
