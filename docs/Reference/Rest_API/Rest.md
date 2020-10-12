---
description: Teku RESTful API
---

# REST API

[Enable the REST API service](#enable-the-rest-api-service) from the command line. You can also
interact with APIs using Swagger UI by enabling the API documentation endpoint.

View the [REST API documentation] for more information about the available APIs.

## Enable the REST API service

Enable the REST API service by setting the [`--rest-api-enabled`](../CLI/CLI-Syntax.md#rest-api-enabled)
command line option to `true`.

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

    ```bash
    curl -X GET "http://localhost:5051/beacon/committees?epoch=2"
    ```

## REST API endpoints

The REST API is logically divided into multiple endpoints.

| Endpoint         | Description                                 |
|------------------|---------------------------------------------|
| [**/admin**]     | Provides network administration functionality. |
| [**/beacon**]    | General information about the beacon chain. |
| [**/network**]   | Information about the network.              |
| [**/node**]      | Information about the beacon node.          |
| [**/validator**] | Provide information and functionality for validator clients. |

<!-- Links -->
[REST API documentation]:https://pegasyseng.github.io/teku/#stable/
[**/admin**]:https://pegasyseng.github.io/teku/#tag/Admin
[**/beacon**]:https://pegasyseng.github.io/teku/#tag/Beacon
[**/network**]:https://pegasyseng.github.io/teku/#tag/Network
[**/node**]:https://pegasyseng.github.io/teku/#tag/Node
[**/validator**]:https://pegasyseng.github.io/teku/#tag/Validator
[Postman]: https://www.postman.com/
[cURL]: https://curl.haxx.se/
