---
description: How to enable doppelganger detection
---

# Enable doppelganger detection

Doppelganger detection checks if the validators keys are already active before scheduling any of
their duties (the validators stay inactive for at most two epochs).
This can help prevent slashing offences.

When enabled, doppelganger detection is triggered from two entry points:

1. At [validator client startup](Get-Started/Run-Teku.md#start-teku): If at least one
   doppelganger is detected, the validator client shuts down after it finishes the check.
1. When importing keys via the [key manager API](https://ethereum.github.io/keymanager-APIs/): Any
   detected doppelganger's keys are ignored (not imported).
   The other keys are imported and the validators start performing their duties after it finishes
   the check.

!!! warning

    Doppelganger detection is an early access feature.
    This feature is imperfect and might fail to detect doppelgangers.
    Use this as a last resort option that might prevent validators from being slashed.

## Enable doppelganger detection

Enable doppelganger detection by setting the `--doppelganger-detection-enabled` option to `true`.

Your validator client must be connected to a beacon node with validators liveness tracking enabled.
Enable validators liveness tracking by setting the `--Xbeacon-liveness-tracking-enabled` option to `true`.

## Side effects

Doppelganger detection runs until one of the following occurs:

- All the loaded keys are detected as active.
- The check runs for two epochs.

This means that the validators being checked are inactive for at most two epochs.

!!! warning

    Keeping the validators inactive might cause:
    
    - Missed attestations.
    - Missed sync committee contributions.
    - Missed block proposals.

    These side effects result in penalties and missed rewards.

You might still consider these side effects a worthwhile trade-off of doppelganger detection, since
it can prevent slashing.

## Logs

When running, doppelganger detection prints various logs.

!!! example "Example startup logs"

    ```bash
    Starting doppelganger detection for public keys: b28ab22, c2bab15, cd26f5e
    ```

!!! example "Example logs when a check is performed (every 12 seconds)"

    ```bash
    Performing doppelganger check. Epoch 148220, Public keys b28ab22, c2bab15, cd26f5e
    ```

!!! example "Example logs when a doppelganger is detected"

    ```bash
    Detected 2 validators doppelganger:
    Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001
    Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002
    ```

!!! example "Example logs: list of detected doppelgangers"

    ```bash
    Detected 5 validators doppelganger:
      Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001
      Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002
      Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003
      Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004
      Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005
    ```

!!! example "Example logs when doppelganger detection ends"

    ```bash
    Doppelganger detection check finished. Stopping doppelganger detection for public keys b28ab22, c2bab15, cd26f5e
    ```
