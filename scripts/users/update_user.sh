#!/bin/bash

OLD_USERNAME=$1
NEW_USERNAME=$2

if id "$OLD_USERNAME" &>/dev/null; then
# Get UID
USER_UID=$(id -u "$OLD_USERNAME")

# Block root and system accounts and first normal user
if [[ "$USER_UID" -le 1000 ]]; then
  echo "Error: Cannot delete root or system accounts and first normal account."
  exit 1
fi

    sudo usermod -l "$NEW_USERNAME" "$OLD_USERNAME"
    echo "User '$OLD_USERNAME' renamed to '$NEW_USERNAME'"
else
    echo "User not found"
fi