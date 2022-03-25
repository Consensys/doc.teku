# ConsenSys Teku

## What is Teku?

Teku is an open-source Ethereum consensus client (previously called an
[Ethereum 2.0](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) client) written in Java.
Teku contains a full beacon node implementation and a validator client for participating in
[proof of stake consensus](Concepts/Proof-of-Stake.md).

## What can you do with Teku?

Teku:

* Runs the beacon node synchronization and consensus.
* Proposes and attests to blocks.
* Provides enterprise focused metrics with Prometheus.
* Has REST APIs for managing consensus layer node operations.
* Has external key management to manage validator signing keys.

## New to Teku?

Get started by running Teku with Docker or installing Teku.
You can:

* [Run Teku from a Docker image.](HowTo/Get-Started/Installation-Options/Run-Docker-Image.md)
* [Install the binary distribution.](HowTo/Get-Started/Installation-Options/Install-Binaries.md)
* [Build from source.](HowTo/Get-Started/Installation-Options/Build-From-Source.md)
