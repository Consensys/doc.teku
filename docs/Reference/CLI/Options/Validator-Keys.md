---
title: Validator Keys options
---

# `Validator Keys`

TODO description

### validator-keys

=== "Syntax"

    ```bash
    --validator-keys=<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>[,<KEY_DIR>:<PASS_DIR> | <KEY_FILE>:<PASS_FILE>...]...
    ```

=== "Example for directory"

    ```bash
    --validator-keys=/home/validator/keys:home/validator/passwords
    ```

=== "Example for file"

    ```bash
    --validator-keys=/home/validator/keys/validator_217179e.json:/home/validator/passwords/validator_217179e.txt
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_KEYS=/home/validator/keys:home/validator/passwords
    ```

=== "Configuration file"

    ```bash
    validator-keys: "/home/validator/keys:home/validator/passwords"
    ```

Directory or file to load the encrypted keystore file(s) and associated password file(s) from.
Keystore files must use the `.json` file extension, and password files must use the `.txt` file
extension.

When specifying directories, Teku expects to find identically named
keystore and password files. For example `validator_217179e.json` and `validator_217179e.txt`.

!!! tip

    You can [load new validators without restarting Teku] if you specify a directory from which
    to load the keystore files.

When specifying file names, Teku expects that the files exist.

!!! note

    The path separator is operating system dependent, and should be `;` in Windows rather than `:`.

### validators-external-signer-keystore

=== "Syntax"

    ```bash
    --validators-external-signer-keystore=<FILE>
    ```

=== "Example"

    ```bash
    --validators-external-signer-keystore=teku_client_keystore.p12
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
    --validators-external-signer-keystore-password-file=<FILE>
    ```

=== "Example"

    ```bash
    --validators-external-signer-keystore-password-file=keystore_pass.txt
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
    --validators-external-signer-public-keys=<KEY>[,<KEY>...]
    ```

=== "Example"

    ```bash
    --validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_PUBLIC_KEYS=0xa99a...e44c,0xb89b...4a0b
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-public-keys: ["0xa99a...e44c","0xb89b...4a0b"]
    ```

List or URL of validator public keys used by an external signer (for example, Web3Signer).

Use the URL of the external signer's [`/publicKeys` endpoint](https://consensys.github.io/web3signer/web3signer-eth2.html#tag/Public-Key)
to load the public keys of all registered validators. For example:

```bash
--validators-external-signer-public-keys=http://localhost:9000/api/v1/eth2/publicKeys
```

!!! tip

    You can [load new validators without restarting Teku] if you specify a URL from which
    to load the public keys.

Ensure the external signer is running before starting Teku.

### validators-external-signer-slashing-protection-enabled

=== "Syntax"

    ```bash
    --validators-external-signer-slashing-protection-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --validators-external-signer-slashing-protection-enabled=false
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_SLASHING_PROTECTION_ENABLED=false
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-slashing-protection-enabled: false
    ```

Specify whether to use Teku's built-in [slashing protection] when using an external signer such as
[Web3Signer]. The default is `true`.

Set this option to `false` if using the slashing protection implemented by an external signer.

!!! warning

    Ensure the external signer has slashing protection enabled before disabling Teku
    slashing protection, otherwise a validator may get slashed.

Built-in slashing protection can only be disabled for validators using external signers. Validators
using Teku to sign blocks and attestations always uses its built-in slashing protection.

### validators-external-signer-timeout

=== "Syntax"

    ```bash
    --validators-external-signer-timeout=<INTEGER>
    ```

=== "Example"

    ```bash
    --validators-external-signer-timeout=2000
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
    --validators-external-signer-truststore=<FILE>
    ```

=== "Example"

    ```bash
    --validators-external-signer-truststore=websigner_truststore.p12
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
    --validators-external-signer-truststore-password-file=<FILE>
    ```

=== "Example"

    ```bash
    --validators-external-signer-truststore-password-file=truststore_pass.txt
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
    --validators-external-signer-url=<URL>
    ```

=== "Example"

    ```bash
    --validators-external-signer-url=http://localhost:9000
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATORS_EXTERNAL_SIGNER_URL=http://localhost:9000
    ```

=== "Configuration file"

    ```bash
    validators-external-signer-url: "http://localhost:9000"
    ```

URL on which the external signer (for example, Web3Signer) is running.
