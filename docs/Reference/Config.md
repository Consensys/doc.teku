description: Configuration options 
<!--- END of page meta data -->

# Configuration File Properties 

Copy the `config.toml` file in the `config` directory and update your copy to your requirements. Use the
`--config` option to specify your configuration file when starting Teku. 

## Node 

| Property                 | Description                                                                               
|--------------------------|-------------------------------------------------------------------------------------------
| `networkMode`            | `mock` or `jvmlibp2p`                                                             
| `networkInterface`       | Host on which to listen for Beacon chain clients                      
| `port`                   | Port on which to listen for Beacon chain clients                      
| `discovery`              | `static` or `discV5`                              
| `bootnodes`              | Bootnodes for discovery                                               
| `advertisedPort`         | Advertised port                                             
| `constants`              | `minimal` or `mainnet`. We recommend using `minimal`                    

## Interop 

The properties in the `interop` section are used for local testing. 

| Property                  | Description                                                                               
|-------------------------- |-------------------------------------------------------------------------------------------
| `genesisTime`             | `0`. When `genesisTime` is set to 0, the genesis time is `currentTime` + 5 seconds
| `ownedValidatorStartIndex`| Index from which to use owned validators for the node                                                  
| `ownedValidatorCount`     | Number of owned validators to use for the node                                                  
| `startState`              | `""` File to load a SSZ encoded precomputed genesis state from                            
| `privateKey`              | Node private key        

## Validator 

| Property                  | Description                                                                             
|-------------------------- |-----------------------------------------------------------------------------------------
| `validatorsKeyFile`       | Specifies validator keys         

## Deposit 

| Property                  | Description                                                                         
|-------------------------- | --------------------------------------------------------------------------------------
| `mode`                    | Specify `test` when using a mock genesis. Specify `normal` when using an Eth1 chain 
| `numValidators`           | Number of validators
| `contractAddr`            | Eth1 address of deposit contract 
| `nodeUrl`                 | JSON-RPC URL of Eth1 node  

## Output 

| Property                  | Description 
|-------------------------- |-----------------------------------------------------------------------------------
| `transitionRecordDir`     | Specifies directory to which to write pre and post state, and blocks processed.  Used for debugging.  

## Metrics 

| Property                  | Description                                                                          
|-------------------------- |---------------------------------------------------------------------------
| `enabled`                 | Specifies if the metrics exporter is enabled. `true` or `false`        
| `port`                    | Port on which Prometheus accesses Teku metrics          
| `metricsNetworkInterface` | Host on which Prometheus accesses Teku metrics        
| `metricsCategories`       | Array of categories for which to track metrics. Options are `BEACONCHAIN`, `JVM`, `PROCESS`, `NETWORK`  

## Database 

| Property                  | Description                                                                   
|-------------------------- |-------------------------------------------------------------------------------
| `startFromDisk`           | Specifies whether to use existing storage. `true` or `false`         

## Beacon REST API 

| Property                  | Description                                                             
|-------------------------- |-------------------------------------------------------------------------
| `portNumber`              | REST API listening port       
| `enableSwagger`           | Enables or disables [Swagger UI](https://swagger.io/tools/swagger-ui/). Defaults to `false`