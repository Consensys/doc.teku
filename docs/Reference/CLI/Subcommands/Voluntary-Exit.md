---
title: Voluntary exit subcommand options
---

# `voluntary-exit`

Create and sign a voluntary exit for the specified validator or set of validators.

## Options

### beacon-node-api-endpoint

=== "Syntax"

    ```bash
    teku voluntary-exit --beacon-node-api-endpoint=<ENDPOINT>
    ```

=== "Example"

    ```bash
    teku voluntary-exit --beacon-node-api-endpoint=http://192.138.10.12
    ```

=== "Environment variable"

    ```bash
    TEKU_BEACON_NODE_ENDPOINT=http://192.138.10.12
    ```

=== "Configuration file"

    ```bash
    beacon-node-api-endpoint: "http://192.138.10.12"
    ```

Endpoint of the beacon node's REST API. The default is `http://127.0.0.1:5051`.

### config-file

=== "Syntax"

    ```bash
    teku voluntary-exit --config-file=<FILE>
    ```

=== "Example"

    ```bash
    teku voluntary-exit --config-file=/home/me/me_node/config.yaml
    ```

=== "Environment variable"

    ```bash
    TEKU_CONFIG_FILE=/home/me/me_node/config.yaml
    ```

Path to the YAML configuration file.
The default is `none`.

### confirmation-enabled

=== "Syntax"

    ```bash
    teku voluntary-exit --confirmation-enabled=<BOOLEAN>
    ```

=== "Example"

    ```bash
    teku voluntary-exit --confirmation-enabled=false
    ```

=== "Environment variable"

    ```bash
    TEKU_CONFIRMATION_ENABLED=false
    ```

=== "Configuration file"

    ```bash
    confirmation-enabled: false
    ```

Specify whether to request confirmation when exiting a validator. The default is `true`.

!!! danger

    Exercise care when using this option because if set to `false`, exits are generated immediately
    without any prompt.

### epoch

=== "Syntax"

    ```bash
    teku voluntary-exit --epoch=<EPOCH>
    ```

=== "Example"

    ```bash
    teku voluntary-exit --epoch=24500
    ```

=== "Environment variable"

    ```bash
    TEKU_EPOCH=24500
    ```

Earliest epoch that the voluntary exit can be processed. The specified epoch can be a past epoch,
or current epoch. You cannot specify a future epoch. The default is the current epoch.

!!! note

    If there is a high number of validators that are queued to exit, then the validator exit may be
    processed at a later epoch.

### validator-keys

=== "Syntax"

    ```bash
    teku voluntary-exit --validator-keys=<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>[,<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>...]...
    ```

=== "Example for directory"

    ```bash
    teku voluntary-exit --validator-keys=/home/validator/keys:home/validator/passwords
    ```

=== "Example for file"

    ```bash
    teku voluntary-exit --validator-keys=/home/validator/keys/validator_217179e.json:/home/validator/passwords/validator_217179e.txt
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_KEYS=/home/validator/keys:home/validator/passwords
    ```

=== "Configuration file"

    ```bash
    validator-keys: "/home/validator/keys:home/validator/passwords"
    ```

Directory or file to load the encrypted keystores and passwords of the validators that you wish to
exit. Keystore files must use the `.json` file extension, and password files must use the `.txt`
file extension.

When specifying directories, Teku expects to find identically named
keystore and password files. For example `validator_217179e.json` and `validator_217179e.txt`.

When specifying file names, Teku expects that the files exist.

!!! note

    The path separator is operating system dependent, and should be `;` in Windows rather than `:`.

### validators-external-signer-keystore

=== "Syntax"

    ```bash
    teku voluntary-exit --validators-external-signer-keystore=<FILE>
    ```

=== "Example"

    ```bash
    teku voluntary-exit --validators-external-signer-keystore=teku_client_keystore.p12
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_KEYSTORE=teku_client_keystore.p12
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-keystore: "teku_client_keystore.p12"
    ```

The keystore that Teku presents to the external signer for TLS authentication. Teku can use
PKCS12 or JKS keystore types.

Use the PKCS12 keystore type if connecting to Web3Signer.

### validators-external-signer-keystore-password-file

=== "Syntax"

    ```bash
    teku voluntary-exit --validators-external-signer-keystore-password-file=<FILE>
    ```

=== "Example"

    ```bash
    teku voluntary-exit --validators-external-signer-keystore-password-file=keystore_pass.txt
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_KEYSTORE_PASSWORD_FILE=keystore_pass.txt
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-keystore-password-file: "keystore_pass.txt"
    ```

Password file used to decrypt the keystore.

### validators-external-signer-public-keys

=== "Syntax"

    ```bash
    teku voluntary-exit --validators-external-signer-public-keys=<KEY>[,<KEY>...]
    ```

=== "Example"

    ```bash
    teku voluntary-exit --validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_PUBLIC_KEYS=0xa99a...e44c,0xb89b...4a0b
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-public-keys: ["0xa99a...e44c","0xb89b...4a0b"]
    ```

List of public keys of validators that you wish to voluntarily exit when using an external signer
(for example, [Web3Signer]).

### validators-external-signer-timeout

=== "Syntax"

    ```bash
    teku voluntary-exit --validators-external-signer-timeout=<INTEGER>
    ```

=== "Example"

    ```bash
    teku voluntary-exit --validators-external-signer-timeout=2000
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_TIMEOUT=2000
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-timeout: 2000
    ```

Timeout in milliseconds for requests to the external signer. The default is 5000.

### validators-external-signer-truststore

=== "Syntax"

    ```bash
    teku voluntary-exit --validators-external-signer-truststore=<FILE>
    ```

=== "Example"

    ```bash
    teku voluntary-exit --validators-external-signer-truststore=websigner_truststore.p12
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_TRUSTSTORE=websigner_truststore.p12
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-truststore: "websigner_truststore.p12"
    ```

PKCS12 or JKS keystore used to trust external signer's self-signed certificate or CA certificate
which signs the external signer's certificate.

### validators-external-signer-truststore-password-file

=== "Syntax"

    ```bash
    teku voluntary-exit --validators-external-signer-truststore-password-file=<FILE>
    ```

=== "Example"

    ```bash
    teku voluntary-exit --validators-external-signer-truststore-password-file=truststore_pass.txt
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_TRUSTSTORE_PASSWORD_FILE=truststore_pass.txt
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-truststore-password-file: "truststore_pass.txt"
    ```

Password file used to decrypt the keystore.

### validators-external-signer-url

=== "Syntax"

    ```bash
    teku voluntary-exit --validators-external-signer-url=<URL>
    ```

=== "Example"

    ```bash
    teku voluntary-exit --validators-external-signer-url=http://localhost:9000
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_URL=http://localhost:9000
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-url: "http://localhost:9000"
    ```

URL of the external signer (for example, [Web3Signer]).

<!-- links -->
[Web3Signer]: https://docs.web3signer.consensys.net/en/latest/
