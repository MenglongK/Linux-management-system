#!/bin/bash

echo "["
# head/tail grabs the top 5
ps -eo pid,comm,%cpu --sort=-%cpu | head -n 6 | tail -n 5 | awk '{
    # Formats each line into a JSON object
    printf "{\"pid\": \"%s\", \"name\": \"%s\", \"usage\": \"%s\"}", $1, $2, $3
}' | sed 's/}{/}, {/g' 
echo "]"