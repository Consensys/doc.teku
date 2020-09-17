---
description: Use Web3Signer for signing
---

# Use an external signer

Teku supports the [Web3Signer] external signing client.

**Prerequisites**:

* Web3Signer installed and running.
* [Signing key configuration files].

## Start Teku

Start Teku and specify the external signer options.

```bash
teku --eth1-deposit-contract-address=dddddddddddddddddddddddddddddddddddddddd \
--eth1-endpoint=http://localhost:8545 \
--validators-external-signer-public-keys=0xa99a...e44c,0xb89b...4a0b \
--validators-external-signer-url=http://localhost:9000
```

The command line:

* Specifies the validator public keys for which Web3Signer signs attestations and blocks using
    [`--validators-external-signer-public-keys`](../../Reference/CLI/CLI-Syntax.md#validators-external-signer-public-keys).
* Specifies the url of the Web3Signer client using
    [`--validators-external-signer-url`](../../Reference/CLI/CLI-Syntax.md#validators-external-signer-url).

!!! note
    You need a [signing key configuration file] for each public key specified using
    [`--validators-external-signer-public-keys`](../../Reference/CLI/CLI-Syntax.md#validators-external-signer-public-keys).

<!--links-->
[Web3Signer]: https://docs.web3signer.consensys.net/
[Signing key configuration files]: https://docs.web3signer.consensys.net/HowTo/Use-Signing-Keys/
[signing key configuration file]: https://docs.web3signer.consensys.net/en/latest/HowTo/Use-Signing-Keys/
