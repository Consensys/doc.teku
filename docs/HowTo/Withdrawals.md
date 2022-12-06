# Withdrawals

## Overview
Validators who stake ether on mainnet, as of the `Bellatrix` upgrade, accrue 2 forms of reward:
- EL (Execution-layer) rewards payed directly to an eth1address for block inclusion
- CL (Consensus-layer) rewards for performing actions each epoch, to the CL validator balance.

Prior to the Capella upgrade, the balances of Consensus-layer validator keys was locked away, and not able to be transferred back to an `eth1Address` (ethereum address).

The Capella upgrade implements an automated process which allows the funds of validator keys to be deposited to an `eth1Address`.

## Types of withdrawal
There are two types of withdrawals, and both are automated and require no user interaction once the withdrawal key has been setup as an `eth1Address`.

### Partial Withdrawals
_Partial withdrawals_ concern validators who are active on the network and have a balance exceeding 32ETH.  
Periodically, a deposit will be made to the associated `eth1Address` for any balance exceeding 32ETH 
associated with the validator key. This means that a validators balance will periodically reduce to 
32ETH once capella becomes the active fork on the network.

### Full Withdrawals
_Full withdrawals_ concern validators who are exited from the network, and have waited the nessesary time to be withdrawable. 
For these validators, their entire balance is returned to the `eth1Address` associated with the validator key. 
The balance cannot be transferred until the validator key is associated with an `eth1Address`.

Once a validator is exited, it will not become active on the network again, and currently (as of capella) there is no mechanism
for recycling the validator id that has been exited.

## How it works
Starting from the first capella slot, block proposers will start providing up to 16 withdrawals per block proposed. 

Proposers will start from validator 1, and find validators that qualify (must have an `eth1Address`, must have an excess balance or be exited).
On mainnet, with 32 slots per epoch, this equates to 512 withdrawals per epoch if all slots are producing blocks.

Block proposers need to select the withdrawals that go into the block in a predictable mechanism to be able to follow the chain correctly.

Each block, up to 16 changes to withdrawal credentials are also allowed, where an owner of a validator key is able to update their 
withdrawal key to an `eth1Address`. This change is taken from a pool, and the order is not guaranteed, it will depend on a number of factors.

## Withdrawal Keys
There are two types of withdrawal keys that a validator may have been configured with when they were setup.

It has been possible to setup a validator key that has a withdrawal address of an `eth1Address` for a while now, 
and many users may find that their validator key is already configured with an `eth1Address` 
for the withdrawal key. The withdrawal keys that are configured in this way are prefixed with a `0x01` code.

BLS Keys are prefixed by `0x00`. These keys are not able to have automated withdrawals run on them. 
If the owner of the validator key wishes to get rewards from a validator key that has `0x00` withdrawal credentials, 
they need to alter their credentials to specify an eth1 address for their withdrawal key.

To determine the type of withdrawal key in use by your validator, if you are unsure, 
it is possible to query your validator configuration on chain.  The following script will allow 
you to determine the withdrawal key of a given validator id. 

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

## Updating Withdrawal keys

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

