---
description: Describe how slash protection works in Teku
---

# Slashing protection

Teku provides slashing protection to prevent validators from signing blocks or attestations
based on what it has already signed.

!!! important

    Teku's slashing protection does not provide protection if the same validator key is being used
    by multiple nodes.

To protect validators from slashable offenses, Teku stores a record of the most recently signed
blocks for each validator in the `<data-path>/validators/slashprotection/` directory. One
[YAML file is stored per validator] in the format `<validator-pubkey>.yml` (with no 0x prefix).

!!! note

    Set `<data-path>` using the [`--data-path`](../Reference/CLI/CLI-Syntax.md#data-path) command
    line option.

Teku provides command line options to [import] or [export] the slash protection file.

## Validator slash protection file

The slash protection file records three values that protects the validator from incorrectly
signing blocks or attestations.

!!! example

    ```bash
    ---
    lastSignedBlockSlot: 71090
    lastSignedAttestationSourceEpoch: 2290
    lastSignedAttestationTargetEpoch: 3247
    ```

The following rules apply to the file:

* A validator will not sign a block unless the slot is greater than `lastSignedBlockSlot`.
* A validator will not sign an attestation unless the attestation source is less than or equal to
    `lastSignedAttestationSourceEpoch`, and the attestation target epoch is greater than
    `lastSignedAttestationTargetEpoch`.

These rules guarantee the validator does not sign anything that is slashable.

## Migrate the slash protection file

Use the Teku command line options to [import] or [export] the slash protection file.
Alternatively you can manually migrate or create the database.

### Between Teku nodes

If moving a validator from one Teku node to another, you can manually migrate the slash protection
file.

For example, to manually move the file from node A to node B:

* Stop Teku node A and confirm the process has fully exited and won't be restarted.
* Remove the validator key from node A, for example from the
    [`--validator-keys`](../Reference/CLI/CLI-Syntax.md#validator-keys) option.
* Copy the file from `<nodeA-data-path>/validators/slashprotection/` to
    `<nodeB-data-path>/validators/slashprotection/`.
* Start node B with the migrated validator key.
* Restart node A if required.

### From a non-Teku node

If moving a validator from a different client to Teku, you can either:

* Manually [create a new slash protection file] by setting the values based on the validator's last
    signing details.
* [Import] the slashing-protection file.

To manually create the file, stop the other client to ensure it isn't signing, then set
`lastSignedBlockSlot` to the current chain head slot + 1, `lastSignedAttestationSourceEpoch` to the
current justified checkpoint, and set `lastSignedAttestationTargetEpoch` to the current epoch + 1.

Start the Teku node with the validator key.

<!-- links -->
[YAML file is stored per validator]: #validator-slash-protection-file
[create a new slash protection file]: #validator-slash-protection-file
[import]: ../HowTo/Prevent-Slashing.md#importing-a-slashing-protection-file
[export]: ../HowTo/Prevent-Slashing.md#exporting-a-slashing-protection-file