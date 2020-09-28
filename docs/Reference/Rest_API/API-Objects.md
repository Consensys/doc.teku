description: Teku API objects reference
<!--- END of page meta data -->

# Teku API Objects

The following objects are returned by Teku REST API methods.

## Beacon block

Returned by [`beacon/block`](https://pegasyseng.github.io/teku/#operation/getBeaconBlock).

| Field                | Type                | Description                                         |
|----------------------|:-------------------:|-----------------------------------------------------|
| **root**             | Byte32              | Block root of the beacon block.                     |
| **beacon_block**     | Object              | Object containing the block details.                |

The `beacon_block` object contains a `message` object with the following signed beacon block
details.

| Field                | Type                | Description                                         |
|----------------------|:-------------------:|-----------------------------------------------------|
| **slot**             | uint64              | Block creation slot.                                |
| **proposer_index**   | uint64              | Index of the validator that proposed the block.     |
| **parent_root**      | Bytes32             | Root of the parent block.                           |
| **state_root**       | Bytes32             | Hash root of the state.                            |
| **body**             | Object              | [Fields for the various beacon operations](#beacon-block-body). |
| **signature**        | Bytes96             | Signature of the beacon block.                      |

### Beacon block body

The `body` field in the `beacon_block` object contains information about operations on the current
state.

| Field                  | Type                | Description                                         |
|------------------------|:-------------------:|-----------------------------------------------------|
| **randao_reveal**      | Bytes96             | BLSSignature of the current epoch.                  |
| **eth1_data**          | Object              | [A vote on recent ETH1 chain data](#eth1-data).    |
| **graffiti**           | Data, 32 bytes      | Vanity data populated by validators.                |
| **proposer_slashings** | Object              | Proposer slashing details.                         |
| **attester_slashings** | Object              | Attester slashing details.                         |
| **attestations**       | Object              | [Objects containing attestation information](#attestation). |
| **deposits**           | Array               | Sequence of deposits, ordered chronologically.      |
| **voluntary_exits**    | Array               | Lists of voluntary exits of validators.             |

### ETH1 data

The object contains ETH1 chain data information.

| Field                | Type                | Description                                         |
|----------------------|:-------------------:|-----------------------------------------------------|
| **deposit_root**     | Bytes32             | Hash tree root of all deposits in a deposit contract. |
| **deposit_count**    | uint64              | Number of successful validator deposits into the contract.|
| **block_hash**       | Bytes32             | ETH1 block hash that contains the deposit root. |

## Attestation

Attestation information for the block.

!!! note
    Produces a blank `signature` field for the
    [`/validator/attestation`](https://pegasyseng.github.io/teku/#operation/getValidatorAttestation)
    endpoint, which the validator later signs.

| Field                | Type                | Description                                         |
|----------------------|:-------------------:|-----------------------------------------------------|
| **aggregation_bits** | Bitlist             | List of bits containing a single bit for each member of the committee. |
| **data**             | Object              | [Attestation data](#attestation-data) signed by the validator (or collection of validators). |
| **signature**        | Bytes96             | BLS signature of the attestation.                   |

### Attestation Data

| Field                | Type                | Description                                         |
|----------------------|:-------------------:|-----------------------------------------------------|
| **slot**             | uint64              | Slot that the validator or committee is assigned to attest. |
| **index**            | uint64              | Index of the committee making  the attestation.     |
| **beacon_block_root** | Bytes32            | Block root of the beacon block for the assigned slot. |
| **source**           | Object              | Checkpoint (`epoch` and `root`) during the assigned slot. |
| **target**           | Object              | The checkpoint (`epoch` and `root`) attesters are attempting to justify. |

## Validators

A list of validator information returned by
[`/beacon/validators`](https://pegasyseng.github.io/teku/#operation/getBeaconValidators).

| Field                | Type                | Description                                         |
|----------------------|:-------------------:|-----------------------------------------------------|
| **pubkey**           | Bytes48             | Validator's public key.                             |
| **validator_index**  | integer             | Validator index within the beacon state.            |
| **balance**          | uint64              | Account balance in Gwei.                            |
| **validator**        | Object              | [Object containing validator information](#validator). |
| **total_size**       | uint64              | Total number of validators.                         |
| **next_page_token**  | uint64              | Next page number of results.                        |

### Validator

| Field                      | Type                | Description                                         |
|----------------------------|:-------------------:|-----------------------------------------------------|
| **pubkey**                 | Bytes48             | Validator's public key.                             |
| **withdrawal_credentials** | Bytes32             | Validator index within the beacon state.            |
| **effective_balance**      | uint64              | Account balance in Gwei.                            |
| **slashed**                | Boolean             | `true` if the validator has been slashed, otherwise `false`.|
| **activation_eligibility_epoch** | uint64        | Epoch when the activation criteria was met.         |
| **activation_epoch**       | uint64              | Epoch when the validator was activated.             |
| **exit_epoch**             | uint64              | Epoch at which the validator exits the blockchain. |
| **withdrawable_epoch**     | Object              | Epoch at which the exited validator can withdraw funds. |
