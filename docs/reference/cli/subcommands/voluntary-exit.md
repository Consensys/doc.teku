---
title: voluntary-exit
sidebar_position: 6
---

# `voluntary-exit`

Create and sign a [voluntary exit] for the specified validator or set of validators.  
This subcommand can be run as a separate Teku process.

:::caution

To submit a voluntary exit, you must have a running beacon node with the [REST API enabled].

:::

## `beacon-node-api-endpoint`

<!--tabs-->

# Syntax

```bash
teku voluntary-exit --beacon-node-api-endpoint=<ENDPOINT>
```

# Example

```bash
teku voluntary-exit --beacon-node-api-endpoint=http://192.138.10.12
```

# Environment variable

```bash
TEKU_BEACON_NODE_ENDPOINT=http://192.138.10.12
```

# Configuration file

```bash
beacon-node-api-endpoint: "http://192.138.10.12"
```

<!--/tabs-->

Endpoint of the beacon node's REST API. The default is `http://127.0.0.1:5051`.

## `config-file`

<!--tabs-->

# Syntax

```bash
teku voluntary-exit --config-file=<FILE>
```

# Example

```bash
teku voluntary-exit --config-file=/home/me/me_node/config.yaml
```

# Environment variable

```bash
TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
```

<!--/tabs-->

Path to the YAML configuration file. The default is `none`.

## `confirmation-enabled`

<!--tabs-->

# Syntax

```bash
teku voluntary-exit --confirmation-enabled=<BOOLEAN>
```

# Example

```bash
teku voluntary-exit --confirmation-enabled=false
```

# Environment variable

```bash
TEKU_CONFIRMATION_ENABLED=false
```

# Configuration file

```bash
confirmation-enabled: false
```

<!--/tabs-->

Specify whether to request confirmation when exiting a validator. The default is `true`.

:::warning

If you set `--confirmation-enabled` to `false`, exits are generated immediately without any prompt.

:::

## `epoch`

<!--tabs-->

# Syntax

```bash
teku voluntary-exit --epoch=<EPOCH>
```

# Example

```bash
teku voluntary-exit --epoch=24500
```

# Environment variable

```bash
TEKU_EPOCH=24500
```

<!--/tabs-->

Earliest epoch that the voluntary exit can be processed. The specified epoch can be a past epoch, or current epoch. You cannot specify a future epoch. The default is the current epoch.

:::note

If there is a high number of validators that are queued to exit, then the validator exit may be processed at a later epoch.

:::

## `include-keymanager-keys`

<!--tabs-->

# Syntax

```bash
teku voluntary-exit --include-keymanager-keys=<BOOLEAN>
```

# Example

```bash
teku voluntary-exit --include-keymanager-keys=true
```

<!--/tabs-->

Include validator keys managed using the [key manager APIs](../../../how-to/use-external-signer/manage-keys.md). The default is `false`.

## `network`

<!--tabs-->

# Syntax

```bash
teku voluntary-exit --network=<NETWORK>
```

# Example

```bash
teku voluntary-exit --network=mainnet
```

# Environment variable

```bash
TEKU_NETWORK=mainnet
```

# Configuration file

```bash
network: "mainnet"
```

<!--/tabs-->

Predefined network configuration. The default is unset, as the network specification will be read from the beacon-api unless specified.

## `validator-keys`

<!--tabs-->

# Syntax

```bash
teku voluntary-exit --validator-keys=<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>[,<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>...]...
```

# Example for directory

```bash
teku voluntary-exit --validator-keys=/home/validator/keys:home/validator/passwords
```

# Example for file

```bash
teku voluntary-exit --validator-keys=/home/validator/keys/validator_217179e.json:/home/validator/passwords/validator_217179e.txt
```

# Environment variable

```bash
TEKU_VALIDATOR_KEYS=/home/validator/keys:home/validator/passwords
```

# Configuration file

```bash
validator-keys: "/home/validator/keys:home/validator/passwords"
```

<!--/tabs-->

Directory or file to load the encrypted keystores and passwords of the validators that you wish to exit. Keystore files must use the `.json` file extension, and password files must use the `.txt` file extension.

When specifying directories, Teku expects to find identically named keystore and password files. For example `validator_217179e.json` and `validator_217179e.txt`.

When specifying file names, Teku expects that the files exist.

:::note

The path separator is operating system dependent, and should be `;` in Windows rather than `:`.

:::

## `validator-public-keys`

<!--tabs-->

# Syntax

```bash
teku voluntary-exit --validator-public-keys=<PUBKEY>[,<PUBKEY>...]...
```

# Example

```bash
teku voluntary-exit --validator-public-keys=0xc7931ac6937f6c776d8dfe84918f7b26d986f2e45af5869085839b8817db2705,0x179a0e2768621eede9ce961cf8ee4f0ece5be9a1795c294269b69b85c765f3cc
```

