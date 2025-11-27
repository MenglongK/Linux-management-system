#!/bin/bash
USERNAME=$1
PASSWORD=$2

# Create user
sudo useradd -m -s /bin/bash "$USERNAME"

# Set password
echo "$USERNAME:$PASSWORD" | sudo chpasswd

echo "User $USERNAME created successfully"