---
title: Metrics options
---

# `Metrics`

TODO description

### metrics-enabled

=== "Syntax"

    ```bash
    --metrics-enabled[=<BOOLEAN>]
    ```

=== "Example"

    ```bash
    --metrics-enabled=true
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_ENABLED=true
    ```

=== "Configuration file"

    ```bash
    metrics-enabled: true
    ```

Set to `true` to enable the metrics exporter.
The default is `false`.

### metrics-host-allowlist

=== "Syntax"

    ```bash
    --metrics-host-allowlist=<hostname>[,<hostname>...]... or "*"
    ```

=== "Example"

    ```bash
    --metrics-host-allowlist=medomain.com,meotherdomain.com
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_HOST_ALLOWLIST=medomain.com,meotherdomain.com
    ```

=== "Configuration file"

    ```bash
    metrics-host-allowlist: ["medomain.com", "meotherdomain.com"]
    ```

A comma-separated list of hostnames to allow access to the [Teku metrics]. By
default, Teku accepts access from `localhost` and `127.0.0.1`.

!!! tip

    To allow all hostnames, use `"*"`. We don't recommend allowing all hostnames for production
    environments.

### metrics-categories

=== "Syntax"

    ```bash
    --metrics-categories=<CATEGORY>[,<CATEGORY>...]...
    ```

=== "Example"

    ```bash
    --metrics-categories=BEACON,JVM,PROCESS
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_CATEGORIES=BEACON,JVM,PROCESS
    ```

=== "Configuration file"

    ```bash
    metrics-categories: ["BEACON", "JVM", "PROCESS"]
    ```

Categories for which to track metrics. Options are `JVM`, `PROCESS`, `BEACON`, `DISCOVERY`, `EVENTBUS`, `EXECUTOR`, `LIBP2P`, `NETWORK`, `STORAGE`, `STORAGE_HOT_DB`, `STORAGE_FINALIZED_DB`,
`REMOTE_VALIDATOR`, `VALIDATOR`, `VALIDATOR_PERFORMANCE`. All categories are enabled by default.

### metrics-interface

=== "Syntax"

    ```bash
    --metrics-interface=<HOST>
    ```

=== "Example"

    ```bash
    --metrics-interface=192.168.10.101
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_INTERFACE=192.168.10.101
    ```

=== "Configuration file"

    ```bash
    metrics-interface: "192.168.10.101"
    ```

Host on which Prometheus accesses Teku metrics. The default is `127.0.0.1`.

### metrics-port

=== "Syntax"

    ```bash
    --metrics-port=<PORT>
    ```

=== "Example"

    ```bash
    --metrics-port=6174
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_PORT=6174
    ```

=== "Configuration file"

    ```bash
    metrics-port: 6174
    ```

Specifies the port (TCP) on which [Prometheus](https://prometheus.io/) accesses Teku metrics.
The default is `8008`.

### metrics-publish-endpoint

=== "Syntax"

    ```bash
    --metrics-publish-endpoint=<URL>
    ```

=== "Example"

    ```bash
    --metrics-publish-endpoint=https://beaconcha.in/api/v1/client/metrics?apikey={apikey}
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_PUBLISH_ENDPOINT=https://beaconcha.in/api/v1/client/metrics?apikey={apikey}
    ```

=== "Configuration file"

    ```bash
    metrics-publish-endpoint: "https://beaconcha.in/api/v1/client/metrics?apikey={apikey}"
    ```

Endpoint URL of an external service such as [beaconcha.in](https://beaconcha.in/) to which Teku publishes metrics for node monitoring.

### metrics-publish-interval

=== "Syntax"

    ```bash
    --metrics-publish-interval=<INTEGER>
    ```

=== "Example"

    ```bash
    --metrics-publish-interval=60
    ```

=== "Environment variable"

    ```bash
    TEKU_METRICS_PUBLISH_INTERVAL=60
    ```

=== "Configuration file"

    ```bash
    metrics-publish-interval: "60"
    ```

Interval between metric publications to the external service defined in [metrics-publish-endpoint](#metrics-publish-endpoint), measured in seconds.
The default is `60`.
