#!/bin/bash

PID=$1

# 1. Check if PID was sent
if [ -z "$PID" ]; then
  echo "Error: No PID provided."
  exit 1
fi

# 2. Check if the process actually exists
if ! ps -p $PID > /dev/null; then
   echo "Error: PID $PID does not exist."
   exit 1
fi

# 3. Try to kill it using sudo
if sudo kill -9 $PID; then
  echo "Success: PID $PID killed."
else
  echo "Error: Failed to kill PID $PID. Permission denied?"
  exit 1
fi