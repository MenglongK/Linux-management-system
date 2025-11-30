#!/bin/bash
set -e

USERNAME="$1"

if [[ -z "$USERNAME" ]]; then
  echo "Usage: $0 <username>" >&2
  exit 1
fi

# Check if user exists
if id "$USERNAME" &>/dev/null; then
  echo "❌ User '$USERNAME' already exists" >&2
  exit 1
fi

# Create user with home directory and bash shell
sudo useradd -m -s /bin/bash "$USERNAME"

echo "✅ User '$USERNAME' created successfully"
