# Withdrawals

Validators staking ether on Mainnet after The Merge, accrue 2 forms of rewards:

- Execution layer rewards payed directly to an Ethereum address.
- Consensus layer rewards for performing actions each epoch.

Before the Capella upgrade, consensus layer rewards were locked away, and
unable to be transferred to an Ethereum address. The Capella upgrade implements an automated
process that allows a validator's funds to be deposited to an Ethereum address.

!!! note

    Teku provides multiple methods to allow you to
    [specify an Ethereum address to store your validator's rewards](Prepare-for-The-Merge.md#configure-the-fee-recipient).

## Types of withdrawals

There are two types of automated withdrawals that occur once the
[withdrawal key is set up as an Ethereum address](Prepare-for-The-Merge.md#configure-the-fee-recipient).

### Partial Withdrawals

Partial withdrawals are for active validators that have a balance exceeding 32 ETH.
The network periodically makes deposits to the associated Ethereum address for validators with a balance
exceeding 32 ETH. This means that a validator's balance will periodically reduce to 32 ETH once Capella
becomes the active fork on the network.

### Full Withdrawals

Full withdrawals are for validators that have exited the network, and have waited the nessesary time to withdraw their funds.
For these validators, their entire balance is returned to the Ethereum address associated with the validator key.
The balance cannot be transferred until the validator key is associated with an Ethereum address.

An exited validator cannot become active on the network again, and currently (as of Capella)
there is no mechanism for recycling the validator ID that has been exited.

## How it works

From the first Capella slot, block proposers provide up to 16 withdrawals per proposed block.

Proposers start from validator 1, and find validators that qualify: must have an Ethereum address, must
have an excess balance, or have exited. On Mainnet, with 32 slots per epoch, this equates to 512 withdrawals
per epoch if all slots are producing blocks.

Block proposers select the withdrawals that go into the block using a predictable mechanism to follow
the chain correctly.

In each block, up to 16 changes to withdrawal credentials are also allowed, where an owner of a validator
key can update their withdrawal key's Ethereum address. This change is taken from a pool, and
the order is not guaranteed.

## Withdrawal keys

Withdrawal keys that are configured as [BLS keys](https://en.wikipedia.org/wiki/BLS_digital_signature)
cannot have automated withdrawals executed for them. Users must alter their credentials to specify an
ETH1 address for their withdrawal key.

BLS withdrawal keys are prefixed with `0x00`, whereas ETH1 withdrawal keys are prefixed with a `0x01`.

To determine the type of withdrawal key used by your validator, you can query your validator configuration
onchain.

### Determine the withdrawal key type

The following script allows you to determine the withdrawal key of a given validator ID.

__NOTE__
 - This query runs against the beacon-api on your localhost:5051, so would require that to be accessible.
 - Change `VALIDATOR` to the validator index to query
 - Requires `curl` and `jq` to be installed and in the path.
```
 VALIDATOR=1 \
 curl http://localhost:5051/eth/v1/beacon/states/finalized/validators?id=$VALIDATOR \
     |jq '.data | .[] | .validator.withdrawal_credentials'
```
This will output a string like:
```
"0x00fc40352b0a186d83267fc1342ec5da49dbb78e1099a4bd8db16d2c0d223594"
```
The first 4 characters of the string, in this case `0x00`, indicate that a BLS withdrawal key is in use by validator 1 on the network (goerli in this example).

### Update your withdrawal key

If your withdrawal address is a BLS key (starts with `0x00`), the Capella fork comes with 
a process to allow you to update your withdrawal address to a `0x01` withdrawal key.
This will require either your withdrawal key or the seed phrase (mnemonic) of your withdrawal key, 
in order to sign the request to prove that you have access to the BLS Withdrawal key.

Because of the requirement for access to the withdrawal key for signing, Teku does not offer a utility to generate a signed request.

Tools such as [ethdo](https://github.com/wealdtech/ethdo) are able to sign the request correctly,
and the signed data can be submitted directly, or via your own beacon node.

Per block, 16 validator keys can update withdrawal credentials, so the process may be congested initially.
If you submit a request to update your key, and it hasn't been done in a period of time, you might consider re-submitting the request.
It may take several epochs for the change to be included in a block, depending on the number of requests in the queue.

__NOTE__
- Once a validator has been updated to use a `0x01` withdrawal key, it cannot be changed again.
- Submitting a change to withdrawal credentials is not available until the capella fork is active.
- Users should ensure that they are updating to the expected `eth1Address`, as this change is permanent.
- The address will get funds directly deposited for 0 gas, but as part of that transaction no EVM code will be executed.

## Frequently asked questions
___

_Question:_ What type of withdrawal key is in use by my validator?

_Answer:_ [Withdrawal-keys] details how you might look at your current validator setup to check your withdrawal key.
____

_Question:_ I've updated my BLS withdrawal key to an `eth1Address`, can I choose how often i get deposits?

_Answer:_ The process is automated and block proposers are required to add deposits when it is your turn, 
there is no way to delay them once your `eth1Address` has been setup.

----

_Question:_ I've set my `eth1Address` to the wrong thing, what now?

_Answer:_ There is no way to update it a second time to a different address, your change is permanent once it's been made, 
and that `eth1Address` will permanently receive funds from that validator key.

____

_Question:_ I believe my key has been compromised, and need to get my withdrawal credentials updated as soon as possible.

_Answer:_ Try to get in as early as possible submitting your bls_to_withdrawal change, as if your key has been 
compromised and the other party manages to update first, they will permanently get all withdrawals.
____

_Question:_ I've submitted a request to change my withdrawal key to an `eth1Address`, and it was accepted, but it's been a while, and my credentials haven't been updated yet.

_Answer:_ You could query the pool of your beacon-node and see if your request is still in the pool - `/eth/v1/beacon/pool/bls_to_execution_changes`. 
If the request is still in that pool, then you still have a good chance of your previous request being processed. If it is not in the queue, you can re-submit the same signed
change you submitted earlier.
----
_Question:_ My validator key is associated to an `eth1Address` I own, and it's all working, but I need to now change 
the `eth1Address` where the funds are being deposited, due to change of circumstance. How do I do that?

_Answer:_ To change `eth1Address` you will need to create a new validator key. You can exit your current validator key as a voluntary exit, 
 and use the funds from the full withdrawal of that to create the new validator key. 
Please note that the voluntary exit process does take time, and the exiting validator should remain active during that time to avoid inactivity penalties.
----

