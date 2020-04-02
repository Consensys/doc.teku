description: Teku command line interface subcommands
<!--- END of page meta data -->

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

* `<PRE>` is the Pre(Input) path.  If not specified, input is read from STDIN.
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

* `<PRE>` is the Pre(Input) path.  If not specified, input is read from STDIN.
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

* `--outputFile` is the path and filename of the file to which the keys are written. If not specified, the peer IDs
are written to the `./config/peer-ids.dat` file. 
* `<number` is the number of peer IDs to generate.

## validator

Register or generate validators and send transactions to an Ethereum 1.0 node.

### generate

Register a validator by generating new keys and sending deposit transactions to an Ethereum 1.0
node.

#### deposit-amount-gwei

```bash tab="Syntax"
teku validator generate --deposit-amount-gwei=<GWEI>
```

```bash tab="Example"
teku validator generate --deposit-amount-gwei=32000000000
```

Amount to deposit in the Ethereum 1.0 deposit contract.

#### encrypted-keystore-enabled

```bash tab="Syntax"
teku validator generate --encrypted-keystore-enabled=<BOOLEAN>
```

```bash tab="Example"
teku validator generate --encrypted-keystore-enabled=false
```

Specify whether to create encrypted V3 keystore validator and withdrawal keys.
Defaults to `true`.

