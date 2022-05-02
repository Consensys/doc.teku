---
description: Teku RESTful API
---

# REST API

## View the REST API documentation

View the [REST API documentation] for more information about the available APIs.

## Enable the REST API service

Enable the REST API service from the command line by setting the
[`--rest-api-enabled`](../CLI/CLI-Syntax.md#rest-api-enabled) command line option to `true`.

You can also interact with APIs using Swagger UI by enabling the API documentation endpoint.

!!! warning

    Only trusted parties should access the REST API. Do not directly expose these APIs publicly on
    production nodes.

Interact with Teku APIs using the web browser by setting the
[`--rest-api-docs-enabled`](../CLI/CLI-Syntax.md#rest-api-docs-enabled) command line option to `true`.

Access the APIs at `http:<interface>:<port>/swagger-ui` where:

* `interface` is specified using [`--rest-api-interface`](../CLI/CLI-Syntax.md#rest-api-interface)
* `port` is specified using [`--rest-api-port`](../CLI/CLI-Syntax.md#rest-api-port)

The default location is `http://localhost:5051/swagger-ui`.

You can also use tools such as [Postman] or [cURL] to interact with Teku APIs.

!!! example

    === "cURL request"

        ```bash
        curl -X GET "http://localhost:5051/eth/v1/node/identity"
        ```

    === "JSON Result"

        ```json
        {
           "data":{
              "peer_id":"16Uiu2HAkuWPWqF4W3aw9oo5Yw79v5muzBaaGTGKumuXR8qkSVq6y",
              "enr":"enr:-KG4QJ3PlL-XIRZCBq3L-uZ4wovEVEvxUMmvv75YDk9imb21clm0x3V2J5Vf9Zz3tLDpTplhG68_kzZPOxcU0ttwNDAEhGV0aDKQtTA_KgAAAAD__________4JpZIJ2NIJpcIS5a1YhiXNlY3AyNTZrMaECATVJhRqBrqyo8l6JKz6HidWL82kQcDmtKWuQZLDmZmqDdGNwgiMog3VkcILZIg",
              "p2p_addresses":[
                 "/ip4/10.0.0.42/tcp/9000/p2p/16Uiu2HAkuWPWqF4W3aw9oo5Yw79v5muzBaaGTGKumuXR8qkSVq6y"
              ],
              "discovery_addresses":[
                 "/ip4/10.0.0.42/udp/55586/p2p/16Uiu2HAkuWPWqF4W3aw9oo5Yw79v5muzBaaGTGKumuXR8qkSVq6y"
              ],
              "metadata":{
                 "seq_number":"0",
                 "attnets":"0x0000000000000000"
              }
           }
        }
        ```

## Enable the validator client API

The [validator client API](../../HowTo/External-Signer/Manage-keys.md) allows you to call the [key manager API endpoints]((https://ethereum.github.io/keymanager-APIs/))
and is enabled separately from the REST API methods.

Enable the validator client API service from the command line by setting the
[`--validator-api-enabled`](../CLI/CLI-Syntax.md#validator-api-enabled) command line option to `true`.

When enabling the validator client API, you must [create a keystore](../../HowTo/External-Signer/Manage-keys.md#create-a-keystore).
Set the keystore using [`--validator-api-keystore-file`](../CLI/CLI-Syntax.md#validator-api-keystore-file)
and the password file for the keystore using [`--validator-api-keystore-password-file`](../CLI/CLI-Syntax.md#validator-api-keystore-password-file).

The [OpenAPI specifications](https://swagger.io/specification/) for the validator client API are available at `/swagger-docs`
when the [`--validator-api-docs-enabled`](../CLI/CLI-Syntax.md#validator-api-docs-enabled) option is set to `true`.
The `/swagger-docs` endpoint defines the API if code generators are in use.

When enabling the API documentation endpoint, specify:

* `interface` using the [`--validator-api-interface`](../CLI/CLI-Syntax.md#validator-api-interface) option.
* `port` using the [`--validator-api-port`](../CLI/CLI-Syntax.md#validator-api-port) option.

<!-- Links -->
[REST API documentation]:https://consensys.github.io/teku/#stable
[Postman]: https://www.postman.com/
[cURL]: https://curl.haxx.se/
