---
description: Manage validator signing keys
---

# Manage validator signing keys

You can manage the signing keys of validators using the [key manager API endpoints](https://ethereum.github.io/keymanager-APIs/).
You can list keys, import keystores, and delete keys with the API.

## Enable validator client API

To use the key manager API endpoints, you must [enable the validator client API](../../Reference/Rest_API#enable-the-validator-client-api)
using the [`--validator-validator-api-enabled`](../../Reference/CLI/CLI-Syntax.md#validator-api-enabled) option.
You must also [create a keystore](#create-a-keystore) to enable access.

### Create a keystore

When enabling the validator client API, you must create a keystore.

1. Use a tool such as [keytool](https://docs.oracle.com/javase/6/docs/technotes/tools/solaris/keytool.html) or [openSSL](https://www.openssl.org/)
   to generate a keystore.

    === "Syntax"

        ```bash
        keytool -keystore <keystore> -storetype PKCS12 -storepass <password>
        ```

    === "Example"

        ```bash
        keytool -keystore validator_keystore.p12 -storetype PKCS12 -storepass changeit
        ```

2. Create a plain text file (for example `validator_keystore_pass.txt`) that stores the
   password you defined in the keystore.

3. Start Teku using [`--validator-api-keystore-file`](../../Reference/CLI/CLI-Syntax.md#validator-api-keystore-file)
   to define the keystore file and [`--validator-api-keystore-password-file`](../../Reference/CLI/CLI-Syntax.md#validator-api-keystore-password-file)
   to define the password file.

    !!! example

        ```bash
        teku --validator-validator-api-enabled --validator-api-keystore-file=validator_keystore.p12 --validator-api-keystore-password-file=validator_keystore_pass.txt
        ```

### Authentication

Authentication verifies user access to requested validator client methods.

Upon startup of the validator client, Teku creates an API token at the path `/opt/teku/data/validator/key-manager`.
When calling an endpoint that requires authorization, you must send the generated token in the `Authorization` request header field with the `Bearer` authentication scheme.

!!! example

    ```bash
    curl -X POST -H 'Authorization: Bearer <JWT_TOKEN>' -d '{"jsonrpc":"2.0","method":"<API_METHOD>","params":[],"id":1}' <JSON-RPC-http-hostname:port>
    ```