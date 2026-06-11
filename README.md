# T-Rex Runner Demo

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Test

```bash
npm run test
```

## Lint

```bash
npm run lint
```

## Git Workflow

### Clone & install
```bash
git clone <repository-url>
cd T-Rex-game-Demo-Dry-Run
npm install
```

### Feature branch
```bash
git checkout -b feature/<task-name>
```

### Stage new files (required after every new file)
```bash
git add <new-file>
# or stage everything
git add .
```

### Commit (user approval required)
Review staged changes, then commit manually:
```bash
git diff --staged
git commit -m "feat(<scope>): short description"
```

> ⛔ The AI agent stages files but **never commits without your approval**.

### Push & PR
```bash
git push origin feature/<task-name>
```
Open a Pull Request on GitHub from your branch into `main`.

See [`.github/skills/git/SKILL.md`](.github/skills/git/SKILL.md) for the full Git guide.

