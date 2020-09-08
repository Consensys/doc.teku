---
description: Teku command line interface subcommands
---

# Subcommands

## transition

Manually run state transitions for blocks or slots for debugging.

Used for development and testing purposes.

## peer

Commands to generate a list of peer IDs, including the private key, public key, and peer ID.

Used for development and testing purposes.

## validator

Generate validator keys and register validators by sending transactions to an Ethereum 1.0 node.

### generate

Generate validator keys. Keys can be registered using the [`register`](#register) subcommand.

Alternatively, use the [`generate-and-register`](#generate-and-register) subcommand to generate and
register the validators in the same command.

#### encrypted-keystore-enabled

=== "Syntax"

    ```bash
    teku validator generate --encrypted-keystore-enabled=<BOOLEAN>
    ```

=== "Command Line"

    ```bash
    teku validator generate --encrypted-keystore-enabled=false
    ```

Specify whether to create encrypted BLS12-381 keystore validator and withdrawal keys.
Defaults to `true`.

Use [`--keys-output-path`](#keys-output-path) to specify the output location of
the encrypted or unencrypted keys.

!!! important
    Unencrypted keys are displayed on the console if the output location is not specified.

#### keys-output-path

=== "Syntax"

    ```bash
    teku validator generate --keys-output-path=<FILE|DIR>
    ```

=== "Command Line"

    ```bash
    teku validator generate --keys-output-path=/home/me/me_node/keys
    ```

Specify the output location for validator and withdrawal keys. If not set, unencrypted
keys are written to standard out, and encrypted BLS12-381 keystores are created in current directory.

Use this option to specify:

* The path to the output file when using unencrypted keys. That is,
  [`--encrypted-keystore-enabled`](#encrypted-keystore-enabled) set to `false`.
* The path to the output directory for the generated keystore files. That is,
  [`encrypted-keystore-enabled`](#encrypted-keystore-enabled) set to `true`.

#### encrypted-keystore-validator-password-env

=== "Syntax"

    ```bash
    teku validator generate --encrypted-keystore-validator-password-env=<ENV>
    ```

=== "Command Line"

    ```bash
    teku validator generate --encrypted-keystore-validator-password-env=VALIDATOR_PASSWORD
    ```

The environment variable that stores the password to decrypt the validator's BLS12-381 keystore.

If you do not specify a password, then you need to manually enter a password at
the command line when prompted.

#### encrypted-keystore-validator-password-file

=== "Syntax"

    ```bash
    teku validator generate --encrypted-keystore-validator-password-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku validator generate --encrypted-keystore-validator-password-file=/home/me/me_node/password
    ```

The file that stores the password to decrypt the validator's BLS12-381 keystore.

If you do not specify a password, then you need to manually enter a password at
the command line when prompted.

#### encrypted-keystore-withdrawal-password-env

=== "Syntax"

    ```bash
    teku validator generate --encrypted-keystore-withdrawal-password-env=<ENV>
    ```

=== "Command Line"

    ```bash
    teku validator generate --encrypted-keystore-withdrawal-password-env=WITHDRAWAL_PASSWORD
    ```

The environment variable that stores the password to decrypt the validator's withdrawal key.

If you do not specify a password, then you need to manually enter a password at
the command line when prompted.

#### encrypted-keystore-withdrawal-password-file

=== "Syntax"

    ```bash
    teku validator generate --encrypted-keystore-withdrawal-password-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku validator generate --encrypted-keystore-withdrawal-password-file=/home/me/me_node/password
    ```

The file that stores the password to decrypt the validator's withdrawal key.

If you do not specify a password, then you need to manually enter a password at
the command line when prompted.

#### number-of-validators

=== "Syntax"

    ```bash
    teku validator generate --number-of-validators=<NUMBER>
    ```

=== "Command Line"

    ```bash
    teku validator generate --number-of-validators=64
    ```

Specify the number of validators to create keys for and register.

A minimum of 64 validators are required in a network.

#### verbose-output-enabled

=== "Syntax"

    ```bash
    teku validator generate --verbose-output-enabled=<BOOLEAN>
    ```

=== "Command Line"

    ```bash
    teku validator generate --verbose-output-enabled=false
    ```

Enables verbose output that includes details of the generated validator. Defaults to `true`.

### generate-and-register

Register a validator by generating new keys and sending deposit transactions to an Ethereum 1.0
node.

#### deposit-amount-gwei

=== "Syntax"

    ```bash
    teku validator generate-and-register --deposit-amount-gwei=<GWEI>
    ```

=== "Command Line"

    ```bash
    teku validator generate-and-register --deposit-amount-gwei=32000000000
    ```

Amount to deposit in the Ethereum 1.0 deposit contract. Defaults to the minimum ETH required to
activate a validator on the specified network.

#### encrypted-keystore-enabled

=== "Syntax"

    ```bash
    teku validator generate-and-register --encrypted-keystore-enabled=<BOOLEAN>
    ```

=== "Command Line"

    ```bash
    teku validator generate-and-register --encrypted-keystore-enabled=false
    ```

Specify whether to create encrypted BLS12-381 keystore validator and withdrawal keys.
Defaults to `true`.

Use [`--keys-output-path`](#keys-output-path_1) to specify the output location of
the encrypted or unencrypted keys.

!!! important
    Unencrypted keys are displayed on the console if the output location is not specified.

#### eth1-deposit-contract-address

=== "Syntax"

    ```bash
    teku validator generate-and-register --eth1-deposit-contract-address=<ADDRESS>
    ```

=== "Command Line"

    ```bash
    teku validator generate-and-register --eth1-deposit-contract-address=0x77f7bED277449F51505a4C54550B074030d989bC
    ```

Ethereum 1.0 address of deposit contract.

#### eth1-endpoint

=== "Syntax"

    ```bash
    teku validator generate-and-register --eth1-endpoint=<URL>
    ```

=== "Command Line"

    ```bash
    teku validator generate-and-register --eth1-endpoint=http://localhost:8545
    ```

JSON-RPC URL of Ethereum 1.0 node.

#### eth1-keystore-file

=== "Syntax"

    ```bash
    teku validator generate-and-register --eth1-keystore-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku validator generate-and-register --eth1-keystore-file=/home/me/me_node/keystore
    ```

Path to the encrypted V3 keystore file containing the private key of the
Ethereum 1.0 account from which to send the deposit transaction. Ensure the
account has enough ether to cover the amount specified using
[`--deposit-amount-gwei`](#deposit-amount-gwei).

Cannot be used with [`--eth1-private-key`](#eth1-private-key)

#### eth1-keystore-password-file

=== "Syntax"

    ```bash
    teku validator generate-and-register --eth1-keystore-password-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku validator generate-and-register --eth1-keystore-password-file=/home/me/me_node/password
    ```

Path to the file containing the password to decrypt the V3 keystore.

#### eth1-private-key

=== "Syntax"

    ```bash
    teku validator generate-and-register --eth1-private-key=<KEY>
    ```

=== "Command Line"

    ```bash
    teku validator generate-and-register --eth1-private-key=8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63
    ```

Private key of the Ethereum 1.0 account from which to send the deposit transaction. Ensure the
account has enough ether to cover the amount specified using
[`--deposit-amount-gwei`](#deposit-amount-gwei).

Cannot be used with [`--eth1-keystore-file`](#eth1-keystore-file).

#### keys-output-path

=== "Syntax"

    ```bash
    teku validator generate-and-register --keys-output-path=<FILE|DIR>
    ```

=== "Command Line"

    ```bash
    teku validator generate-and-register --keys-output-path=/home/me/me_node/keys
    ```

Specify the output location for validator and withdrawal keys. If not set, unencrypted
keys are written to standard out, and encrypted BLS12-381 keystores are created in current directory.

Use this option to specify:

* The path to the output file when using unencrypted keys. That is,
  [`--encrypted-keystore-enabled`](#encrypted-keystore-enabled_1) set to `false`.
* The path to the output directory for the generated keystore files. That is,
  [`encrypted-keystore-enabled`](#encrypted-keystore-enabled_1) set to `true`.

#### encrypted-keystore-validator-password-env

=== "Syntax"

    ```bash
    teku validator generate-and-register --encrypted-keystore-validator-password-env=<ENV>
    ```

=== "Command Line"

    ```bash
    teku validator generate-and-register --encrypted-keystore-validator-password-env=VALIDATOR_PASSWORD
    ```

The environment variable that stores the password to decrypt the validator's BLS12-381 keystore.

If you do not specify a password, then you need to manually enter a password at
the command line when prompted.

#### encrypted-keystore-validator-password-file

=== "Syntax"

    ```bash
    teku validator generate-and-register --encrypted-keystore-validator-password-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku validator generate-and-register --encrypted-keystore-validator-password-file=/home/me/me_node/password
    ```

The file that stores the password to decrypt the validator's BLS12-381 keystore.

If you do not specify a password, then you need to manually enter a password at
the command line when prompted.

#### encrypted-keystore-withdrawal-password-env

=== "Syntax"

    ```bash
    teku validator generate-and-register --encrypted-keystore-withdrawal-password-env=<ENV>
    ```

=== "Command Line"

    ```bash
    teku validator generate-and-register --encrypted-keystore-withdrawal-password-env=WITHDRAWAL_PASSWORD
    ```

The environment variable that stores the password to decrypt the validator's withdrawal key.

If you do not specify a password, then you need to manually enter a password at
the command line when prompted.

#### encrypted-keystore-withdrawal-password-file

=== "Syntax"

    ```bash
    teku validator generate-and-register --encrypted-keystore-withdrawal-password-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku validator generate-and-register --encrypted-keystore-withdrawal-password-file=/home/me/me_node/password
    ```

The file that stores the password to decrypt the validator's withdrawal key.

If you do not specify a password, then you need to manually enter a password at
the command line when prompted.

#### network

=== "Syntax"

    ```bash
    teku validator generate-and-register --network=<NETWORK>
    ```

=== "Command Line"

    ```bash
    teku validator generate-and-register --network=mainnet
    ```

[Network to use](CLI-Syntax.md#network). This option must be supplied.

#### number-of-validators

=== "Syntax"

    ```bash
    teku validator generate-and-register --number-of-validators=<NUMBER>
    ```

=== "Command Line"

    ```bash
    teku validator generate-and-register --number-of-validators=64
    ```

Specify the number of validators to create keys for and register.

A minimum of 64 validators are required in a network.

#### verbose-output-enabled

=== "Syntax"

    ```bash
    teku validator generate --verbose-output-enabled=<BOOLEAN>
    ```

=== "Command Line"

    ```bash
    teku validator generate-and-register --verbose-output-enabled=false
    ```

Enables verbose output that includes details of the generated and registered validators. Defaults to
`true`.

### register

Register a validator using existing keys by sending a deposit transaction to an
Ethereum 1.0 node.

#### deposit-amount-gwei

=== "Syntax"

    ```bash
    teku validator register --deposit-amount-gwei=<GWEI>
    ```

=== "Command Line"

    ```bash
    teku validator register --deposit-amount-gwei=32000000000
    ```

Amount to deposit in the Ethereum 1.0 deposit contract.

#### encrypted-keystore-validator-file

=== "Syntax"

    ```bash
    teku validator register --encrypted-keystore-validator-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku validator register --encrypted-keystore-validator-file=/home/me/me_node/password
    ```

Path to the BLS12-381 keystore file containing the validator's encrypted private key.

#### encrypted-keystore-validator-password-env

=== "Syntax"

    ```bash
    teku validator register --encrypted-keystore-validator-password-env=<ENV>
    ```

=== "Command Line"

    ```bash
    teku validator register --encrypted-keystore-validator-password-env=VALIDATOR_PASSWORD
    ```

The environment variable that stores the password to decrypt the validator's BLS12-381 keystore.

#### encrypted-keystore-validator-password-file

=== "Syntax"

    ```bash
    teku validator register --encrypted-keystore-validator-password-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku validator register --encrypted-keystore-validator-password-file=/home/me/me_node/password
    ```

The file that stores the password to decrypt the validator's BLS12-381 keystore.

#### eth1-deposit-contract-address

=== "Syntax"

    ```bash
    teku validator register --eth1-deposit-contract-address=<ADDRESS>
    ```

=== "Command Line"

    ```bash
    teku validator register --eth1-deposit-contract-address=0x77f7bED277449F51505a4C54550B074030d989bC
    ```

Ethereum 1.0 address of deposit contract.

#### eth1-endpoint

=== "Syntax"

    ```bash
    teku validator register --eth1-endpoint=<URL>
    ```

=== "Command Line"

    ```bash
    teku validator register --eth1-endpoint=http://localhost:8545
    ```

JSON-RPC URL of Ethereum 1.0 node.

#### eth1-keystore-file

=== "Syntax"

    ```bash
    teku validator register --eth1-keystore-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku validator register --eth1-keystore-file=/home/me/me_node/keystore
    ```

Path to the encrypted V3 keystore file containing the private key of the
Ethereum 1.0 account from which to send the deposit transaction. Ensure the
account has enough ether to cover the amount specified using
[`--deposit-amount-gwei`](#deposit-amount-gwei).

Cannot be used with [`--eth1-private-key`](#eth1-private-key_1)

#### eth1-keystore-password-file

=== "Syntax"

    ```bash
    teku validator register --eth1-keystore-password-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku validator register --eth1-keystore-password-file=/home/me/me_node/password
    ```

Path to the file containing the password to decrypt the V3 keystore.

#### eth1-private-key

=== "Syntax"

    ```bash
    teku validator register --eth1-private-key=<KEY>
    ```

=== "Command Line"

    ```bash
    teku validator register --eth1-private-key=8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63
    ```

Private key of the Ethereum 1.0 account from which to send the deposit transaction. Ensure the
account has enough ether to cover the amount specified using
[`--deposit-amount-gwei`](#deposit-amount-gwei).

Cannot be used with [`--eth1-keystore-file`](#eth1-keystore-file_1).

#### network

=== "Syntax"

    ```bash
    teku validator register --network=<NETWORK>
    ```

=== "Command Line"

    ```bash
    teku validator register --network=mainnet
    ```

[Network to use](CLI-Syntax.md#network). This option must be supplied.

#### validator-private-key

=== "Syntax"

    ```bash
    teku validator register --validator-private-key=<KEY>
    ```

=== "Command Line"

    ```bash
    teku validator register --validator-private-key=2a4055949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692cb87
    ```

Validator's private signing key. Cannot be used with
[`--encrypted-keystore-validator-file`](#encrypted-keystore-validator-file)

#### verbose-output-enabled

=== "Syntax"

    ```bash
    teku validator register --verbose-output-enabled=<BOOLEAN>
    ```

=== "Command Line"

    ```bash
    teku validator register --verbose-output-enabled=false
    ```

Enables verbose output that includes details of the registered validator. Defaults to `true`.

#### withdrawal-keystore-file

=== "Syntax"

    ```bash
    teku validator register --withdrawal-keystore-file=<FILE>
    ```

=== "Command Line"

    ```bash
    teku validator register --withdrawal-keystore-file=/home/validator/withdrawal/withdrawal_8804460.json
    ```

Path to the encrypted keystore file containing the validator's withdrawal key.

The public withdrawal key is stored unencrypted in the keystore file.

#### withdrawal-public-key

=== "Syntax"

    ```bash
    teku validator register --withdrawal-public-key=<KEY>
    ```

=== "Command Line"

    ```bash
    teku validator register --withdrawal-public-key=b65c2a1dc6a8eaadae03d5849dd6ac614b32dc5f8af37e2eb4ced0c72fd69fabe90fc783b0435f5a36ff1338385ef837
    ```

Validators public withdrawal key.

## genesis

Generate a genesis state for a network.

Used for development and testing purposes.

## slashing-protection

Manage the local [slashing protection data] used by the validator.

### import

Imports the slashing protection database. Supports the [Minimal] or [Complete] interchange format.

#### data-path

=== "Syntax"

    ```bash
    teku slashing-protection import --data-path=<PATH>
    ```

=== "Command Line"

    ```bash
    teku slashing-protection import --data-path=/home/me/me_node
    ```

The path to the Teku data directory. The default directory is OS dependent:

* macOS: `~/Library/teku`
* Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`
* Windows: `%localappdata%\teku`.

#### from

=== "Syntax"

    ```bash
    teku slashing-protection import --from=<FILE>
    ```

=== "Command Line"

    ```bash
    teku slashing-protection import --from=/home/slash/b845...23bed.yml
    ```

The file to import the slashing protection database from.

Teku imports the file to the `<data-path>/validators/slashprotection/` directory in the format
`<validator-pubkey>.yml` (with no 0x prefix).

`<data-path>` is defined using [`--data-path`](#data-path).

### export

Exports the slashing protection database in [Minimal] format.

#### data-path

=== "Syntax"

    ```bash
    teku slashing-protection export --data-path=<PATH>
    ```

=== "Command Line"

    ```bash
    teku slashing-protection export --data-path=/home/me/me_node
    ```

The path to the Teku data directory. The default directory is OS dependent:

* macOS: `~/Library/teku`
* Unix/Linux: `$XDG_DATA_HOME/teku` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku`
* Windows: `%localappdata%\teku`.

#### to

=== "Syntax"

    ```bash
    teku slashing-protection export --to=<FILE>
    ```

=== "Command Line"

    ```bash
    teku slashing-protection export --to=/home/slash/b845...23bed.yml
    ```

The file to export the slashing protection database to.

Exports the database in the [Minimal] format.
<!-- links -->

[slashing protection data]: ../../Concepts/Slashing-Protection.md
[Minimal]: https://hackmd.io/@sproul/Bk0Y0qdGD#Format-2-Minimal
[Complete]: https://hackmd.io/@sproul/Bk0Y0qdGD#Format-1-Complete