<!--/tabs-->

Restrict the exit command to a specified list of public keys. When the parameter is not used, all keys will be exited.

## `validators-external-signer-keystore`

<!--tabs-->

# Syntax

```bash
teku voluntary-exit --validators-external-signer-keystore=<FILE>
```

# Example

```bash
teku voluntary-exit --validators-external-signer-keystore=teku_client_keystore.p12
```

# Environment variable

```bash
TEKU_VALIDATORS_EXTERNAL_KEYSTORE=teku_client_keystore.p12
```

# Configuration file

```bash
validators-external-signer-keystore: "teku_client_keystore.p12"
```

<!--/tabs-->

The keystore that Teku presents to the external signer for TLS authentication. Teku can use PKCS12 or JKS keystore types.

Use the PKCS12 keystore type if connecting to Web3Signer.

## `validators-external-signer-keystore-password-file`

<!--tabs-->

# Syntax

```bash
teku voluntary-exit --validators-external-signer-keystore-password-file=<FILE>
```

# Example

```bash
teku voluntary-exit --validators-external-signer-keystore-password-file=keystore_pass.txt
```

# Environment variable

```bash
TEKU_VALIDATORS_EXTERNAL_KEYSTORE_PASSWORD_FILE=keystore_pass.txt
```

# Configuration file

```bash
validators-external-signer-keystore-password-file: "keystore_pass.txt"
```

<!--/tabs-->

Password file used to decrypt the keystore.

## `validators-external-signer-public-keys`

<!--tabs-->

# Syntax

```bash
teku voluntary-exit --validators-external-signer-public-keys=<KEY>[,<KEY>...]
```

# Example

```bash
teku voluntary-exit --validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b
```

# Environment variable

```bash
TEKU_VALIDATORS_EXTERNAL_SIGNER_PUBLIC_KEYS=0xa99a...e44c,0xb89b...4a0b
```

# Configuration file

```bash
validators-external-signer-public-keys: ["0xa99a...e44c","0xb89b...4a0b"]
```

<!--/tabs-->

List of public keys of validators that you wish to voluntarily exit when using an external signer (for example, [Web3Signer]).

## `validators-external-signer-timeout`

<!--tabs-->

# Syntax

```bash
teku voluntary-exit --validators-external-signer-timeout=<INTEGER>
```

# Example

```bash
teku voluntary-exit --validators-external-signer-timeout=2000
```

# Environment variable

```bash
TEKU_VALIDATORS_EXTERNAL_SIGNER_TIMEOUT=2000
```

# Configuration file

```bash
validators-external-signer-timeout: 2000
```

<!--/tabs-->

Timeout in milliseconds for requests to the external signer. The default is 5000.

## `validators-external-signer-truststore`

<!--tabs-->

# Syntax

```bash
teku voluntary-exit --validators-external-signer-truststore=<FILE>
```

# Example

```bash
teku voluntary-exit --validators-external-signer-truststore=websigner_truststore.p12
```

# Environment variable

```bash
TEKU_VALIDATORS_EXTERNAL_TRUSTSTORE=websigner_truststore.p12
```

# Configuration file

```bash
validators-external-signer-truststore: "websigner_truststore.p12"
```

<!--/tabs-->

PKCS12 or JKS keystore used to trust external signer's self-signed certificate or CA certificate which signs the external signer's certificate.

## `validators-external-signer-truststore-password-file`

<!--tabs-->

# Syntax

```bash
teku voluntary-exit --validators-external-signer-truststore-password-file=<FILE>
```

# Example

```bash
teku voluntary-exit --validators-external-signer-truststore-password-file=truststore_pass.txt
```

# Environment variable

```bash
TEKU_VALIDATORS_EXTERNAL_TRUSTSTORE_PASSWORD_FILE=truststore_pass.txt
```

# Configuration file

```bash
validators-external-signer-truststore-password-file: "truststore_pass.txt"
```

<!--/tabs-->

Password file used to decrypt the keystore.

## `validators-external-signer-url`

<!--tabs-->

# Syntax

```bash
teku voluntary-exit --validators-external-signer-url=<URL>
```

# Example

```bash
teku voluntary-exit --validators-external-signer-url=http://localhost:9000
```

# Environment variable

```bash
TEKU_VALIDATORS_EXTERNAL_SIGNER_URL=http://localhost:9000
```

# Configuration file

```bash
validators-external-signer-url: "http://localhost:9000"
```

<!--/tabs-->

URL of the external signer (for example, [Web3Signer]).

<!-- links -->

[Web3Signer]: https://docs.web3signer.consensys.net/en/latest/
[REST API enabled]: ../index.md#rest-api-enabled
[voluntary exit]: ../../../how-to/voluntarily-exit.md
