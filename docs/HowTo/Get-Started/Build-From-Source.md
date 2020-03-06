description: Build Teku from source     
<!--- END of page meta data -->

# Build from source

## Prerequisites

* [Java JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

!!!important
    Teku requires Java 11+; earlier versions are not supported.

* [Git](https://git-scm.com/downloads) or [GitHub Desktop](https://desktop.github.com/)

## Installation on Linux / Unix / MacOS X

### Clone the Teku repository

Clone the **PegaSysEng/teku** repository:

```bash
git clone https://github.com/PegaSysEng/teku.git
```

### Build Teku

After cloning, go to the `teku` directory.

Build teku with the Gradle wrapper `gradlew`, as follows:

```bash
./gradlew installDist
```

The command produces an  expanded distribution, ready to run
in `build/install/teku`.

!!! tip
    Run `./gradlew tasks` to view the list of available Gradle tasks.


