---
name: git
description: Use Git for version control to manage changes to the T-Rex Runner game code, collaborate with others, and maintain a history of your work. This includes creating branches, committing changes, and pushing to a remote repository.
---

# Git Skill (NORMATIVE)

## Overview

This project uses **Git** for version control. All source code, tests, and documentation changes must be tracked via Git.

---

## Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd T-Rex-game-Demo-Dry-Run

# Install dependencies after cloning
npm install
```

---

## Daily Workflow

### 1. Check current status
```bash
git status
```

### 2. Create a feature branch
Always work on a dedicated branch — never commit directly to `main`.

```bash
git checkout -b feature/<task-name>
# Example:
git checkout -b feature/cactus-entity
```

### 3. Stage new and changed files
**All new files MUST be explicitly added to Git before committing.**

```bash
# Stage a specific new file
git add src/entities/Cactus.js

# Stage all new and modified files at once
git add .

# Stage by pattern
git add src/entities/*.js
```

> ⚠️ **Rule**: Every new file created during development must be staged with `git add` before it can be committed.

### 4. Review what will be committed
```bash
git diff --staged
```

### 5. Commit — requires user approval
> ⛔ **Agent Rule**: The AI agent (Copilot) **must NOT run `git commit` autonomously**.  
> The agent must stage files (`git add`) and then **stop and ask the user** to review and approve the commit.

Once you have reviewed the staged changes, commit manually:

```bash
git commit -m "feat(entity): add Cactus entity with hitbox"
```

#### Commit message convention
Use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to use |
|--------|-------------|
| `feat` | New feature or game mechanic |
| `fix` | Bug fix |
| `test` | Adding or updating tests |
| `docs` | Documentation only |
| `refactor` | Code refactor without behaviour change |
| `chore` | Tooling, config, build changes |

### 6. Push your branch
```bash
git push origin feature/<task-name>
```

### 7. Open a Pull Request
Open a PR on GitHub from your feature branch into `main`. Request a review before merging.

---

## Useful Commands

```bash
# See commit history (compact)
git log --oneline --graph --all

# Undo staged changes (un-stage without losing edits)
git restore --staged <file>

# Discard local changes to a file
git restore <file>

# See which files changed between branches
git diff main...feature/<task-name> --name-only
```

---

## Agent Rules (NORMATIVE)

These rules apply to the AI coding agent (GitHub Copilot / Copilot agent):

1. **Stage all new files**: After creating any new file the agent MUST run `git add <file>` (or `git add .`) to stage it.
2. **No autonomous commits**: The agent MUST NOT run `git commit` without explicit user approval. After staging, the agent must pause and prompt the user to review and confirm the commit.
3. **No force-push**: The agent MUST NOT run `git push --force` or `git push -f`.
4. **No branch deletion**: The agent MUST NOT delete branches without user confirmation.
