---
description: Teku log level settings and log formatting
---

# Logging

Teku uses Log4J2 for logging, and provides multiple methods to configure logging behavior:

* [Basic](#basic-log-level-setting) - changes the log level.
* [Destination logging](#configure-log-destination) - configure the destination for log output.
* [Custom logging](#advanced-custom-logging) - custom logging to configure the output and format
    of the logs.

## Basic log level setting

Use the [`--logging`](../../Reference/CLI/CLI-Syntax.md#logging) command line option to specify
logging verbosity. The [`--logging`](../../Reference/CLI/CLI-Syntax.md#logging) option changes the
volume of events displayed in the log. Valid log levels are `OFF`, `FATAL`, `ERROR`, `WARN`,
`INFO`, `DEBUG`, `TRACE`, `ALL`. The default level is `INFO`.

For most use-cases, the basic method provides enough configurability.

!!! tip

    Use the [`log_level`](https://pegasyseng.github.io/teku/#operation/putAdminLog_level) API
    method to change the log level while Teku is running.

## Configure log destination

Use the [`--log-destination`](../../Reference/CLI/CLI-Syntax.md#log-destination) command line
option to specify where to output log information. Valid options are `BOTH`, `CONSOLE`,
`DEFAULT_BOTH`, `FILE`. Defaults to `DEFAULT_BOTH`.

When using `BOTH` or `DEFAULT_BOTH`, system updates such as blockchain events
are displayed on the console, and errors and other information are logged to a file. The log file
location can be specified with the [`--log-file`](../../Reference/CLI/CLI-Syntax.md#log-file)
command-line option.

!!! note

    For production systems we recommend using the `CONSOLE` or `FILE` options to ensure all log
    information is available in one place.

`DEFAULT_BOTH` and `BOTH` have the same behavior, except when using a [custom Log4J2 configuration
file](#advanced-custom-logging). When using a custom file, `DEFAULT_BOTH` will not apply logging
changes, whereas `BOTH` will apply logging changes.


## Advanced custom logging

You can provide your own logging configuration using the standard Log4J2 configuration mechanisms.

!!! example "debug.xml"

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Configuration status="INFO">
      <Properties>
        <Property name="root.log.level">INFO</Property>
      </Properties>

      <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
          <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSSZZZ} | %t | %-5level | %c{1} | %msg %throwable%n" />
        </Console>
      </Appenders>
      <Loggers>
        <Root level="${sys:root.log.level}">
          <AppenderRef ref="Console" />
        </Root>
      </Loggers>
    </Configuration>
    ```

To use your custom configuration, set the environment variable `LOG4J_CONFIGURATION_FILE` to the
location of your configuration file, and ensure 
[`--log-destination`](../../Reference/CLI/CLI-Syntax.md#log-destination) is not set to `DEFAULT_BOTH`.

If you have more specific requirements, you can create your own
[log4j2 configuration](https://logging.apache.org/log4j/2.x/manual/configuration.html).

For Bash-based executions, you can set the variable for only the scope of the program execution by
setting it before starting Teku.

!!! example

    ```bash
    LOG4J_CONFIGURATION_FILE=./debug.xml teku [OPTIONS]
    ```
