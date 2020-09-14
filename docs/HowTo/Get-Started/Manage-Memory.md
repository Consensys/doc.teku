---
title: Teku memory management
---

# Managing memory

Manage Teku's Java Virtual Machine (JVM) memory requirements by setting a maximum heap size
using the `JAVA_OPTS` environment variable.

We recommend setting the maximum heap size to 2GB if you have less than 8GB of RAM. This results in
an approximate process size of 3.5GB (on Linux)

=== "Use the environment variable"

    ```bash
    export JAVA_OPTS=-Xmx2g
    ```

=== "Use the command line"

    ```bash
    JAVA_OPTS=-Xmx2g ./teku [options]
    ```

!!! note

    The node uses of more RAM to perform better if it’s available, especially during periods
    of non-finalization.