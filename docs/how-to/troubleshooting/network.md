---
title: Network Troubleshooting
description: Solve common networking problems encountered with Teku.
sidebar_position: 15
---

# Network Troubleshooting

## Sync is taking a long time / How do I make sync go faster?
When syncing any consensus client you want to use checkpoint sync, and it will be up and in sync a minute or two later. The option to do that in Teku is `--initial-state` which takes either a URL or a file that provides a recent finalised `BeaconState`. Any sync'd beacon node can provide this from the standard API and there are a bunch of public sources, including Infura, with more listed at https://eth-clients.github.io/checkpoint-sync-endpoints/.

The `--initial-state` option is only used when first creating a database so since you're partway through syncing you'll want to stop Teku, add the `--initial-state` option, delete the `beacon` directory under your data path and then start Teku again. It should then be in sync within a couple of minutes. It will then download historic blocks in the background, so it can help any peers that are syncing from genesis. However, it can run validators and attest etc. while that's still happening.

## How do I locate the multi address and\or enr of my Teku beacon node?
Teku outputs its ENR to the logs at startup. You can also access the info via the API: `curl "http://127.0.0.1:5051/eth/v1/node/identity" | jq`

ENR can be decoded here: https://enr-viewer.com/

## How many peers do I need? (Or other peering issues)
Teku's default target is 74 peers, and runs happily with 100 peers. More peers does help up to a point. The main thing is to make sure that you have both inbound and outbound peers as this will give you the best mix and chance of good connectivity. If you are behind a NAT router, be sure to allow both UDP and TCP traffic for Teku to be forwarded inbound (port 9000 by default). You can check your current peer list if you have the API running with `curl -X GET "http://127.0.0.1:5051/eth/v1/node/peers" -H "accept: application/json"`. You should look for a good number marked `"direction": "inbound"`. If you don't see any, then you need to forward your NAT (or maybe check firewall rules to allow inbound on port 9000).

Prysm has a nice guide on this https://docs.prylabs.network/docs/prysm-usage/p2p-host-ip/, but you need to substitute 9000 for the port numbers.

If you are looking for just the direction, and can copy and paste a command to your terminal. This command shows direction counts:
```
curl http://127.0.0.1:5051/eth/v1/node/peers |jq '.data | group_by(.direction)[] | {direction: .[0].direction, count: length}'
```

## Poor Attestation Performance
Adrian made an excellent video related to this: https://www.symphonious.net/2020/09/08/exploring-eth2-attestation-inclusion/. It's a little old, so some specifics are out of date, but the general picture is still very relevant.

Bottom line is, it's complicated. Remedies depend on identifying the root cause.

**Common issues:**
1. *The CPU is overloaded and Teku is lagging.* Check your CPU stats, and check the console for "regenerating state" messages that frequently appear when Teku is struggling. In this case, `p2p-subscribe-all-subnets-enabled` might do more harm than good as it will increase CPU use. One common issue is when the JVM does not have sufficient heap allocated so garbage collection goes crazy. You should have an environment variable setting like `JAVA_OPTS=-Xmx5g` somewhere in your set-up. `5g` is great (five gigabytes of heap). `4g` is okay, much less than that is probably going to start causing issues.
2. *Time sync on your server being poor.* Make sure your ntpd or chrony is correctly configured.
3. *Low numbers of peers, or poor quality peers.* What is your actual peer number? If you do `curl -X GET "http://127.0.0.1:5051/eth/v1/node/peers" -H "accept: application/json"` do you see the majority of peers labelled with `"direction": "inbound"`? If there are no inbound peers it means that a firewall or NAT configuration is preventing remote peers from finding you and that should be addressed. In general, raising the peer limit is good. We usually run with max peers being around 100 and performance is great.

## Attestation performance v2
* *Check the server's clock sync.* Make sure your ntpd or chrony is correctly configured.
* *Check your peer connections.* By default you should have around 74. Increasing that can help (around 100). But the quality of peers is more important. If you do `curl -X GET "<http://127.0.0.1:5051/eth/v1/node/peers"> -H "accept: application/json"` consider if you see the majority of peers labelled with `"direction": "inbound"`?
* *Make sure your bandwidth is acceptable.* An example is someone was on an ADSL link with only about 2.5Mbps upstream which led to misses. From experience, 10Mbps upstream is acceptable.
* *Double-check the CPU load and heap space for Teku.* If "regenerating state" messages frequently appear on the console then Teku is struggling. One common issue is when the JVM does not have sufficient heap allocated so garbage collection goes crazy. You should have an environment variable setting like `JAVA_OPTS=-Xmx5g` somewhere in your set-up. `5g` is great (five gigabytes of heap). `4g` is acceptable, but much less than that may start causing issues.

## Missing attestations or attestations not being included
* It is possible that there were no peers on the attestation subnet.
  * 23.1.1 included a log message when it tries to publish and there are no peers subscribed to the subnet. It looks like: `Failed to publish ... for slot ... because no peers were available on the required gossip topic`
* It could be a number of factors, for example, late block after your inclusion slot leading to downstream effects. This means it'd also be worth looking at the epochs where you were due to attest and seeing if there's late block import warnings.
* Another thing to look at is if it's at specific times of the day and what else might be happening on the network at the time. Maybe it's hard to get messages out for some other reason, for example, a bandwidth constraint.

## Invalid configuration: signer public key is invalid
**With the detail:**
```
Caused by: java.lang.IllegalArgumentException: Expected 48 bytes but received 58.
```

This occurs when `validators-external-signer-public-keys` is specified in the config file and the public keys are not quoted. 0x prefixed values in YAML are considered numbers and the YAML parser is converting them to binary format which Teku does not expect. Older versions of Teku used a YAML parser that did not do that conversion to number, so it worked quoted or unquoted.

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

## Teku Crashes with SIGILL
The BLST library is incorrectly using the optimised version instead of the portable one. This may indicate that the CPU auto-detection got it wrong, in which case finding out the CPU details will help us improve it. Get the contents of `/proc/cpuinfo` on Linux or the output of running `/usr/sbin/sysctl -a` on a Mac. More likely the user has forced BLST to optimal.

You can specifically request the portable version of BLST (overriding CPU detection) with the following:
```
JAVA_OPTS="-Dteku.portableBlst=true"
```

If the user has already set `-Dteku.portableBlst=false` it should be changed to `true`.

## How to force the use of the optimised BLST
Check the logs at startup for `Using optimized BLST library` if it was able to detect a compatible CPU or `Using portable BLST library` if it could not.

You can force it to use the optimized version by setting the env var `TEKU_OPTS="-Dteku.portableBlst=false"`. If you're already setting `TEKU_OPTS` or `JAVA_OPTS` just add the `-Dteku.portableBlst=false` to what you already have. If you use the optimized library on a CPU that doesn't support it Teku will crash with a `SIGILL` in which case you should switch back to the portable version (`TEKU_OPTS="-Dteku.portableBlst=true"`).

## How do I configure an archive node?
The option `data-storage-mode` should be set to archive. You must provide an `initial-state` to get up and running, then you could use `reconstruct-historic-states` to rebuild all the old states once blocks have been downloaded (which automatic with that feature enabled). It will take a while to build up the node, but you'll be able to access everything (state or block) back to genesis once it is completed.

More information on the `command line options`:
* [reconstruct-historic-states](../../reference/cli/index.md#reconstruct-historic-states)
* [initial-state](../../reference/cli/index.md#initial-state)
* [data-storage-mode](../../reference/cli/index.md#data-storage-mode)
