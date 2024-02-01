---
title: Enable shut down Teku if any owned validator is slashed
description: Shut down Teku if any owned validator is slashed.
sidebar_position: 8
---

# Shut down Teku if any owned validator is slashed

When enabled, this feature will monitor the validators slashings and shut down the Teku client when any of the owned validator is slashed.

If any owned validator is slashed,  the Teku client will shut down with exit code `2`.
When that happens, the Teku client should not be restarted by default because more slashing are likely to happen. We recommend restarting the Teku client with the [Doppelganger Detection](./enable-doppelganger-detection.md) enabled.

:::warning

The validator slashing detection is an **early access and experimental** feature.
This feature is imperfect and might fail to detect slashing events rapidly. Use it as a last resort option that might prevent validators from being slashed.

:::

## Enable shut down Teku if any owned validator is slashed

Enable this feature by setting the `--Xshut-down-when-validator-slashed-enabled` option to `true`.

:::warning

When running a separate validator-client, it must be connected to a beacon node that supports the `proposer_slashing` and `attester_slashing` SSE event streams (both supported by Teku beacon node).

:::

## Side effects

The Teku client shut down is intended to prevent a massive slashing.  
When triggered, the Teku client will terminate and all the running validators will stop performing their duties.

:::warning

Stopping the validators might cause:

- Missed attestations.
- Missed sync committee contributions.
- Missed block proposals.

These side effects result in penalties and missed rewards.

:::

You might still consider these side effects a worthwhile trade-off since they can prevent more slashing.

## Logs

When enabled, the following log will be printed when any owned validator is slashed:

```bash title="Example Teku client shut down when an owned validator is slashed"
Validator(s) with public key(s) 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001, 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002 got slashed.  Shutting down...
```
