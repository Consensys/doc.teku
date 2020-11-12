---
description: Run Teku using the official docker image
---

# Running Teku from a Docker image

Use the Teku Docker image to run a node without installing Teku.

**Prerequisites**:

* [Docker](https://docs.docker.com/install/)

## Run Teku Docker image

Display the Teku command line help using the Docker image

```bash
docker run consensys/teku:latest --help
```

You can specify
[Teku environment variables](../../../Reference/CLI/CLI-Syntax.md#teku-environment-variables) with the
docker image instead of the command line options.

!!! Example "Example using Environment variables and CLI options"

    ```bash
    docker run -d -p 9000:9000 -p 5051:5051 -e TEKU_REST_API_ENABLED=true -e TEKU_P2P_PORT=9000 --mount type=bind,source=/Users/user1/teku/,target=/var/lib/teku consensys/teku:latest --network=medalla --eth1-endpoint=http://102.10.10.1:8545 --validator-keys=/var/lib/teku/validator/keys:/var/lib/teku/validator/passwords --data-path=/var/lib/teku --log-destination=CONSOLE
    ```

!!! tips

    * If running Docker in the background, set [`--log-destination`](../../../Reference/CLI/CLI-Syntax.md#log-destination)
        to `console` to send all logs to the console and appear in Docker's log output.
    * Set [`--data-path`](../../../Reference/CLI/CLI-Syntax.md#data-path) to a mount point to ensure
        Teku data is not lost in the Docker filesystem.
    * [Set the Docker user to the UID of the normal user](#allow-multiple-users-to-run-the-docker-image)
        to ensure read/write access to the required files.

## Allow multiple users to run the Docker image

If using a local volume  to mount data, ensure the permissions on the directory allow other
users and groups to read/write.

Use the Docker [`--user`](https://docs.docker.com/engine/reference/commandline/run/) option to run
the container for the specified user. Use the UID because the username may not exist inside the
docker container.

!!! example

    ```bash
    docker run -p 9000:9000 --user 1001:1001 --mount type=bind,source=/Users/user1/teku/,target=/var/lib/teku consensys/teku:latest --network=medalla --eth1-endpoint=http://102.10.10.1:8545 --validator-keys=var/lib/teku/validator/keys:var/lib/teku/validator/passwords
    ```

## Exposing ports

Expose ports for P2P peer discovery, metrics, and REST APIs. Expose the default ports or the ports
specified using:

* [`--metrics-port`](../../../Reference/CLI/CLI-Syntax.md#metrics-port)
* [`--p2p-port`](../../../Reference/CLI/CLI-Syntax.md#p2p-port)
* [`--p2p-advertised-port`](../../../Reference/CLI/CLI-Syntax.md#p2p-advertised-port)
* [`--rest-api-port`](../../../Reference/CLI/CLI-Syntax.md#rest-api-port).

To run Teku exposing local ports for access:

```bash
docker run -p <localportP2P>:30303 -p <localportREST>:5051 consensys/teku:latest --network=<NETWORK> --eth1-endpoint=<URL> --validator-keys=<KEY_DIR>:<PASS_DIR> --rest-api-enabled=true
```

!!! example

    ```
    docker run -p 30303:30303 -p 5051:5051 --mount type=bind,source=/Users/user1/teku/,target=/var/lib/teku consensys/teku:latest --network=medalla --eth1-endpoint=http://102.10.10.1:8545 --validator-keys=var/lib/teku/validator/keys:var/lib/teku/validator/passwords --rest-api-enabled=true
    ```

## Run Teku using Docker Compose

**Prerequisites**:

* [Docker Compose](https://docs.docker.com/compose/)

The following `docker-compose.yml` file starts a [Hyperledger Besu] and Teku node.

!!! note

    The example assumes the validators specified in [`--validator-keys`](../../../Reference/CLI/CLI-Syntax.md#validator-keys) has already
    been registered in the Ethereum 1.0 deposit contract.

Run `docker-compose up` in the directory containing the `docker-compose.yml` file
to start the container.

```yaml
---
version: '3.4'
services:

  besu_node:
    image: hyperledger/besu:latest
    command: ["--network=goerli",
              "--data-path=/opt/besu/data/data",
              "--host-allowlist=*",
              "--sync-mode=FAST",
              "--rpc-http-enabled",
              "--rpc-http-cors-origins=*",
              "--rpc-http-api=ETH,NET,CLIQUE,DEBUG,MINER,NET,PERM,ADMIN,EEA,TXPOOL,PRIV,WEB3"]
    volumes:
      - ./besu:/opt/besu/data
    ports:
      # Map the p2p port(30303) and RPC HTTP port(8545)
      - "8545:8545"
      - "30303:30303"

  teku_node:
    image: consensys/teku:latest
    command: ["--network=medalla",
              "--eth1-endpoint=http://besu_node:8545",
              "--validator-keys=/opt/teku/data/validator/keys:/opt/teku/data/validator/passwords",
              "--p2p-port=9000",
              "--rest-api-enabled=true",
              "--rest-api-docs-enabled=true"]
    depends_on:
      - besu_node
    volumes:
      - ./teku:/opt/teku/data
    ports:
      # Map the p2p port(9000) and REST API port(5051)
      - "9000:9000"
      - "5051:5051"
```

<!-- Links -->
[Hyperledger Besu]: https://besu.hyperledger.org/en/stable/
