---
description: Build Teku from source
---

# Build from source

## Prerequisites

* [Java JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

!!!important
    Teku requires Java 11+; earlier versions are not supported.

* [Git](https://git-scm.com/downloads) or [GitHub Desktop](https://desktop.github.com/)

## Installation on Linux / Unix / MacOS X

!!! important

    Teku `master` branch builds are compatible with the [v0.11.3 specification], including the
    Witti multi-client testnet.
    
    Teku `0.12.1-integration` branch builds are compatible with the [v0.12.1 specification],
    including the Prysmatic Labs Onyx testnet.

### Clone the Teku repository

Clone the **PegaSysEng/teku** repository:

```bash
git clone https://github.com/PegaSysEng/teku.git
```

### Build Teku

After cloning, go to the `teku` directory.

Build Teku with the Gradle wrapper `gradlew`, as follows:

```bash
./gradlew distTar installDist
```

!!! note
    The command produces an expanded distribution, ready to run
    in `build/install/teku`, and a `.tar` distribution in `build/distribution`.

Go to the `teku` directory:

```bash
cd build/install/teku
```

Display the Teku help to confirm installation:

````bash
bin/teku --help
````

!!! tip
    To view the list of available Gradle tasks, run `./gradlew tasks`

Continue with [Starting Teku](Start.md).

<!-- links -->
[v0.11.3 specification]: https://github.com/ethereum/eth2.0-specs/releases/tag/v0.11.3
[v0.12.1 specification]: https://github.com/ethereum/eth2.0-specs/releases/tag/v0.12.1

