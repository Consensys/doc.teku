---
description: Teku RESTful APIa
---

# REST API

[Enable the REST API service](#enable-the-rest-api-service) from the command line, and enable
the API documentation endpoint to interact with APIs using Swagger UI.

[Teku REST API documentation] is also available.

## Enable the REST API service

Enable the REST API service by setting the [`--rest-api-enabled`](../CLI/CLI-Syntax.md#rest-api-enabled)
command line option to `true`.

You can interact with Teku APIs using the web browser by setting the
[`--rest-api-docs-enabled`](../CLI/CLI-Syntax.md#rest-api-docs-enabled) command line option to `true`.

Access the APIs at `http:<interface>:<port>/swagger-ui` where:

* `interface` is specified using [`--rest-api-interface`](../CLI/CLI-Syntax.md#rest-api-interface)
* `port` is specified using [`--rest-api-port`](../CLI/CLI-Syntax.md#rest-api-port)

The default location is `http://localhost:5051/swagger-ui`.

You can also use tools such as [Postman] or [cURL] to interact with Teku APIs.

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
[Teku REST API documentation]:https://pegasyseng.github.io/teku/latest/
[**/admin**]:https://pegasyseng.github.io/teku/latest/#tag/Admin
[**/beacon**]:https://pegasyseng.github.io/teku/latest/#tag/Beacon
[**/network**]:https://pegasyseng.github.io/teku/latest/#tag/Network
[**/node**]:https://pegasyseng.github.io/teku/latest/#tag/Node
[**/validator**]:https://pegasyseng.github.io/teku/latest/#tag/Validator
[Postman]: https://www.postman.com/
[cURL]: https://curl.haxx.se/