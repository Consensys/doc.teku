---
title: Manage memory
sidebar_position: 5
---

# Managing memory

Manage Teku's Java Virtual Machine (JVM) memory usage by setting a maximum heap size using the `JAVA_OPTS` environment variable.

We recommend setting the maximum heap size to at least 3GB if you have less than 8GB of RAM, or if you have more RAM, but want to free up memory for other processes. This results in an approximate process size of 5GB (on Linux).

If you have more than 8GB of RAM, we recommend setting the maximum heap size to 5GB or more.

Set the heap size using the environment variable, or using the command line when starting Teku.

=== "Environment variable"

    ```bash
    export JAVA_OPTS=-Xmx3g
    ```

=== "Command line"

    ```bash
    JAVA_OPTS=-Xmx3g ./teku [options]
    ```

!!! note

    The node uses more RAM to perform better if it’s available, especially during periods
    of non-finalization.

## Manage the heap dump

If an out of memory error occurs, the heap dump file is placed in the directory that Teku runs from. The heap dump file is potentially large (1-2GB), to specify the directory to place the file, set the `-XX:HeapDumpPath` Java option to the required path.

=== "Environment variable"

    ```bash
    export TEKU_OPTS="-XX:HeapDumpPath=/home/me/me_node/dumps"
    ```

=== "Command line"

    ```bash
    TEKU_OPTS="-XX:HeapDumpPath=/home/me/me_node/dumps" ./teku [options]
    ```

To disable the heap dump file generation, set the `-XX:-HeapDumpOnOutOfMemoryError` Java option.

=== "Environment variable"

    ```bash
    export TEKU_OPTS="-XX:-HeapDumpOnOutOfMemoryError"
    ```

=== "Command line"

    ```bash
    TEKU_OPTS="-XX:-HeapDumpOnOutOfMemoryError" ./teku [options]
    ```
