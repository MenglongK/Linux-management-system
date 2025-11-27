#!/bin/bash
USERNAME=$1
PASSWORD=$2
shift 2
PERMISSIONS=("$@")

# Change password if provided
if [ -n "$PASSWORD" ]; then
    echo "$USERNAME:$PASSWORD" | sudo chpasswd
fi

# Set permissions
for PERM in "${PERMISSIONS[@]}"; do
    case $PERM in
        "read")
            sudo usermod -aG readers "$USERNAME" 2>/dev/null || true
            ;;
        "write")
            sudo usermod -aG writers "$USERNAME" 2>/dev/null || true
            ;;
        "execute")
            sudo usermod -aG executors "$USERNAME" 2>/dev/null || true
            ;;
        "all")
            sudo usermod -aG sudo "$USERNAME"
            ;;
    esac
done

echo "User $USERNAME updated successfully"