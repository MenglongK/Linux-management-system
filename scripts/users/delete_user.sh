#!/bin/bash
USERNAME=$1

# Delete user and home directory
sudo userdel -r "$USERNAME"

echo "User $USERNAME deleted successfully"