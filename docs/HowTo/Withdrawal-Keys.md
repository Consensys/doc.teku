---
title: Update your withdrawal credentials
description: How to update your withdrawal credentials
sidebar_position: 14
---

# Update your withdrawal credentials

When you create a validator, it’s possible to set its [withdrawal](../Concepts/Withdrawals.md) address to a BLS address, or an Ethereum address.

You can update your BLS withdrawal address to an Ethereum address after the Capella upgrade.

## Determine the withdrawal address type

**Prerequisites**:

- Access to the beacon node API endpoint. By default this is `localhost:5051`
- Install [`curl`](https://curl.se/) and [`jq`](https://stedolan.github.io/jq/)

The following shell script allows you to determine the withdrawal address of a given validator ID.

<!--tabs-->

# Script

```bash
VALIDATOR=<VALIDATOR_INDEX> \
curl http://localhost:5051/eth/v1/beacon/states/finalized/validators/$VALIDATOR | jq '.data | .validator.withdrawal_credentials'
```

# Example output

```
"0x00fc40352b0a186d83267fc1342ec5da49dbb78e1099a4bd8db16d2c0d223594"
```

<!--/tabs-->

In the script, specify the `<VALIDATOR_INDEX>` (for example `1`) that was provided when you joined the network. Alternatively you can specify the validator's public key.

In the output, the first 4 characters of the string, in this case `0x00`, indicates the key is a BLS withdrawal key.

## Update your withdrawal address

### From a BLS withdrawal address to an Ethereum address

:::warning

Teku does not offer functionality to create a signed withdrawal credential change. Tools such as [`ethdo`](https://github.com/wealdtech/ethdo/blob/master/docs/changingwithdrawalcredentials.md) allow you to generate this signed message, which can be submitted directly to your beacon node if your REST API is active.

:::

If your withdrawal address is a BLS key (starts with `0x00`), the Capella fork provides a process to update your withdrawal address to a `0x01` withdrawal key (Ethereum address). You must have the BLS withdrawal address private key, or the seed phrase (mnemonic) to sign the request to prove that you have access to the BLS withdrawal key.

Tools such as [ethdo](https://github.com/wealdtech/ethdo/blob/master/docs/changingwithdrawalcredentials.md) are able to sign the request correctly, and the signed data can be submitted directly, or via your own beacon node.

:::warning Important information about changing withdrawal credentials

- Once a validator has been updated to use a `0x01` withdrawal key (Ethereum address), it cannot be changed again.
- Updating your withdrawal credentials is not available until the Capella fork is active.
- Ensure you update to the expected Ethereum address because the change is permanent.

:::

A maximum of 16 validator keys can update their withdrawal credentials per block, so the process may be congested initially. If you submit a request to update your key, and it hasn't been done in a period of time, you might consider re-submitting the request. It may take several epochs for the change to be included in a block, depending on the number of requests in the queue.

Query the [`bls_to_execution_changes`](https://consensys.github.io/teku/#tag/Beacon/operation/getBlsToExecutionChanges) API see if your request is still in the pool.

### Update your Ethereum address

If your withdrawal credentials are set to an Ethereum address, and you wish to update it to a different address, you'll need to create a new validator key. You can exit your current validator key as a voluntary exit, and use the funds from the full withdrawal of that to create the new validator key.

The voluntary exit process takes while to complete, and the exiting validator must remain active during that time to avoid inactivity penalties.

:::warning

Ensure that you own the current Ethereum address before exiting, otherwise you will be unable to access your funds.

:::
