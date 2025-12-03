#!/bin/bash
set -e

# If username is not passed as argument, ask the user
USERNAME="$1"

if [[ -z "$USERNAME" ]]; then
  read -rp "Enter username to delete: " USERNAME
fi

if [[ -z "$USERNAME" ]]; then
  echo "❌ No username provided"
  exit 1
fi

# Check if user exists
if ! id "$USERNAME" &>/dev/null; then
  echo "❌ User '$USERNAME' not found"
  exit 1
fi
# Get UID
USER_UID=$(id -u "$USERNAME")

# Block root and system accounts and first normal user
if [[ "$USER_UID" -le 1001 ]]; then
  echo "Error: Cannot delete root or system accounts and first normal account."
  exit 1
fi

# Optional safety check when used interactively
if [ -t 0 ]; then
  read -rp "Are you sure you want to delete '$USERNAME'? [y/N]: " CONFIRM
  case "$CONFIRM" in
    [yY][eE][sS]|[yY]) ;;
    *) echo "❌ Cancelled"; exit 1 ;;
  esac
fi

# Delete user and home directory
userdel -r "$USERNAME"

echo "✅ User '$USERNAME' deleted successfully"
