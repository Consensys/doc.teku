---
description: Install Teku from binary distribution
---

# Install binary distribution

## Linux / Unix / MacOS / Windows

### Prerequisites

* [Java JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

!!! attention

    Teku requires Java 11+ to compile; earlier versions are not supported.

### Install from packaged binaries

Download the [Teku packaged binaries](https://bintray.com/consensys/pegasys-repo/teku#files).

Unpack the downloaded files and change into the `teku-<release>` directory.

Display Teku command line help to confirm installation:

=== "Linux/macOS"

    ```bash
    ./bin/teku --help
    ```

=== "Windows"

    ```bat
    bin\teku --help
    ```
