---
title: Enable validator slashing protection
description: Shut down the validator client if any owned validator is slashed.
sidebar_position: 8
---

# Enable validator slashing protection

Validator slashing protection monitors the validators slashing and shuts down the validator client when any of the owned validator is slashed.

When enabled, the validator slashing protection is triggered whenever an attester or proposer slashing event is received through the peer to peer network and will terminate the validator client with exit code `2`.
When that happens, the validator client should not be restarted by default because more slashing are likely to happen. We recommend restarting the validator client with the [Doppelganger Detection](./enable-doppelganger-detection.md) enabled.

:::warning

The validator slashing protection is imperfect and might fail to detect slashing events rapidly. Use this as a last resort option that might prevent validators from being slashed.

:::

## Enable validator slashing protection

Enable validator slashing protection by setting the
[`--validator-slashing-protection-enabled`](../reference/cli/index.md#validator-slashing-protection-enabled)
option to `true`.

Your validator client must be connected to a beacon node that supports the `proposer_slashing` and `attester_slashing` SSE event streams (both supported by Teku beacon node).

## Side effects

The validator slashing protection is intended to prevent a massive slashing. When triggered the validator client will terminate and all the running validator will stop performing their duties.

:::warning

Stopping the validators might cause:

- Missed attestations.
- Missed sync committee contributions.
- Missed block proposals.

These side effects result in penalties and missed rewards.

:::

You might still consider these side effects a worthwhile trade-off of the validator slashing protection, since it can prevent more slashing.

## Logs

When enabled, the validator slashing protection prints the following log when an owned validator is slashed:

```bash title="Example validator protection log when a validator is slashed"
Validator(s) with public key(s) {} got slashed: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001, 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002.  Shutting down validator client...
```
