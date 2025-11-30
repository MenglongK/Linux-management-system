#!/bin/bash
set -e

OLD_USERNAME="$1"
NEW_USERNAME="$2"

if [[ -z "$OLD_USERNAME" || -z "$NEW_USERNAME" ]]; then
  echo "Usage: $0 <old_username> <new_username>" >&2
  exit 1
fi

# Check if old user exists
if ! id "$OLD_USERNAME" &>/dev/null; then
  echo "❌ User '$OLD_USERNAME' does not exist" >&2
  exit 1
fi

# Check if new username is already taken
if id "$NEW_USERNAME" &>/dev/null; then
  echo "❌ User '$NEW_USERNAME' already exists" >&2
  exit 1
fi

# Rename login name
usermod -l "$NEW_USERNAME" "$OLD_USERNAME"

# Optional: also move home directory
OLD_HOME="/home/$OLD_USERNAME"
NEW_HOME="/home/$NEW_USERNAME"

if [[ -d "$OLD_HOME" ]]; then
  usermod -d "$NEW_HOME" -m "$NEW_USERNAME"
fi

echo "✅ User renamed from '$OLD_USERNAME' to '$NEW_USERNAME' successfully"
