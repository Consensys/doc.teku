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
sh run.sh -n=<number> 
```

Where number is the number of Hikari nodes to start. 

### Configure Nodes 

Use the optional `--config` and `--logging` options to configure the Hikari nodes. 