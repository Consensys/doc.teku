---
title: Validator API options
---

# `Validator API`

TODO description

### validator-api-cors-origins

=== "Syntax"

    ```bash
    --validator-api-cors-origins="<URL>"[,"<URL>",...] or "*"
    ```

=== "Example"

    ```bash
    --validator-api-cors-origins="http://medomain.com","https://meotherdomain.com"
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_CORS_ORIGINS="http://medomain.com","https://meotherdomain.com"
    ```

=== "Configuration file"

    ```bash
    validator-api-cors-origins: ["http://medomain.com","https://meotherdomain.com"]
    ```

A comma-separated list of domain URLs for CORS validation.

Listed domains can access the node using validator API calls. If your client interacts with Teku
using a browser app (such as a block explorer), add the client domain to the list.

The default is "none." If you don't list any domains, browser apps can't interact with your
Teku node.

!!! tip

    For testing and development purposes, use `*` to accept requests from any domain.
    We don’t recommend accepting requests from any domain for production environments.

### validator-api-docs-enabled

=== "Syntax"

    ```bash
    --validator-api-docs-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --validator-api-docs-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_DOCS_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    validator-api-docs-enabled: true
    ```

Set to `true` to enable the [validator REST API documentation](../Rest_API/Rest.md#enable-the-validator-client-api).
The default is `false`.

When enabling the API documentation endpoint, you must also specify:

* `interface` by using [`--validator-api-interface`](#validator-api-interface).
* `port` by using [`--validator-api-port`](#validator-api-port).

### validator-api-enabled

=== "Syntax"

    ```bash
    --validator-api-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --validator-api-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    validator-api-enabled: true
    ```

Set to `true` to enable the [validator client API](../Rest_API/Rest.md#enable-the-validator-client-api).
The default is `false`.

If set to `true`, then use [`--validator-api-host-allowlist`](#validator-api-host-allowlist) to limit access
to trusted parties.

### validator-api-host-allowlist

=== "Syntax"

    ```bash
    --validator-api-host-allowlist=<hostname>[,<hostname>...]... or "*"
    ```

=== "Example"

    ```bash
    --validator-api-host-allowlist=medomain.com,meotherdomain.com
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_HOST_ALLOWLIST=medomain.com,meotherdomain.com
    ```

=== "Configuration file"

    ```bash
    validator-api-host-allowlist: ["medomain.com", "meotherdomain.com"]
    ```

A comma-separated list of hostnames to allow access to the [validator REST API](../Rest_API/Rest.md#enable-the-validator-client-api). By
default, Teku accepts access from `localhost` and `127.0.0.1`.

!!! warning

    Only trusted parties should access the API. Do not directly expose these APIs publicly on
    production nodes.

    We don't recommend allowing all hostnames (`"*"`) for production environments.

### validator-api-interface

=== "Syntax"

    ```bash
    --validator-api-interface=<HOST>
    ```

=== "Example"

    ```bash
    # to listen on all interfaces
    --validator-api-interface=0.0.0.0
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_INTERFACE=0.0.0.0
    ```

=== "Configuration file"

    ```bash
    validator-api-interface: "0.0.0.0"
    ```

The interface on which the [validator REST API](../Rest_API/Rest.md#enable-the-validator-client-api) listens.
The default is `127.0.0.1`.

### validator-api-keystore-file

=== "Syntax"

    ```bash
    --validator-api-keystore-file=<keystoreFile>
    ```

=== "Example"

    ```bash
    --validator-api-keystore-file=validator_keystorstore.p12
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_KEYSTORE_FILE=validator_keystore.p12
    ```

=== "Configuration file"

    ```bash
    validator-api-keystore-file: "validator_keystore.p12"
    ```

Keystore file for the [validator REST API](../Rest_API/Rest.md#enable-the-validator-client-api).
Teku can use PKCS12 or JKS keystore types.
You must [create a keystore](../../HowTo/External-Signer/Manage-keys.md#create-a-keystore) to enable access.

### validator-api-keystore-password-file

=== "Syntax"

    ```bash
    --validator-api-keystore-password-file=<keystorePasswordFile>
    ```

=== "Example"

    ```bash
    --validator-api-keystore-password-file=validator_keystore_pass.txt
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_KEYSTORE_PASSWORD_FILE=validator_keystore_pass.txt
    ```

=== "Configuration file"

    ```bash
    validator-api-keystore-password-file: "validator_keystore_pass.txt"
    ```

Password used to decrypt the keystore for the [validator REST API](../Rest_API/Rest.md#enable-the-validator-client-api).

### validator-api-port

=== "Syntax"

    ```bash
    --validator-api-port=<PORT>
    ```

=== "Example"

    ```bash
    --validator-api-port=5052
    ```

=== "Environment variable"

    ```bash
    TEKU_VALIDATOR_API_PORT=5052
    ```

=== "Configuration file"

    ```bash
    validator-api-port: 5052
    ```

The [validator REST API](../Rest_API/Rest.md#enable-the-validator-client-api) listening port (HTTP).
The default is 5052.
