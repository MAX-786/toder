#!/bin/bash
# Run the precommit.js logic
node scripts/precommit.js

# Stage all changes (generated file, cleared source.txt, other edits)
git add .

# Commit with custom message, or default
if [ -z "$1" ]; then
  echo "❗ No commit message provided. Use: ./git-auto.sh \"your message\""
  exit 1
fi
git commit -m "$1"

# Try pushing (warn on failure)
git push || echo "⚠️ Push failed (maybe no remote configured)."
