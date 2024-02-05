---
title: Proto-Danksharding (EIP4844)
description: Learn about Proto-Danksharding upgrade and its implications for node operators.
sidebar_position: 4
---

# What is Proto-Danksharding (EIP4844)

EIP-4844, also known as Proto-Danksharding, is part of the next Ethereum's hard fork named `Dancun` (`Electra` CL fork + `Cancun` EL fork).

EIP-4844, is a proposal to scale Ethereum by introducing a new "blob-carrying" transaction type. This new transaction type allows data to be posted to the Ethereum mainnet more cheaply than currently possible, thus improving scalability while preserving decentralization.

Blobs are 'side-cars' of data that ride alongside blocks and are primarily used by the sequencers of Ethereum Layer 2 rollups to contain batched transactions executed on these rollups.

# What changes in Consensus Layers (Teku)

EIP-4844 introduces blobs, which are vectors of data that are made up of 4096 field elements, each being 32 bytes in size. Blobs are designed to remain available for exactly 4096 epochs, or `roughly 18 days`. After this expiry, the specific data within the blob will no longer be retrievable from the majority of consensus clients, but evidence of its prior existence will remain on the network.

The blobs' fee market structure is designed to target an `average of 3 blobs` attached to beacon block, with a `maximum of 6`. Each blob holds 128KB of temporary data. This means that EIP-4844 may increase the data associated with a block by 384KB on average (128KB per blob x 3 possible blobs) with a maximum of  768KB (6 blobs per block).

Consensus Layer clients:
- will use more network bandwidth in the peer-to-peer layer to receive and distribute the blobs.
- will require roughly 48GiB more storage space for blobs, with a theoretical maximum of 96GiB. The estimation comes from the following:
  - Target 3 blobs at 128KB each: `384KB per block`

  - 32 blocks per epoch x 4096 epochs for blob expiry: `131,072 blocks with blobs`

   - 384KB x 131,072 blocks: `48GiB Increase in Storage`

Additional information about `Dencun` and `EIP-4844` is available in [this](https://consensys.io/blog/ethereum-evolved-dencun-upgrade-part-5-eip-4844) article.