---
title: Deposit options
---

# `Deposit and deposit contract`

TODO description

### eth1-endpoint, eth1-endpoints

=== "Syntax"

    ```bash
    --eth1-endpoint=<URL>[,<URL>...]...
    ```

=== "Example"

    ```bash
    --eth1-endpoint=http://localhost:8545,https://mainnet.infura.io/v3/d0e21ccd0b1e4eef7784422eabc51111
    ```

=== "Environment variable"

    ```bash
    TEKU_ETH1_ENDPOINT=http://localhost:8545,https://mainnet.infura.io/v3/d0e21ccd0b1e4eef7784422eabc51111
    ```

=== "Configuration file"

    ```bash
    eth1-endpoint: ["http://localhost:8545","https://mainnet.infura.io/v3/d0e21ccd0b1e4eef7784422eabc51111"]
    ```

Comma-separated list of JSON-RPC URLs of execution layer (Ethereum 1.0) nodes.
Each time Teku makes a call, it finds the first provider in the list that is available, on the right chain, and in sync.
This option must be specified if running a validator.

If not specified (that is, you're running a beacon node only), then provide an initial state
using the [`--initial-state`](#initial-state) option, or start Teku from an existing database using
[`--data-path`](#data-base-path-data-path), which provides the initial state to work from. You do not need to
provide an initial state if running a public network which has already started (for example,
Mainnet or Goerli).

If using a cloud-based service such as [Infura], then set the endpoint to the supplied URL.
For example, `https://goerli.infura.io/v3/<Project_ID>`.

!!! important

    After [The Merge](../../Concepts/Merge.md), you can't use `eth1-endpoint` to specify an external execution layer
    provider.
    This option will be replaced by [`ee-endpoint`](#ee-endpoint) for each beacon node.
    You can [configure your execution client](../../HowTo/Prepare-for-The-Merge.md) before The Merge.

### eth1-deposit-contract-max-request-size

=== "Syntax"

    ```bash
    --eth1-deposit-contract-max-request-size=<INTEGER>
    ```

=== "Example"

    ```bash
    --eth1-deposit-contract-max-request-size=8000
    ```

=== "Environment variable"

    ```bash
    TEKU_ETH1_DEPOSIT_CONTRACT_MAX_REQUEST_SIZE=8000
    ```

=== "Configuration file"

    ```bash
    eth1-deposit-contract-max-request-size: 8000
    ```

The maximum number of blocks to request deposit contract event logs for in a single request.
The default is 10000.

Setting a smaller max size may help if your ETH1 node is slow at loading deposit event logs, or when
receiving warnings that the ETH1 node is unavailable.
