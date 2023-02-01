---
title: Load validators without restarting
description: How to load validators without restarting Teku
sidebar_position: 3
---

# Load validators without restarting Teku

You can load validators into a running Teku process, only if you started Teku by:

- Specifying a directory using [`--validator-keys`](../Reference/CLI/CLI-Syntax.md#validator-keys), or
- Specifying a URL using [`--validators-external-signer-public-keys`](../Reference/CLI/CLI-Syntax.md#validators-external-signer-public-keys).

!!! important

    * If you started Teku by specifying individual validator key files or external signer public keys,
        then you must restart Teku.

    * You must restart Teku to remove validators.

**Prerequisites:**

- Add the new validators to the directory specified in [`--validator-keys`](../Reference/CLI/CLI-Syntax.md#validator-keys), or ensure the URL supplied in [`--validators-external-signer-public-keys`](../Reference/CLI/CLI-Syntax.md#validators-external-signer-public-keys) contains the new public keys.

To load the validators in a running Teku instance, send a `SIGHUP` signal to the Teku process.

```bash
kill -HUP <PID>
```

Where `<PID>` is the process ID of the running Teku instance.
