---
title: Logging options
---

# `Logging`

TODO description

### logging

=== "Syntax"

    ```bash
    -l, --logging=<LEVEL>
    ```

=== "Example"

    ```bash
    --logging=DEBUG
    ```

=== "Environment variable"

    ```bash
    TEKU_LOGGING=DEBUG
    ```

=== "Configuration file"

    ```bash
    logging: "DEBUG"
    ```

Sets the logging verbosity.
Log levels are `OFF`, `FATAL`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`, `ALL`.
Default is `INFO`.

### log-color-enabled

=== "Syntax"

    ```bash
    --log-color-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --log-color-enabled=false
    ```

=== "Environment variable"

    ```bash
    TEKU_LOG_COLOR_ENABLED=false
    ```

=== "Configuration file"

    ```bash
    log-color-enabled: false
    ```

Specify whether status and event log messages include a console color display code.
The default is `true`.

### log-destination

=== "Syntax"

    ```bash
    --log-destination=<LOG_DESTINATION>
    ```

=== "Example"

    ```bash
    --log-destination=CONSOLE
    ```

=== "Environment variable"

    ```bash
    TEKU_LOG_DESTINATION=CONSOLE
    ```

=== "Configuration file"

    ```bash
    log-destination: "CONSOLE"
    ```

Specify where to output log information. Valid options are:

* `BOTH`
* `CONSOLE`
* `DEFAULT_BOTH`
* `FILE`

The default is `DEFAULT_BOTH`. When using `BOTH` or `DEFAULT_BOTH`, system updates such as blockchain
events are displayed on the console, and errors and other information are logged to a file. Specify
the log file with the [`--log-file`](#log-file) command-line option.

For production systems we recommend using the `CONSOLE` or `FILE` options to ensure all log
information is available in one place.

!!! note

    Use `DEFAULT_BOTH` when using a
    [custom Log4J2 configuration file](../../HowTo/Monitor/Logging.md#advanced-custom-logging). Any
    other option applies the custom logging changes on top of its default settings.

### log-file

=== "Syntax"

    ```bash
    --log-file=<FILENAME>
    ```

=== "Example"

    ```bash
    --log-file=teku_2020-01-01.log
    ```

=== "Environment variable"

    ```bash
    TEKU_LOG_FILE=teku_2020-01-01.log
    ```

=== "Configuration file"

    ```bash
    log-file: "teku_2020-01-01.log"
    ```

Relative or absolute location, and filename of the log file.

The default directory is OS-dependent:

* macOS: `~/Library/teku/logs`
* Unix/Linux: `$XDG_DATA_HOME/teku/logs` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku/logs`
* Windows: `%localappdata%\teku\logs`

The default Docker image location is `/root/.local/share/teku/logs`.

### log-file-name-pattern

=== "Syntax"

    ```bash
    --log-file-name-pattern=<REGEX>
    ```

=== "Example"

    ```bash
    --log-file-name-pattern=tekuL_%d{yyyy-MM-dd}.log
    ```

=== "Environment variable"

    ```bash
    TEKU_LOG_FILE_NAME_PATTERN=tekuL_%d{yyyy-MM-dd}.log
    ```

=== "Configuration file"

    ```bash
    log-file-name-pattern: "tekuL_%d{yyyy-MM-dd}.log"
    ```

Filename pattern to apply when creating log files. The default pattern is `teku_%d{yyyy-MM-dd}.log`

### log-include-events-enabled

=== "Syntax"

    ```bash
    --log-include-events-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --log-include-events-enabled=false
    ```

=== "Environment variable"

    ```bash
    TEKU_LOG_INCLUDE_EVENTS_ENABLED=false
    ```

=== "Configuration file"

    ```bash
    log-include-events-enabled: false
    ```

Specify whether to log frequent update events. For example every slot event with
validators and attestations. The default is `true`.

### log-include-validator-duties-enabled

=== "Syntax"

    ```bash
    --log-include-validator-duties-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --log-include-validator-duties-enabled=false
    ```

=== "Environment variable"

    ```bash
    TEKU_LOG_INCLUDE_VALIDATOR_DUTIES_ENABLED=false
    ```

=== "Configuration file"

    ```bash
    log-include-validator-duties-enabled: false
    ```

Specify whether to log details of validator event duties. The default is `true`.

!!! note
Logs could become noisy when running many validators.
