description: Starting Teku     
<!--- END of page meta data -->

# Starting Teku 

## Run multiple Teku nodes 

### Prerequsites 

[Teku installed](Build-From-Source.md)
tmux 

### Start nodes 

In the `teku/scripts` directory: 

```bash
./run.sh [-n=<number>] [-v=<validators>]
```

Where:

* `<number>` is the number of Teku nodes to start. The default is 4. 
* `<validators>` is the number of validators. At least 8 validators are required. 

### Configure nodes 

Use the optional `--config` and `--logging` options to configure the Teku nodes.  

!!! example 
    ```bash  
    ./run.sh -n=16 -v=8 --config=/me/my-config.toml -l=TRACE
    ```
 
!!! tip
    Use the `-h` option to display the `run.sh` help. 
