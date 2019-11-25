description: Artemis command line interface reference
<!--- END of page meta data -->

# Artemis Command Line

This reference describes the syntax of the Artemis Command Line Interface (CLI) options and subcommands.

## Options

To start a Artemis node run:

```bash
artemis [OPTIONS] [COMMAND]
```

### config

```bash tab="Syntax"
--config=<FILENAME>
```

```bash tab="Example"
--config=/artemis/node/config.toml
```

Path and filename of the configuration file. 

### help

```bash tab="Syntax"
-h, --help
```

Show the help message and exit.

### logging

```bash tab="Syntax"
-l, --logging=<LEVEL>
```

```bash tab="Example"
--logging=DEBUG
```

Sets the logging verbosity.
Log levels are `OFF`, `FATAL`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`, `ALL`.
Default is `INFO`.

### version

```bash tab="Syntax"
  -V, --version
``` 

Displays the version and exits. 


