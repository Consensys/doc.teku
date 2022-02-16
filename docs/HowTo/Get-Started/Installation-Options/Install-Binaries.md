---
description: Install Teku from binary distribution
---

# Install binary distribution

## Linux / Unix / macOS / Windows

### Prerequisites

* [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html)

!!! attention

    Teku requires Java 11+ to compile; earlier versions are not supported.

* If using Windows, install the [Microsoft Visual C++ 2010 security update](https://www.microsoft.com/en-us/download/details.aspx?id=26999).

### Install from packaged binaries

Download the [Teku packaged binaries](https://github.com/ConsenSys/teku/releases).

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

    Teku requires Java 11+ to run. Earlier versions are not supported. You can install Java
    using `brew cask install adoptopenjdk`. Alternatively, you can manually install the 
    [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html).

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
