---
description: Register validators
---

# Register validators

Register validators by creating validator keys or use existing keys to deposit funds
to a deposit contract on an Ethereum 1.0 node.

The following instructions allow you to register validators in a private network.

**Prerequisites**:

* [Install Hyperledger Besu] Ethereum 1.0 client
* [Install Teku](#Install-Binaries) Ethereum 2.0 client.

## Start Hyperledger Besu

[Download the genesis file] that includes the deposit contract details and Ethereum 1.0
accounts, and [start Besu] with the genesis file:

```bash
besu --genesis-file=depositContractGenesis.json \
--data-path=data --miner-enabled=true \
--miner-coinbase=0xfe3b557e8fb62b89f4916b721be55ceb828dbd73 \
--rpc-http-cors-origins="all" --host-whitelist="*" \
--min-gas-price=0 --rpc-http-enabled=true \
--rpc-http-port=8545 \
--rpc-http-api=ETH,IBFT,CLIQUE,DEBUG,MINER,NET,PERM,ADMIN,EEA,TXPOOL,PRIV,WEB3
```

## Submit deposits

You can register validators and submit the required deposits from the command line.

The deposit amount required to register a validator is funded by an Ethereum 1.0 account
specified using the [`--eth1-private-key`](../../Reference/CLI/CLI-Subcommands.md#eth1-private-key)
or [`--eth1-keystore-file`](../../Reference/CLI/CLI-Subcommands.md#eth1-keystore-file) option.

### Generate new validators keys

Generate the keys for the validators and send deposits to the deposit contract.

```bash
teku validator generate --network=minimal --deposit-amount-gwei=32000000000 \
--eth1-deposit-contract-address=dddddddddddddddddddddddddddddddddddddddd \
--eth1-endpoint=http://localhost:8545 --encrypted-keystore-enabled=false \
--keys-output-path=validator_keys \
--eth1-private-key=8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63 \
--number-of-validators=64
```

The command line:

* Specifies the amount of ether to deposit in Gwei using
  [`--deposit-amount-gwei`](../../Reference/CLI/CLI-Subcommands.md#deposit-amount-gwei)
* Specifies the address of the deposit contract using
  [`--eth1-deposit-contract-address`](../../Reference/CLI/CLI-Subcommands.md#eth1-deposit-contract-address)
* Specifies the JSON-RPC URL endpoint of the Ethereum 1.0 client (Besu) using
  [`--eth1-endpoint`](../../Reference/CLI/CLI-Subcommands.md#eth1-endpoint)
* Disables encrypting the validator keys using
  [`--encrypted-keystore-enabled`](../../Reference/CLI/CLI-Subcommands.md#encrypted-keystore-enabled)
* Specifies the output location of the validator keys using
  [`--keys-output-path`](../../Reference/CLI/CLI-Subcommands.md#keys-output-path)
* Specifies the private key that sends the transaction to the deposit contract using
  [`--eth1-private-key`](../../Reference/CLI/CLI-Subcommands.md#eth1-private-key)
* Specify the number of validator keys and deposits to create using
  [`--number-of-validators`](../../Reference/CLI/CLI-Subcommands.md#number-of-validators).

### Register an existing validator key

You can register an existing validator key and send deposits to the deposit contract.

```bash
teku validator register --network=minimal --deposit-amount-gwei=32000000000 \
--encrypted-keystore-validator-file=validator_0xa245bd5162e944efac2546bcadbba5fa2c8929ec6b03380d46fb0e8a6f49b176fecaf1939ed31532711375f873da58cf.json \
--encrypted-keystore-validator-password-file=password.txt \
--eth1-deposit-contract-address=dddddddddddddddddddddddddddddddddddddddd \
--eth1-endpoint=http://localhost:8545 \
--eth1-private-key=8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63 \
--withdrawal-public-key=b88086b629bc0144dd7efc916e46c741d7bc17e14115dcae3dcbacf9da4cb76b7edd37dec4f7b839bd7903155c911f09
```

The command line:

* Specifies the amount of ether to deposit in Gwei using
  [`--deposit-amount-gwei`](../../Reference/CLI/CLI-Subcommands.md#deposit-amount-gwei_1)
* Specifies the location of the validator's BLS12-381 keystore using
  [`--encrypted-keystore-validator-file`](../../Reference/CLI/CLI-Subcommands.md#encrypted-keystore-validator-file)
* Specifies the password to decrypt the BLS12-381 keystore using
  [`--encrypted-keystore-validator-password-file`](../../Reference/CLI/CLI-Subcommands.md#encrypted-keystore-validator-password-file_1)
* Specifies the address of the deposit contract using
  [`--eth1-deposit-contract-address`](../../Reference/CLI/CLI-Subcommands.md#eth1-deposit-contract-address_1)
* Specifies the JSON-RPC URL endpoint of the Ethereum 1.0 client (Besu) using
  [`--eth1-endpoint`](../../Reference/CLI/CLI-Subcommands.md#eth1-endpoint_1)
* Specifies the private key that sends the transaction to the deposit contract using
  [`--eth1-private-key`](../../Reference/CLI/CLI-Subcommands.md#eth1-private-key_1)
* Specifies the public key used to withdraw funds using [`--withdrawal-public-key`](../../Reference/CLI/CLI-Subcommands.md#withdrawal-public-key).

## Start Teku

You need at least 64 validators to start a private Teku network.

```bash
teku --eth1-deposit-contract-address=dddddddddddddddddddddddddddddddddddddddd \
--eth1-endpoint=http://localhost:8545 --validators-key-file=validator_keys \
--p2p-port=9000 --rest-api-enabled=true --rest-api-docs-enabled=true
```

The command line:

* Specifies the address of the deposit contract using
  [`--eth1-deposit-contract-address`](../../Reference/CLI/CLI-Syntax.md#eth1-deposit-contract-address)
* Specifies the JSON-RPC URL endpoint of the Ethereum 1.0 client (Besu) using
  [`--eth1-endpoint`](../../Reference/CLI/CLI-Syntax.md#eth1-endpoint)
* Specifies the validator private [keys created earlier](#generate-new-validator-keys) using
  [`--validators-key-file`](../../Reference/CLI/CLI-Syntax.md#validators-key-file)
* Specifies the P2P listening ports using [`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port)
* Enables the [REST API service](../../Reference/Rest_API/Rest.md) using
  [`--rest-api-enabled`](../../Reference/CLI/CLI-Syntax.md#rest-api-enabled)
* Enables the Swagger-UI documentation using
  [`--rest-api-docs-enabled`](../../Reference/CLI/CLI-Syntax.md#rest-api-docs-enabled)

!!! note
    The default Swagger-UI documentation location is `http://localhost:5051/swagger-ui`.

<!-- Links -->
[Install Hyperledger Besu]: https://besu.hyperledger.org/en/latest/HowTo/Get-Started/Install-Binaries/
[Download the genesis file]: https://github.com/PegaSysEng/teku/blob/master/acceptance-tests/src/testFixtures/resources/besu/depositContractGenesis.json
[start Besu]: https://besu.hyperledger.org/en/latest/HowTo/Get-Started/Starting-node/#genesis-configuration