---
description: Solve common networking problems encountered with Teku.
sidebar_position: 15
---

# Troubleshoot network issues

## Speed up sync time

Use [checkpoint sync](../../get-started/checkpoint-start.md) to sync Teku from a recent finalized checkpoint, bypassing
the need to sync from genesis and enabling a quick synchronization process within minutes. To do this, use the
[`--initial-state`](../../reference/cli/index.md#initial-state) CLI option which accepts a URL or file that provides a recent
finalized `BeaconState`. Any syncronized beacon node can provide this from the standard API, and you can view
[the list of public sources](https://eth-clients.github.io/checkpoint-sync-endpoints/).

The [`--initial-state`](../../reference/cli/index.md#initial-state) option is only used when you first create a database. To
restart an existing sync process with checkpoint sync, do the following:

- Stop the current Teku sync process
- Delete the `beacon` directory under your [data path](../../reference/cli/index.md#data-base-path-data-path)
- Start teku with the [`--initial-state`](../../reference/cli/index.md#initial-state) option 


Teku will sync within a few minutes, and downloads historic blocks in the background, so it can
help any peers that are syncing from genesis. Teku can run validators and attest while while historic blocks are being downloaded.

## Locate the multiaddress and/or ENR of a Teku beacon node

Teku outputs its Ethereum Name Record (ENR) to the logs at startup. You can also access the info via the API:

```bash
curl "http://127.0.0.1:5051/eth/v1/node/identity" | jq
```

You can decode the ENR by using the [ENR Viewer website](https://enr-viewer.com/).

## Resolve peering issues

Teku's default target is 74 peers, and performs well with 100 peers. Additional peers enhance performance up to a limit, but
a balanced combination of inbound and outbound peers is essential for optimal connectivity.

If you are behind a NAT router, ensure you allow both UDP and TCP traffic to be forwarded inbound to Teku (port `9000` by default).
You can check your current peer list if you have the API running with:

```bash
curl -X GET "http://127.0.0.1:5051/eth/v1/node/peers" -H "accept: application/json"`.
```

Search for "direction": "inbound" to confirm incoming traffic. If absent, forward your NAT or review firewall rules for
permitting inbound on port `9000`.

View the [Prysm guide](https://docs.prylabs.network/docs/prysm-usage/p2p-host-ip/) for more information on this topic, but
you need to substitute `9000` for the port numbers.

If you are looking just the direction of the traffic, copy and paste the following command to your terminal to show the
direction counts:

```bash
curl http://127.0.0.1:5051/eth/v1/node/peers |jq '.data | group_by(.direction)[] | {direction: .[0].direction, count: length}'
```

## Resolve poor attestation performance

Troubleshooting poor attestation performance is complicated, and the solution requires you to identify the root cause.

[This video](https://www.symphonious.net/2020/09/08/exploring-eth2-attestation-inclusion/) is a little old, but the general
picture is still relevant.

Common issues include:

* **The CPU is overloaded and Teku is lagging**. Monitor CPU stats, and watch the terminal for frequent `regenerating state`
    messages, common during Teku's struggle. In this context, enabling [`--p2p-subscribe-all-subnets`](../../reference/cli/index.md#p2p-subscribe-all-subnets-enabled) can worsen the situation by raising CPU usage. A typical problem arises when JVM lacks adequate heap allocation, causing
    aggressive garbage collection. Ensure an environment variable like `JAVA_OPTS=-Xmx5g` is set, with
    `5g` (five gigabytes of heap) as an optimal value; `4g` is acceptable, while anything much lower may lead to problems.

* **Time sync on your server is poor**. Ensure `ntpd` or `chrony` is configured correctly.

* **Low numbers of peers, or poor quality peers**. Refer to the [peering troubleshooting topic](#how-many-peers-do-i-need-or-other-peering-issues)
    for more information to resolve this.

* **Poor internet speed**. An example is someone was on an ADSL link with only about 2.5Mbps upstream which led to
    misses, typically anything over 10Mbps upstream is acceptable.


## Address missing attestations or non-inclusion issues

* No peers might have been present on the attestation subnet. Check for a log message when attempting to
    publish without subscribed peers: `Failed to publish ... for slot ... due to missing peers on the required gossip topic`.
* Several factors could contribute, such as delayed blocks past your inclusion slot causing ripple effects. Thus, examining
    epochs where your attestation was scheduled and checking for late block import warnings would be beneficial.
* Also, consider specific times of day and concurrent network activities. It's possible that message transmission could
    be hindered by factors like bandwidth limitations.

## Invalid signer public key configuration

You may see log error messages similar to:

```bash
Caused by: java.lang.IllegalArgumentException: Expected 48 bytes but received 58.
```

This arises if `validators-external-signer-public-keys` is in the config file without proper quotation for public keys.
In YAML, `0x` prefixed values are treated as numbers, leading the parser to convert them to an unexpected binary format
in Teku. Previous Teku versions had a YAML parser that didn't perform this conversion, making both quoted and unquoted
forms functional.

**Incorrect:**
```yaml
validators-external-signer-public-keys:
  - 0x8f9335f7d6b19469d5c8880df50bf41c01f476411d5b69a8b121255347f1c0b8400ba31a63010b229080240589ad2423
  - 0xb3f3faa8dfa1030714559b95cb0107e53c9ee9c6f2b4b11f29e60417dbc4462052ff2d2dbbe98d808e3093858a3acdcc
  - 0xb2f1e6c00c6716d4cd5cb02b42678ff481e3ae1525cdfc33e4a1711eeb2878da10ebeacdcdc2ef2049410fc60fe5cfe5
  - 0xb7d6cb9ce7397c33b89ec57de0de383c7c294687b8963f92cc60f59bb1de46c56623cd24c9cc1e407db92d1a79920887
  - 0xaf3eab6962987321bdf81e7a10239b91316c643cca64babe81d68e9f9030a6a7b91681168df5a02a9ac3433b8332a712
```

**Correct:**
```yaml
validators-external-signer-public-keys:
  - "0x8f9335f7d6b19469d5c8880df50bf41c01f476411d5b69a8b121255347f1c0b8400ba31a63010b229080240589ad2423"
  - "0xb3f3faa8dfa1030714559b95cb0107e53c9ee9c6f2b4b11f29e60417dbc4462052ff2d2dbbe98d808e3093858a3acdcc"
  - "0xb2f1e6c00c6716d4cd5cb02b42678ff481e3ae1525cdfc33e4a1711eeb2878da10ebeacdcdc2ef2049410fc60fe5cfe5"
  - "0xb7d6cb9ce7397c33b89ec57de0de383c7c294687b8963f92cc60f59bb1de46c56623cd24c9cc1e407db92d1a79920887"
  - "0xaf3eab6962987321bdf81e7a10239b91316c643cca64babe81d68e9f9030a6a7b91681168df5a02a9ac3433b8332a712"
```

## Teku crashes with SIGILL

The BLST library might erroneously use the optimized library version instead of the portable one. This could stem from CPU
auto-detection errors, in which case, obtaining the CPU details from `/proc/cpuinfo` on Linux or `/usr/sbin/sysctl -a` on macOS
will help us to improve it. Alternatively, users might have intentionally set BLST to optimal.

You can specifically request the portable version of BLST (overriding CPU detection) with the following:

```bash
JAVA_OPTS="-Dteku.portableBlst=true"
```

If the user has already set `-Dteku.portableBlst=false` it should be changed to `true`.

## Force Teku to use the optimized BLST library

Check the Teku logs at startup for `Using optimized BLST library` if it was able to detect a compatible CPU, or
`Using portable BLST library` if it could not.

You can force Teku to use the optimized version by setting the environment variable `TEKU_OPTS="-Dteku.portableBlst=false"`.
If you're already setting `TEKU_OPTS` or `JAVA_OPTS`, append `-Dteku.portableBlst=false` to the existing variable. If
you use the optimized library on a CPU that doesn't support it, Teku will crash with a `SIGILL`, in which case you should
switch back to the portable version (`TEKU_OPTS="-Dteku.portableBlst=true"`).

## Configure an archive node

Set [`--data-storage-mode`](../../reference/cli/index.md#data-storage-mode) to `archive`, and provide an
[`--initial-state`](../../reference/cli/index.md#initial-state), you can also use
[`--reconstruct-historic-states`](../../reference/cli/index.md#reconstruct-historic-states) to rebuild
all the old states once blocks have been downloaded.

It will take a while to build up the node, but you'll be able to access all state an block information back to genesis
after it is completed.
