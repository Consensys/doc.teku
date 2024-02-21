---
description: Shut down Teku if a validator is slashed.
sidebar_position: 3
---

# Stop Teku if a validator is slashed

Validator slashing detection monitors validator slashing and shuts down the Teku client when any
owned validator is slashed.

If a validator is slashed, Teku shuts down with exit code `2`.
When that happens, you should not restart Teku by default because validators will likely continue to
be slashed.
We recommend restarting Teku with [doppelganger detection](detect-doppelgangers.md) enabled.

:::warning

Validator slashing detection is an **early access feature**.
This feature is imperfect and might fail to detect slashing events rapidly.
Use it as a last resort option that might prevent validators from being slashed.

:::

## Enable validator slashing detection

Enable validator slashing detection, which shuts down Teku when a validator is slashed, by setting
the `--Xshut-down-when-validator-slashed-enabled` option to `true`.

:::warning

When running a separate validator client, it must be connected to a beacon node that supports the
`proposer_slashing` and `attester_slashing` SSE event streams (both supported by the Teku beacon node).

:::

## Side effects

The purpose of shutting down Teku when a validator is slashed is to prevent a massive slashing.  
When triggered, the Teku client terminates and all the running validators stop performing their duties.

:::warning

Stopping the validators might cause:

- Missed attestations.
- Missed sync committee contributions.
- Missed block proposals.

These side effects result in penalties and missed rewards.

:::

You might still consider these side effects a worthwhile trade-off of validator slashing detection,
since it can prevent more slashing.

## Logs

When validator slashing detection is enabled, Teku will print logs when any owned validator is slashed.
For example:

```bash
Validator(s) with public key(s) 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001, 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002 got slashed.  Shutting down...
```
