---
title: Update metrics
description: Manually update metrics for your custom dashboard.
sidebar_position: 3
---

# Update metrics

Manually update Teku metrics for your custom dashboard.

Teku has introduced changes to metric names, adding the `_total` suffix to counter metrics that previously did not have it.

If you are using a custom dashboard, you must update the metric names to reflect these changes.  

The following table lists the name changes for Teku metrics:

| Previous Teku metric name                      | New Teku metric name                                 |
|------------------------------------------------|------------------------------------------------------|
| `beacon_block_blobs_trackers_pool_size`        | `beacon_block_blobs_trackers_pool_size_total`        |
| `beacon_block_blobs_trackers_pool_stats`       | `beacon_block_blobs_trackers_pool_stats_total`       |
| `beacon_eth1_request_queue_size`               | `beacon_eth1_request_queue_size_total`               |
| `beacon_execution_payload_source`              | `beacon_execution_payload_source_total`              |
| `beacon_teku_version`                          | `beacon_teku_version_total`                          |
| `eventbus_event_consumed_count`                | `eventbus_event_consumed_count_total`                |
| `eventbus_event_failed_count`                  | `eventbus_event_failed_count_total`                  |
| `eventbus_event_published_count`               | `eventbus_event_published_count_total`               |
| `executor_signature_verifications_batch_count` | `executor_signature_verifications_batch_count_total` |
| `executor_signature_verifications_task_count`  | `executor_signature_verifications_task_count_total`  |
| `network_peer_chain_validation_attempts`       | `network_peer_chain_validation_attempts_total`       |
| `network_peer_connection_attempt_count`        | `network_peer_connection_attempt_count_total`        |
| `storage_finalized_state_branch_nodes`         | `storage_finalized_state_branch_nodes_total`         |
| `storage_finalized_state_leaf_nodes`           | `storage_finalized_state_leaf_nodes_total`           |
| `storage_finalized_states_stored`              | `storage_finalized_states_stored_total`              |
| `validator_duties_performed`                   | `validator_duties_performed_total`                   |
| `validator_external_signer_requests`           | `validator_external_signer_requests_total`           |




