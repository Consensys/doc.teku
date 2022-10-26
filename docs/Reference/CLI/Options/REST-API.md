---
title: REST API options
---

# `REST API`

TODO description

### rest-api-cors-origins

=== "Syntax"

    ```bash
    --rest-api-cors-origins[=<url>[,<url>...]...] or "*"
    ```

=== "Example"

    ```bash
    --rest-api-cors-origins="http://medomain.com","https://meotherdomain.com"
    ```

=== "Environment variable"

    ```bash
    TEKU_REST_API_CORS_ORIGINS="http://medomain.com","https://meotherdomain.com"
    ```

=== "Configuration file"

    ```bash
    rest-api-cors-origins: ["http://medomain.com","https://meotherdomain.com"]
    ```

A list of domain URLs for CORS validation. You must enclose the URLs in double quotes and separate
them with commas.

Listed domains can access the node using HTTP REST API calls. If your client interacts with Teku
using a browser app (such as a block explorer), add the client domain to the list.

The default is "none." If you don't list any domains, browser apps can't interact with your
Teku node.

!!! tip

    For testing and development purposes, use `*` to accept requests from any domain.
    We don’t recommend accepting requests from any domain for production environments.

### rest-api-docs-enabled

=== "Syntax"

    ```bash
    --rest-api-docs-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --rest-api-docs-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_REST_API_DOCS_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    rest-api-docs-enabled: true
    ```

Set to `true` to enable the REST API documentation.
The default is `false`.

The documentation can be accessed at `http://<interface>:<port>/swagger-ui` where:

* `interface` is specified using [`--rest-api-interface`](#rest-api-interface)
* `port` is specified using [`--rest-api-port`](#rest-api-port)

### rest-api-enabled

=== "Syntax"

    ```bash
    --rest-api-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --rest-api-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_REST_API_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    rest-api-enabled: true
    ```

Set to `true` to enable the [REST API service](../Rest_API/Rest.md).
The default is `false`.

If set to `true`, then use [`--rest-api-host-allowlist`](#rest-api-host-allowlist) to limit access
to trusted parties.

### rest-api-host-allowlist

=== "Syntax"

    ```bash
    --rest-api-host-allowlist=<hostname>[,<hostname>...]... or "*"
    ```

=== "Example"

    ```bash
    --rest-api-host-allowlist=medomain.com,meotherdomain.com
    ```

=== "Environment variable"

    ```bash
    TEKU_REST_API_HOST_ALLOWLIST=medomain.com,meotherdomain.com
    ```

=== "Configuration file"

    ```bash
    rest-api-host-allowlist: ["medomain.com", "meotherdomain.com"]
    ```

A comma-separated list of hostnames to allow access to the REST API. By
default, Teku accepts access from `localhost` and `127.0.0.1`.

!!! warning

    Only trusted parties should access the REST API. Do not directly expose these APIs publicly on
    production nodes.

    We don't recommend allowing all hostnames (`"*"`) for production environments.

### rest-api-interface

=== "Syntax"

    ```bash
    --rest-api-interface=<HOST>
    ```

=== "Example"

    ```bash
    # to listen on all interfaces
    --rest-api-interface=0.0.0.0
    ```

=== "Environment variable"

    ```bash
    TEKU_REST_API_INTERFACE=0.0.0.0
    ```

=== "Configuration file"

    ```bash
    rest-api-interface: "0.0.0.0"
    ```

Specifies the interface on which the REST API listens.
The default is `127.0.0.1`.

### rest-api-port

=== "Syntax"

    ```bash
    --rest-api-port=<PORT>
    ```

=== "Example"

    ```bash
    # to listen on port 3435
    --rest-api-port=3435
    ```

=== "Environment variable"

    ```bash
    TEKU_REST_API_PORT=3435
    ```

=== "Configuration file"

    ```bash
    rest-api-port: 3435
    ```

Specifies REST API listening port (HTTP).
The default is 5051.
