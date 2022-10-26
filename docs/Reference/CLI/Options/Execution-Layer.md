---
title: Execution Layer options
---

# `Execution Layer`

TODO description

### ee-endpoint

=== "Syntax"

    ```bash
    --ee-endpoint=<URL>
    ```

=== "Example"

    ```bash
    --ee-endpoint=http://localhost:8550
    ```

=== "Environment variable"

    ```bash
    TEKU_EE_ENDPOINT=http://localhost:8550
    ```

=== "Configuration file"

    ```bash
    ee-endpoint: "http://localhost:8550"
    ```

URL of the [execution client's](../../Concepts/Merge.md#execution-clients) Engine JSON-RPC APIs.
This replaces [`eth1-endpoint`](#eth1-endpoint-eth1-endpoints) after [The Merge](../../Concepts/Merge.md).

### ee-jwt-secret-file

=== "Syntax"

    ```bash
    --ee-jwt-secret-file=<FILE>
    ```

=== "Example"

    ```bash
    --ee-jwt-secret-file=ee-jwt-secret.hex
    ```

=== "Environment variable"

    ```bash
    TEKU_EE_JWT_SECRET_FILE=ee-jwt-secret.hex
    ```

=== "Configuration file"

    ```bash
    ee-jwt-secret-file: "ee-jwt-secret.hex"
    ```

Shared secret used to authenticate [execution clients](../../Concepts/Merge.md#execution-and-consensus-clients) when
using the Engine JSON-RPC API.
Contents of file must be 32 hex-encoded bytes.
May be a relative or absolute path.
See an [example of how to generate this](../../HowTo/Prepare-for-The-Merge.md#3-configure-the-json-web-token).

### builder-endpoint

=== "Syntax"

    ```bash
    --builder-endpoint=<URL>
    ```

=== "Example"

    ```bash
    --builder-endpoint=http://127.0.0.1:18550
    ```

=== "Environment variable"

    ```bash
    TEKU_BUILDER_ENDPOINT=http://127.0.0.1:18550
    ```

=== "Configuration file"

    ```bash
    builder-endpoint: "http://127.0.0.1:18550"
    ```

Specifies the address for an external [builder endpoint](../../HowTo/Builder-Network.md).
