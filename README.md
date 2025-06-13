# Toder
Just my daily time pass tracker

> A GitHub repo to track coding practice using structured markdown files and automated commit hooks.

### Features

- 📌 Organize questions by `year/month/day`
- 🧹 Auto-generate markdown from a `source.txt`
- 🔐 Uses modern Husky (v9+) with no deprecated commands
- 🪄 Pre-commit hook auto-stages created files

### Usage

1. ADD `source.txt`:
   - Line 1: question link
   - Line 2: solution remark
   - Line 3+: Java code

2. Run:
   ```bash
   npm run start-commit
   ```
   And you're done!
