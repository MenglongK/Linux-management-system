#!/bin/bash

OLD_USERNAME=$1
NEW_USERNAME=$2

if id "$OLD_USERNAME" &>/dev/null; then
    sudo usermod -l "$NEW_USERNAME" "$OLD_USERNAME"
    echo "User '$OLD_USERNAME' renamed to '$NEW_USERNAME'"
else
    echo "User not found"
fi