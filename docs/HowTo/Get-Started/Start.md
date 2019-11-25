description: Starting Hikari     
<!--- END of page meta data -->

# Starting Hikari 

## Run Multiple Hikari Nodes 

### Prerequsites 

[Hikari installed](Build-From-Source.md)
tmux 

### Start Nodes 

In the `hikari/scripts` directory: 

```bash
./run.sh -n=<number> [-v=<validators>]
```

Where:

* `<number>` is the number of Hikari nodes to start
* `<validators>` is the number of validators. At least 8 validators are required. 

### Configure Nodes 

Use the optional `--config` and `--logging` options to configure the Hikari nodes.  

!!! example 
    ```bash  
    sh run.sh -n=16 -v=8 --config=/me/my-config.toml -l=TRACE
    ```
 
!!! tip
    Use the `-h` option to display the `run.sh` help. 
