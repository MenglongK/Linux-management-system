#!/bin/bash

echo "["

top -b -n 1 -w 512 | head -n 12 | tail -n 5 | awk '
{
    pid = $1
    cpu = $9
    
    #looping :
    name = ""
    for (i = 12; i <= NF; i++) {
        name = name $i " "
    }
    
    # Remove the trailing space
    sub(/ $/, "", name)
    
    # Remove "" : 
    gsub(/"/, "", name) 
    
    # Print JSON object :
    printf "{\"pid\": \"%s\", \"name\": \"%s\", \"usage\": \"%s\"}", pid, name, cpu
}' | sed 's/}{/}, {/g' 
echo "]"
