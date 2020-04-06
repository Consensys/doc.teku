---
description: Teku command line interface subcommands
---

# Subcommands

## transition

Manually run state transitions for blocks or slots for debugging.

### blocks

```bash tab="Syntax"
teku transition blocks --config=<FILENAME> [--pre=<PRE>] [--post=<POST>] [blockFiles]
```

```bash tab="Example"
teku transition blocks --config=config.toml --pre=preState.bin --post=outputFile.bin blockFile1.bin blockFile2.bin
```

Process blocks on the pre-state to get a post-state where:

* `<PRE>` is the Pre(Input) path. If not specified, input is read from STDIN.
* `<POST>` is the Post(Output) path. If not specified, output is written to STDOUT.
* `[block...]` are the files from which to read blocks.

### slots

```bash tab="Syntax"
teku transition slots --config=<FILENAME> [--delta] [--pre=<PRE>] [--post=<POST>] <number>
```

```bash tab="Example"
teku transition slots --config=config.toml --pre=preState.bin --post=outputFile.bin 50
```

Process empty slots on the pre-state to get a post-state where:

* `<PRE>` is the Pre(Input) path. If not specified, input is read from STDIN.
* `<POST>` is the Post(Output) path. If not specified, output is written to STDOUT.
* `--delta` specifies to interpret `<number>` as a delta from the pre-state.
* `<number>` is number of slots to process.

## peer

Commands for LibP2P PeerID.

### generate

```bash tab="Syntax"
teku peer generate [--outputFile=<FILENAME>] <number>
```

```bash tab="Example"
teku peer generate --outputFile=./peerIDs 3
```

Generate a list of peer IDs including the private key, public key, and peer ID where:

* `--outputFile` is the path and filename of the file to which the keys are written.
  If not specified, the peer IDs are written to the `./config/peer-ids.dat` file.
* `<number` is the number of peer IDs to generate.
