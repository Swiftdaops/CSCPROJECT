#!/usr/bin/env bash
set -euo pipefail

# push_to_repo.sh
# Safe helper to initialize a git repo (if needed) and push to a remote.
# Usage: ./push_to_repo.sh <remote-url> [branch]
# Example: ./push_to_repo.sh https://github.com/Swiftdaops/CSCPROJECT.git main

REMOTE_URL=${1:-}
BRANCH=${2:-main}

if [ -z "$REMOTE_URL" ]; then
  echo "Usage: $0 <remote-url> [branch]"
  exit 2
fi

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

if ! command -v git >/dev/null 2>&1; then
  echo "git is not installed. Install git and re-run this script." >&2
  exit 1
fi

if [ -d ".git" ]; then
  echo "Found existing .git directory. Will use existing repository metadata." 
else
  echo "Initializing new git repository..."
  git init
fi

# Ensure we have something to commit
if [ -z "$(git status --porcelain)" ]; then
  echo "No changes to commit. Staging all files..."
  git add .
else
  echo "Uncommitted changes detected. Staging all files..."
  git add .
fi

# Create an initial commit if there's no commit yet
if git rev-parse --verify HEAD >/dev/null 2>&1; then
  echo "Repository already has commits; creating a new commit for staged changes."
  git commit -m "Update project files" || echo "No staged changes to commit."
else
  echo "Creating initial commit..."
  git commit -m "Initial commit" || echo "No staged changes to commit."
fi

# Add or update remote
if git remote | grep -q "origin"; then
  echo "Remote 'origin' already exists. Updating URL to $REMOTE_URL"
  git remote set-url origin "$REMOTE_URL"
else
  echo "Adding remote origin $REMOTE_URL"
  git remote add origin "$REMOTE_URL"
fi

# Ensure branch name
git branch -M "$BRANCH" || true

# Try a normal push first
echo "Pushing to origin/$BRANCH (you may be prompted for credentials)..."
if git push -u origin "$BRANCH"; then
  echo "Push successful."
  exit 0
fi

# If push failed due to non-fast-forward, attempt pull --rebase
echo "Initial push failed. Attempting 'git pull --rebase origin $BRANCH' to integrate remote changes..."
if git pull --rebase origin "$BRANCH"; then
  echo "Rebase/pull succeeded. Retrying push..."
  git push -u origin "$BRANCH" || { echo "Push still failed. You may need to resolve conflicts or force push."; exit 1; }
  echo "Push successful after pull --rebase."
  exit 0
else
  echo "Automatic pull/rebase failed. You may need to resolve conflicts manually." >&2
  exit 1
fi
