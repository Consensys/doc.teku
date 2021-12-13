---
description: Subcommands overview
---

# Subcommands

This reference describes the syntax of the Teku subcommands.

To start a Teku node using subcommands, run:

```bash
besu [OPTIONS] [SUBCOMMAND(S)] [SUBCOMMAND OPTIONS]
```

You can also supply the subcommand options using [environment variables or a configuration file](../CLI-Syntax.md#specifying-options).

The available subcommands are:

- [`admin`](Admin.md)
- [`migrate-database`](Migrate-Database.md)
- [`slashing-protection`](Slashing-Protection.md)
- [`validator-client`](Validator-Client.md)
- [`voluntary-exit`](Voluntary-Exit.md)
- [Development and testing subcommands](Development.md)

## Using autocomplete

If using Bash or Z shell, you can enable autocomplete support by navigating to the `build` folder and running:

```bash
source teku.autocomplete.sh
```

Autocomplete allows you to view subcommand suggestions by pressing the Tab key twice.

```bash
teku Tab+Tab
```
