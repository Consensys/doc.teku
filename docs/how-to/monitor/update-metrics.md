---
title: Update metrics
description: Update metrics manually if you're using a custom dashboard.
sidebar_position: 3
---

# Update metrics manually

If you are using a custom dashboard to monitor Teku metrics, you might need to update the metrics manually when breaking changes are introduced.

Teku release 24.7.0 has introduced breaking changes to metrics names. To summarise every counter metric has had the suffix `_total` added to it. 

If you are using a custom dashboard, you need to update the metrics names used in your dashboard to reflect the changes.

Below is a table with the old and new names of the metrics changed in the release:

| Old name                                     | New name                                           |
|----------------------------------------------|----------------------------------------------------|
| beacon_block_blobs_trackers_pool_size        | beacon_block_blobs_trackers_pool_size_total        |
| beacon_block_blobs_trackers_pool_stats       | beacon_block_blobs_trackers_pool_stats_total       |
| beacon_eth1_request_queue_size               | beacon_eth1_request_queue_size_total               |
| beacon_execution_payload_source              | beacon_execution_payload_source_total              |
| beacon_teku_version                          | beacon_teku_version_total                          |
| eventbus_event_consumed_count                | eventbus_event_consumed_count_total                |
| eventbus_event_failed_count                  | eventbus_event_failed_count_total                  |
| eventbus_event_published_count               | eventbus_event_published_count_total               |
| executor_signature_verifications_batch_count | executor_signature_verifications_batch_count_total |
| executor_signature_verifications_task_count  | executor_signature_verifications_task_count_total  |
| network_peer_chain_validation_attempts       | network_peer_chain_validation_attempts_total       |
| network_peer_connection_attempt_count        | network_peer_connection_attempt_count_total        |
| storage_finalized_state_branch_nodes         | storage_finalized_state_branch_nodes_total         |
| storage_finalized_state_leaf_nodes           | storage_finalized_state_leaf_nodes_total           |
| storage_finalized_states_stored              | storage_finalized_states_stored_total              |
| validator_duties_performed                   | validator_duties_performed_total                   |
| validator_external_signer_requests           | validator_external_signer_requests_total           |




