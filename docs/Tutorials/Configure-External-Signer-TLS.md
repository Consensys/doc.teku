---
title: Configure TLS communication with an external signer
---

# Configure TLS communication

Configure TLS communication with an external signer such as [Web3Signer] which accepts
connections from clients that use trusted CA certificates or self-signed certificates.

This tutorial configures TLS between Teku and Web3Signer, and use the
[`keytool`](https://docs.oracle.com/en/java/javase/12/tools/keytool.html) utility to generate
keystores and the truststore that contain self-signed certificates.

!!! info

    `keytool` is available with the JDK or JRE installation, you can also use OpenSSL.

**Prerequisites**:

- [Web3Signer installed](https://docs.web3signer.consensys.net/en/latest/HowTo/Get-Started/Install-Binaries/).
- [Web3Signer signing key files](https://docs.web3signer.consensys.net/en/latest/HowTo/Use-Signing-Keys/) for
    validators on the testnet.
- [Teku Installed](../HowTo/Get-Started/Installation-Options/Install-Binaries.md).
- [Java `keytool`](https://docs.oracle.com/en/java/javase/12/tools/keytool.html).
- A running execution layer node such as [Hyperledger Besu], or cloud-based service such as [Infura]
    synced to the Goerli testnet.

This tutorial connects to an ETH2 testnet, and uses [Infura] to access the
Goerli ETH1 testnet. You can sign up for a free [Infura] account, or you can start your own
[ETH1 Goerli node].

## 1. Create keystores

A keystore contains the certificate and private key used to authenticate yourself during TLS
mutual authentication.

Teku can use either the PKCS12 or JKS keystore type, whereas Web3Signer only uses a PKCS12 keystore.

For each keystore you must create a plain text file containing the password to decrypt the keystore.

### Web3Signer keystore and password file

1. Generate the Web3Signer keystore.

    ```bash
    keytool -genkeypair -keystore web3signer_keystore.p12 -storetype PKCS12 -storepass changeit -alias web3signer -keyalg RSA -keysize 2048 -validity 109500 -dname "CN=localhost, OU=PegaSys, O=ConsenSys, L=Brisbane, ST=QLD, C=AU" -ext san=dns:localhost,ip:127.0.0.1
    ```

    !!! info

        Common name (`CN`) is generally the fully qualified name of Web3Server, you can use
        `-ext san` to add additional hostnames or IP addresses. This allows the same certificate to
        be used for more than one hostname or IP address if Web3Signer is running on a different
        machine to Teku with multiple hostnames.

1. Create a plain text file (for example `web3signer_keystore_password.txt`) that stores the
    password used to create the keystore.

    !!! example "web3signer_keystore_password.txt"

        ```bash
        changeit
        ```

You now have the `web3signer_keystore.p12` and `web3signer_keystore_password.txt` files that must be
supplied when [starting Web3Signer](#4-start-web3signer).

### Teku keystore and password file

Teku presents the keystore to Web3Signer for TLS mutual authentication. We recommend using PKCS12.

1. Generate the Teku keystore.

    ```bash
    keytool -genkeypair -keystore teku_client_keystore.p12 -storetype PKCS12 -storepass changeit -alias teku_client -keyalg RSA -keysize 2048 -validity 109500 -dname "CN=teku, OU=PegaSys, O=ConsenSys, L=Brisbane, ST=QLD, C=AU"
    ```

    !!! info

        For Teku as a client, `CN` doesn't need to have a hostname, however it must be a lowercase value,
        such as `CN=teku`.

1. Create a plain text file (for example `teku_keystore_password.txt`) that stores the
    password used to create the keystore.

    !!! example "teku_keystore_password.txt"

        ```bash
        changeit
        ```

You now have the `teku_client_keystore.p12` and `teku_keystore_password.txt` files that must be
supplied when [starting Teku](#5-start-teku).

## 2. Create the truststore and password file

The truststore contains certificates that you are willing to trust. Create the truststore to trust
the Web3Signer certificate during TLS mutual authentication.

To create the truststore:

1. Export the Web3Signer public certificate from the Web3Signer keystore to `PEM` format.

    ```bash
    keytool -exportcert -keystore ./web3signer_keystore.p12 -alias web3signer -rfc -file web3signer.pem
    ```

1. Import the public certificate into a truststore to be used by Teku, and type `yes` if asked
    to trust the certificate.

    ```bash
    keytool -importcert -storetype PKCS12 -keystore web3signer_truststore.p12 -alias web3signer -trustcacerts -storepass changeit -file ./web3signer.pem
    ```

1. Create a plain text file (for example `truststore_pass.txt`) that stores the
    password used to create the keystore.

    !!! example "truststore_pass.txt"

        ```bash
        changeit
        ```

You now have the `web3signer_truststore.p12` and `truststore_pass.txt` files that must be
supplied when [starting Teku](#5-start-teku).

## 3. Create the known clients file

Web3Signer uses a known clients file to trust client certificates.

1. Retrieve the `CN` and `SHA256` details from the Teku keystore.

    ```bash
    keytool -list -v -keystore teku_client_keystore.p12
    ```

1. Create a plain text file (in this case `knownClients.txt`) and add the `CN` and `SHA256` details
    in one line (separated by a single space).

    ```bash
    teku 67:89:C8:95:70:E0:38:10:2F:AB:7E:A3:75:4A:8C:29:C1:64:52:37:E5:E9:CD:EF:CD:27:C2:88:BF:84:3A:A1
    ```

!!! info

    You can add multiple known clients to the file by adding the `CN` and `SHA256` details on a new
    line.

You now have the `knownClients.txt` file that must be supplied when
[starting Web3Signer](#4-start-web3signer).

## 4. Start Web3Signer

!!! danger

    This example disables [Web3Signer slashing protection], this is not recommended on
    Mainnet.

Start Web3Signer using the [keystore and password](#web3signer-keystore-and-password-file), and
[known clients file](#3-create-the-known-clients-file) created earlier.

```bash
web3signer --key-store-path=/Users/me/keyFiles/ \
--tls-keystore-file=/Users/me/certs/web3signer_keystore.p12 \
--tls-keystore-password-file=/Users/me/certs/web3signer_keystore_password.txt \
--tls-known-clients-file=/Users/me/certs/knownClients.txt \
eth2 --slashing-protection-enabled=false
```

## 5. Start Teku

Start Teku and specify the [keystore](#teku-keystore-and-password-file) and
[truststore](#2-create-the-truststore-and-password-file) created earlier, with the accompanying
password files.

!!! important

    This example connects to an [Infura] ETH1 endpoint, if running your own client, like
    [Hyperledger Besu], then add the JSON-RPC URL of the ETH1 node
    to the [`--eth1-endpoint`](../Reference/CLI/CLI-Syntax.md#eth1-endpoint-eth1-endpoints)
    command line option.

```bash
teku --network=prater \
--eth1-endpoint=https://goerli.infura.iov3/d0f36ceb0c324eef9984422efbc51f21 \
--validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b \
--validators-external-signer-url=https://localhost:9000 \
--validators-external-signer-truststore=/Users/me/certs/web3signer_truststore.p12 \
--validators-external-signer-truststore-password-file=/Users/me/certs/truststore_pass.txt \
--validators-external-signer-keystore=/Users/me/certs/teku_client_keystore.p12 \
--validators-external-signer-keystore-password-file=/Users/me/certs/teku_keystore_password.txt
```
<!-- links -->
[Web3Signer]: https://docs.web3signer.consensys.net/en/latest/
[Hyperledger Besu]: https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Installation-Options/Options/
[Infura]: https://infura.io/
[ETH1 Goerli node]: https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Starting-node/#run-a-node-on-goerli-testnet
[Web3Signer slashing protection]: https://docs.web3signer.consensys.net/en/latest/Concepts/Slashing-Protection/
