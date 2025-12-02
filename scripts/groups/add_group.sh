#!/bin/bash

# Create a linux group from user input
# Usage: ./create_group.sh groupname

GROUP="$1"

# Validate input
if [[ -z "$GROUP" ]]; then
  echo "Error: Group name required."
  exit 1
fi

# Check if group already exists
if getent group "$GROUP" > /dev/null 2>&1; then
  echo "Error: Group '$GROUP' already exists."
  exit 1
fi

# Create group
if groupadd "$GROUP"; then
  echo "Group '$GROUP' created successfully."
else
  echo "Failed to create group."
  exit 1
fi