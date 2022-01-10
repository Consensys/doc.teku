---
title: Configure TLS for an external signer
---

# Configure TLS

You can configure TLS for communication between Teku and an external signer, for example [Web3Signer].

!!! info

    The [Teku and Web3Signer TLS configuration tutorial] provides instructions to create the required
    keystores and configuration.

## Prerequisites

**Web3Signer prerequisites**:

* [Password-protected PKCS12 keystore and password file].
* [Known clients file].

**Teku prerequisites**:

* [Teku's password-protected PKCS12 or JKS keystore and password file].
* [Web3Signer's password-protected PKCS12 or JKS truststore and password file].
* ETH1 client (for example [Hyperledger Besu]) synced to the required network.

## Start Web3Signer

Start Web3Signer with the TLS configuration options and specify the keystore and known clients file.

```bash
web3signer --key-store-path=/Users/me/keyFiles/ \
--tls-keystore-file=/Users/me/certs/web3signer_keystore.p12 \
--tls-keystore-password-file=/Users/me/certs/web3signer_keystore_password.txt \
--tls-known-clients-file=/Users/me/certs/knownClients.txt \
eth2
```

!!! note

    [Slashing protection] is enabled by default when using the `eth2` Web3Signer subcommand.
    If using Web3Signer slashing protection, ensure you [configure your slashing protection database].

## Start Teku

Start Teku with the external signer, keystore, and truststore details:

```bash
teku --network=prater \
--eth1-endpoint=http://localhost:8545 \
--validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b \
--validators-external-signer-url=https://localhost:9000 \
--validators-external-signer-truststore=/Users/me/certs/web3signer_truststore.p12 \
--validators-external-signer-truststore-password-file=/Users/me/certs/truststore_pass.txt \
--validators-external-signer-keystore=/Users/me/certs/teku_client_keystore.p12 \
--validators-external-signer-keystore-password-file=/Users/me/certs/teku_keystore_password.txt
```

In the command:

* Specify the JSON-RPC URL of the ETH1 node using
    [`--eth1-endpoint`](../../Reference/CLI/CLI-Syntax.md#eth1-endpoint-eth1-endpoints).
* Specify the validator's public keys using
    [`--validators-external-signer-public-keys`](../../Reference/CLI/CLI-Syntax.md#validators-external-signer-public-keys).
* Specify the URL of the running external signer using
    [`--validators-external-signer-url`](../../Reference/CLI/CLI-Syntax.md#validators-external-signer-url).
* Specify the truststore and password file using
    [`validators-external-signer-truststore`](../../Reference/CLI/CLI-Syntax.md#validators-external-signer-truststore) and
    [`validators-external-signer-truststore-password-file`](../../Reference/CLI/CLI-Syntax.md#validators-external-signer-truststore-password-file).
* Specify the keystore and password file using
    [`validators-external-signer-keystore`](../../Reference/CLI/CLI-Syntax.md#validators-external-signer-keystore) and
    [`validators-external-signer-keystore-password-file`](../../Reference/CLI/CLI-Syntax.md#validators-external-signer-keystore-password-file).

<!-- links -->
[Web3Signer]: https://docs.web3signer.consensys.net/en/latest/
[Teku and Web3Signer TLS configuration tutorial]: ../../Tutorials/Configure-External-Signer-TLS.md
[Password-protected PKCS12 keystore and password file]: ../../Tutorials/Configure-External-Signer-TLS.md#web3signer-keystore-and-password-file
[Known clients file]: ../../Tutorials/Configure-External-Signer-TLS.md#3-create-the-known-clients-file
[Teku's password-protected PKCS12 or JKS keystore and password file]: ../../Tutorials/Configure-External-Signer-TLS.md#teku-keystore-and-password-file
[Web3Signer's password-protected PKCS12 or JKS truststore and password file]: ../../Tutorials/Configure-External-Signer-TLS.md#2-create-the-truststore-and-password-file
[Hyperledger Besu]: https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Installation-Options/Options/
[Slashing protection]: https://docs.web3signer.consensys.net/en/latest/Concepts/Slashing-Protection/
[configure your slashing protection database]: https://docs.web3signer.consensys.net/en/latest/HowTo/Configure-Slashing-Protection/
