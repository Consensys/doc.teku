---
description: Doppelganger Detection
---

# Doppelganger Detection

When enabled, the Doppelganger Detection will check if the validators keys are already active before scheduling any of their duties (The validators will stay inactive for at most 2 epochs).  
The doppelgangers detection is triggered from two entry points:
1. At [validator client startup](../HowTo/Get-Started/Run-Teku.md#start-teku): If at least one doppelganger is detected, the VC will shut down after it finishes the check
2. When importing keys via the [Key-Manager API](https://ethereum.github.io/keymanager-APIs/): The detected doppelgangers keys will be ignored (not imported). The other keys will be imported and the validators will start performing their duties after it finishes the check

!!! important

    The Doppelganger Detection feature is still in Beta version.
    The Doppelganger Detection feature is imperfect and could fail to detect doppelgangers (there is no guarantee that the BN will see the eventual doppelganger for different reasons: network failure, no messages seen from it...).
    It must be considered as a last resort option that might prevent a validators from being slashed.

## Enabling Doppelganger Detection
The doppelganger detection feature could be enabled using the `--Xdoppelganger-detection-enabled` option:

=== "Syntax"

    ```bash
    --Xdoppelganger-detection-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --Xdoppelganger-detection-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_XDOPPELGANGER_DETECTION_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    Xdoppelganger-detection-enabled: true
    ```


!!! important
Your validator client must be connected to a beacon node with the liveness tracking enabled `--Xbeacon-liveness-tracking-enabled`.

=== "Syntax"

    ```bash
    --Xbeacon-liveness-tracking-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --Xbeacon-liveness-tracking-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_XBEACON_LIVENESS_TRACKING_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    Xbeacon-liveness-tracking-enabled: true
    ```

## Side effects (Penalties)
The Doppelganger Detection runs until:
- All the loaded keys are detected active  
OR
- The check has been running for two epochs

This means that the validators that are being checked will be inactive for at most two epochs.
Keeping the validators silent will cause:
- Missed attestations
- Missing sync committee contributions
- Possibly missing block proposal

All the above will result in penalties and rewards misses.  
The loss could yet be considered a worthwhile trade-off since it could prevent slashing. 

## Doppelganger Detection result
When running, the DG detection will print different logs:
- When started:
  `Starting doppelganger detection for public keys: b28ab22, c2bab15, cd26f5e`
- When a check is performed (every 12s):
  `Performing doppelganger check. Epoch 148220, Public keys b28ab22, c2bab15, cd26f5e`
- Whenever a doppelganger is detected:
  `Detected 2 validators doppelganger:
  Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001
  Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002`
- At the end of the DG detection, a full list of all the detected DGs:
  `Detected 5 validators doppelganger:
    Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001
    Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002
    Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003
    Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004
    Index: xxxxxx, Public key: 0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005`
- When the DG detection ends:
  `Doppelganger detection check finished. Stopping doppelganger detection for public keys b28ab22, c2bab15, cd26f5e`