Use [`teku validator generate --keys-output-path`](#keys-output-path) to specify the
location of the encrypted or unencrypted keys.

#### eth1-deposit-contract-address

```bash tab="Syntax"
teku validator generate --eth1-deposit-contract-address=<ADDRESS>
```

```bash tab="Command Line"
teku validator generate --eth1-deposit-contract-address=0x77f7bED277449F51505a4C54550B074030d989bC
```

Ethereum 1.0 address of deposit contract.

#### eth1-endpoint

```bash tab="Syntax"
teku validator generate --eth1-endpoint=<URL>
```

```bash tab="Command Line"
teku validator generate --eth1-endpoint=http://localhost:8545
```

JSON-RPC URL of Ethereum 1.0 node.

#### eth1-keystore-file

```bash tab="Syntax"
teku validator generate --eth1-keystore-file=<FILE>
```

```bash tab="Command Line"
teku validator generate --eth1-keystore-file=/home/me/me_node/keystore
```

Path to the encrypted V3 keystore file containing the Ethereum 1.0 private key used to
send the deposit transaction.

Cannot be used with `teku validator generate --eth1-private-key`

#### eth1-keystore-password-file

```bash tab="Syntax"
teku validator generate --eth1-keystore-password-file=<FILE>
```

```bash tab="Command Line"
teku validator generate --eth1-keystore-password-file=/home/me/me_node/password
```

Path to the file containing the password to decrypt the V3 keystore.

#### eth1-private-key

```bash tab="Syntax"
teku validator generate --eth1-private-key=<KEY>
```

```bash tab="Command Line"
teku validator generate --eth1-private-key=8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63
```

Ethereum 1.0 private key to send the deposit transaction. Cannot be used with
`teku validator generate --eth1-keystore-file`.

#### keys-output-path

```bash tab="Syntax"
teku validator generate --keys-output-path=<FILE|DIR>
```

```bash tab="Command Line"
teku validator generate --keys-output-path=/home/me/me_node/keys
```

Specify the output location for validator and withdrawal keys.

* Path to the output file when using unencrypted keys. That is, [`teku validator generate --encrypted-keystore-enabled`](#encrypted-keystore-enabled)
set to `false`.

* Path to the output directory for the auto-generated V3 keystore files. That is,
[`teku validator generate --encrypted-keystore-enabled`](#encrypted-keystore-enabled) set to `true`.

If not set, unencrypted keys are written to standard out, and encrypted keystores are created in current directory.

#### encrypted-keystore-validator-password-env

```bash tab="Syntax"
teku validator generate --encrypted-keystore-validator-password-env=<ENV>
```

```bash tab="Command Line"
teku validator generate --encrypted-keystore-validator-password-env=VALIDATOR_PASSWORD
```

The environment variable that stores the password to decrypt the validator's V3 keystore.

#### encrypted-keystore-validator-password-file

```bash tab="Syntax"
teku validator generate --encrypted-keystore-validator-password-file=<FILE>
```

```bash tab="Command Line"
teku validator generate --encrypted-keystore-validator-password-file=/home/me/me_node/password
```

The file that stores the password to decrypt the validator's V3 keystore.

#### encrypted-keystore-withdrawal-password-env

```bash tab="Syntax"
teku validator generate --encrypted-keystore-withdrawal-password-env=<ENV>
```

```bash tab="Command Line"
teku validator generate --encrypted-keystore-withdrawal-password-env=WITHDRAWAL_PASSWORD
```

The environment variable that stores the password to decrypt the validator's withdrawal key.

#### encrypted-keystore-withdrawal-password-file

```bash tab="Syntax"
teku validator generate --encrypted-keystore-withdrawal-password-file=<FILE>
```

```bash tab="Command Line"
teku validator generate --encrypted-keystore-withdrawal-password-file=/home/me/me_node/password
```

The file that stores the password to decrypt the validator's withdrawal key.

### register

Register a validator using existing keys by sending a deposit transaction to an
Ethereum 1.0 node.

#### deposit-amount-gwei

```bash tab="Syntax"
teku validator register --deposit-amount-gwei=<GWEI>
```

```bash tab="Example"
teku validator register --deposit-amount-gwei=32000000000
```

Amount to deposit in the Ethereum 1.0 deposit contract.

#### encrypted-keystore-validator-file

```bash tab="Syntax"
teku validator register --encrypted-keystore-validator-file=<FILE>
```

```bash tab="Command Line"
teku validator register --encrypted-keystore-validator-file=/home/me/me_node/password
```

Path to the V3 keystore file containing the validator's encrypted private key.

#### encrypted-keystore-validator-password-env

```bash tab="Syntax"
teku validator register --encrypted-keystore-validator-password-env=<ENV>
```

```bash tab="Command Line"
teku validator register --encrypted-keystore-validator-password-env=VALIDATOR_PASSWORD
```

The environment variable that stores the password to decrypt the validator's V3 keystore.

#### encrypted-keystore-validator-password-file

```bash tab="Syntax"
teku validator register --encrypted-keystore-validator-password-file=<FILE>
```

```bash tab="Command Line"
teku validator register --encrypted-keystore-validator-password-file=/home/me/me_node/password
```

The file that stores the password to decrypt the validator's V3 keystore.

#### eth1-deposit-contract-address

```bash tab="Syntax"
teku validator register --eth1-deposit-contract-address=<ADDRESS>
```

```bash tab="Command Line"
teku validator register --eth1-deposit-contract-address=0x77f7bED277449F51505a4C54550B074030d989bC
```

Ethereum 1.0 address of deposit contract.

#### eth1-endpoint

```bash tab="Syntax"
teku validator register --eth1-endpoint=<URL>
```

```bash tab="Command Line"
teku validator register --eth1-endpoint=http://localhost:8545
```

JSON-RPC URL of Ethereum 1.0 node.

#### eth1-keystore-file

```bash tab="Syntax"
teku validator register --eth1-keystore-file=<FILE>
```

```bash tab="Command Line"
teku validator register --eth1-keystore-file=/home/me/me_node/keystore
```

Path to the encrypted V3 keystore file containing the Ethereum 1.0 private key used to
send the deposit transaction.

Cannot be used with `teku validator register --eth1-private-key`

#### eth1-keystore-password-file

```bash tab="Syntax"
teku validator register --eth1-keystore-password-file=<FILE>
```

```bash tab="Command Line"
teku validator register --eth1-keystore-password-file=/home/me/me_node/password
```

Path to the file containing the password to decrypt the V3 keystore.

#### eth1-private-key

```bash tab="Syntax"
teku validator register --eth1-private-key=<KEY>
```

```bash tab="Command Line"
teku validator register --eth1-private-key=8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63
```

Ethereum 1.0 private key to send the deposit transaction. Cannot be used with
`teku validator register --eth1-keystore-file`.

#### validator-private-key

```bash tab="Syntax"
teku validator register --validator-private-key=<KEY>
```

```bash tab="Command Line"
teku validator register --validator-private-key=2a4055949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692cb87
```

Validator's signing key. Cannot be used with
[`teku validator register --encrypted-keystore-validator-file`](#encrypted-keystore-validator-file)

#### withdrawal-public-key

```bash tab="Syntax"
teku validator register --withdrawal-public-key=<KEY>
```

```bash tab="Command Line"
teku validator register --withdrawal-public-key=b65c2a1dc6a8eaadae03d5849dd6ac614b32dc5f8af37e2eb4ced0c72fd69fabe90fc783b0435f5a36ff1338385ef837
```

Validators public withdrawal key.