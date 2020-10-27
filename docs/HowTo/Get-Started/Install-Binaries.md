---
description: Install Teku from binary distribution
---

# Install binary distribution

## Linux / Unix / macOS / Windows

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

## macOS with Homebrew

### Prerequisites

* [Homebrew](https://brew.sh/)
* Java JDK.

!!!important

    Teku requires Java 11+ to compile. Earlier versions are not supported. You can install Java
    using `brew cask install adoptopenjdk`. Alternatively, you can manually install the 
    [Java JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html).

### Install (or upgrade) using Homebrew

To install Teku using Homebrew:

```bash
brew tap ConsenSys/teku
brew install teku
```

To upgrade Teku using Homebrew:

```bash
brew tap ConsenSys/teku
brew upgrade teku
```

To display the Teku version and confirm installation:

```bash
teku --version
```