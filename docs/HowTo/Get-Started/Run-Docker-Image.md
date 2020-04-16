---
description: Run Teku using the official docker image
---

# Running Teku from a Docker image

Teku provides a Docker image to run a Teku node in a Docker container.

Use this Docker image to run a Teku node without installing Teku.

**Prerequisites**:

* [Docker](https://docs.docker.com/install/)

## Run Teku Docker image

Display the Teku command line help using the Docker image

```bash
docker run pegasyseng/teku:develop --help
```

You can specify
[Teku environment variables](../../Reference/CLI/CLI-Syntax.md#teku-environment-variables) with the
docker image instead of the command line options.

!!! example

    ```bash
    docker run -p 9000:9000 -p 5051:5051 -e TEKU_REST_API_ENABLED=true -e TEKU_P2P_PORT=9000 -e TEKU_LOG_FILE=/var/lib/teku/LOG --mount type=bind,source=/Users/user1/teku/,target=/var/lib/teku pegasyseng/teku:develop --eth1-deposit-contract-address=dddddddddddddddddddddddddddddddddddddddd --eth1-endpoint=http://102.10.10.1:8545 --validators-key-file=var/lib/teku/validator_keys.yaml
    ```


## Exposing ports

Expose ports for P2P peer discovery, metrics, and REST APIs. You need
to expose the ports to use the default ports or the ports specified using
[`--metrics-port`](../../Reference/CLI/CLI-Syntax.md#metrics-port),
[`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port),
[`--p2p-advertised-port`](../../Reference/CLI/CLI-Syntax.md#p2p-advertised-port),
[`--rest-api-port`](../../Reference/CLI/CLI-Syntax.md#rest-api-port).

To run Teku exposing local ports for access:

```bash
docker run -p <localportP2P>:30303 -p <localportREST>:5051 pegasyseng/teku:develop --eth1-deposit-contract-address=<contractAddress> --eth1-endpoint=<URL> --validators-key-file=<FILE> --rest-api-enabled=true
```

!!! example
    ```
    docker run -p 30303:30303 -p 5051:5051 --mount type=bind,source=/Users/user1/teku/,target=/var/lib/teku pegasyseng/teku:develop --eth1-deposit-contract-address=dddddddddddddddddddddddddddddddddddddddd --eth1-endpoint=http://102.10.10.1:8545 --validators-key-file=/var/lib/teku/validator_keys.yaml --rest-api-enabled=true
    ```

## Run Teku using Docker Compose

**Prerequisites**:

* [Docker Compose](https://docs.docker.com/compose/)

The following `docker-compose.yml` file starts a [Hyperledger Besu] and Teku node.  

!!! note
    The example assumes the validators specified in [`--validators-key-file`](../../Reference/CLI/CLI-Syntax.md#validators-key-file) has already been
    [registered](Register-Validators.md) in the Ethereum 1.0 deposit contract.

```yaml
---
version: '3.4'
services:

  besu_node:
    image: hyperledger/besu:latest
    command: ["--genesis-file=/opt/besu/data/depositContractGenesis.json",
              "--data-path=/opt/besu/data/data",
              "--host-whitelist=*",
              "--rpc-http-enabled",
              "--rpc-http-cors-origins=*",
              "--rpc-http-api=ETH,NET,CLIQUE,DEBUG,MINER,NET,PERM,ADMIN,EEA,TXPOOL,PRIV,WEB3",
              "--miner-enabled=true",
              "--miner-coinbase=0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
              "--min-gas-price=0"]
    volumes:
      - ./besu:/opt/besu/data
    ports:
      - "8545:8545"
      - "30303:30303"
      
  teku_node:
    image: pegasyseng/teku:develop
    command: ["--eth1-deposit-contract-address=dddddddddddddddddddddddddddddddddddddddd",
              "--eth1-endpoint=http://besu_node:8545",
              "--validators-key-file=/opt/teku/data/validator_keys",
              "--p2p-port=9000",
              "--rest-api-enabled=true",
              "--rest-api-docs-enabled=true"]
    volumes:
      - ./:/opt/teku/data
    ports:
      - "9000:9000"
      - "5051:5051"
```

Run `docker-compose up` in the directory containing the `docker-compose.yml` file
to start the container.

<!-- Links -->
[Hyperledger Besu]: https://besu.hyperledger.org/en/stable/
