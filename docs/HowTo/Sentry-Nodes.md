---
description: How to use sentry beacon nodes
---

!!! warning

    Sentry Nodes feature is experimental and is subject to change.

# Sentry Beacon Nodes

Future block proposers can be calculated ahead of time. This opens up an attack vector for attackers to DoS attack the beacon node used by a validator in order to cause it to miss their block proposal, losing their block proposal rewards.
One way to mitigate this issue is using the sentry nodes.

!!! important

    Only remote validators can use sentry nodes.

When configuring your remote validator to use sentry beacon nodes, each beacon node (or cluster of beacon nodes) can be assigned a "role." Each role determine which beacon node the remote validator will send request to when performing a task.

The sentry nodes feature supports three roles:

- The **Duties Provider** is the beacon node used for things like requesting attestation and block duties.
- The **Block Handler** is the beacon node used for block creation and publishing.
- The **Attestation Publisher** is the beacon node used for publishing attestations.

## How to Configure

!!! important

    The option `--Xsentry-config-file=<file_path>` cannot be used with the option `--beacon-node-api-endpoint`.

All sentry node configuration resides on a JSON file. To configure your remote validator to use sentry nodes use the option `--Xsentry-config-file=<file_path>`.

The configuration file looks like this:

```json
{
  "beacon_nodes": {
    "duties_provider": {
      "endpoints": [
        "http://duties:5051"
      ]
    },
    "block_handler": {
      "endpoints": [
        "http://block:5051"
      ]
    },
    "attestation_publisher": {
      "endpoints": [
        "http://attestation:5051"
      ]
    }
  }
}
```

Only the `duties_provider` role is mandatory. And for each role, you can assign multiple beacon node endpoints for failover.

**Example:**

With sentry node configuration file on `/etc/sentry-node-config.json` and containing the content in our previous example, start your remote validator with the option `--Xsentry-config-file=/etc/sentry-node-config.json`.

During start up the logs should have something like this:

```bash
...
DEBUG | SentryNodesConfigLoader | 2022-10-03 01:31:48.260 INFO  - Loading sentry nodes configuration from /etc/sentry-node-config.json
DEBUG | SentryNodesConfigLoader | 2022-10-03 01:31:48.277 INFO  - Duty provider beacon nodes: http://duties:9051
DEBUG | SentryNodesConfigLoader | 2022-10-03 01:31:48.277 INFO  - Block handler beacon nodes: http://block:9051
DEBUG | SentryNodesConfigLoader | 2022-10-03 01:31:48.278 INFO  - Attestation publisher beacon nodes: http://attestation:9051
...
```

At this point, the remote validator already knows what beacon nodes should be used for its tasks and no further configuration is needed.
