---
title: Weak Subjectivity options
---

# `Weak Subjectivity`

TODO description

### ws-checkpoint

=== "Syntax"

    ```bash
    --ws-checkpoint=<BLOCK_ROOT>:<EPOCH_NUMBER>
    ```

=== "Example"

    ```bash
    --ws-checkpoint=0x5a642bb8f367e98c0d11426d98d28c465f8988fc960500886cb49faf0372883a:3600
    ```

=== "Environment variable"

    ```bash
    TEKU_WS_CHECKPOINT=0x5a642bb8f367e98c0d11426d98d28c465f8988fc960500886cb49faf0372883a:3600
    ```

=== "Configuration file"

    ```bash
    ws-checkpoint: "0x5a642bb8f367e98c0d11426d98d28c465f8988fc960500886cb49faf0372883a:3600"
    ```

A recent checkpoint within the [weak subjectivity period]. Accepts the checkpoint using
`<blockRoot>:<epochNumber>`, where `<blockRoot>` must start with `0x`.

The weak subjectivity checkpoint is a recent, finalized checkpoint on the correct chain. By
supplying a weak subjectivity checkpoint, you ensure that nodes that have been offline for a long
period follow the correct chain. It protects the node from long-range attacks by malicious actors.

Use the [`admin weak-subjectivity`](Subcommands/Admin.md#weak-subjectivity) subcommand to display
or clear your weak subjectivity settings.
