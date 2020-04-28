---
description: Use Eth2Signer for signing
---

# Use an external signer

Teku supports the [Eth2Signer] external signing client.

**Prerequisites**:

* Eth2Signer installed and running
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

* Specifies the validator public keys for which Eth2Signer signs attestations and blocks using
    [`--validators-external-signer-public-keys`](../../Reference/CLI/CLI-Syntax.md#validators-external-signer-public-keys).
* Specifies the url of the Eth2Signer client using
    [`--validators-external-signer-url`](../../Reference/CLI/CLI-Syntax.md#validators-external-signer-url).

!!! note
    Create a signing key configuration file for each public key specified using
    [`--validators-external-signer-public-keys`](../../Reference/CLI/CLI-Syntax.md#validators-external-signer-public-keys).

<!--links-->
[Eth2Signer]: https://doc.eth2signer.pegasys.tech/en/latest/
[Signing key configuration files]: https://doc.eth2signer.pegasys.tech/en/latest/HowTo/Use-Signing-Keys/