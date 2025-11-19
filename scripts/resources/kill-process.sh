#!/bin/bash
PID=$1

if [ -z "$PID" ]; then
  echo "Error: No PID provided."
  exit 1
fi
# Force Kill
sudo kill -9 $PID

echo "Successfully killed PID $PID"