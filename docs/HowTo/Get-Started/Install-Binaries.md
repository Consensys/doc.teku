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

!!! important

    Teku v0.11.x builds are compatible with the [v0.11.3 specification], including the Witti
    multi-client testnet.
    
    Teku v0.12.x builds are compatible with the
    [v0.12.1 specification], including the Prysmatic Labs Onyx testnet.
    
Unpack the downloaded files and change into the `teku-<release>` directory.

Display Teku command line help to confirm installation:

```bash tab="Linux/macOS"
./bin/teku --help
```

```bat tab="Windows"
bin\teku --help
```
<!-- links -->
[v0.11.3 specification]: https://github.com/ethereum/eth2.0-specs/releases/tag/v0.11.3
[v0.12.1 specification]: https://github.com/ethereum/eth2.0-specs/releases/tag/v0.12.1