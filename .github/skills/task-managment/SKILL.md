---
name: Task Management
description: "Manage and track tasks effectively, ensuring timely completion and organization."
---

# Task Management

## Quick Start

Tasks are stored in three folders based on status:

- **`tasks/backlog/`** → status: `backlog` (not yet started)
- **`tasks/in-progress/`** → status: `in-progress` (actively being worked on)
- **`tasks/done/`** → status: `done` (completed, all criteria ✅)

## Workflow Rules

See [TASK_WORKFLOW.md](../../TASK_WORKFLOW.md) for detailed guidelines:

### Rule 1: Status Must Match Folder
Ensure the task file location matches its status field.

### Rule 2: Acceptance Criteria Checkboxes
- **Backlog:** `- [ ]` (unchecked)
- **In Progress:** Mixed (some checked, some not)
- **Done:** `- [x]` (ALL must be checked)

### Rule 3: Task Lifecycle
```
Backlog → In Progress → Done
```

## Verification Checklist

Before marking a task as `done`:

✅ All acceptance criteria have `[x]`  
✅ Task file is in `tasks/done/` folder  
✅ Status field says `done`  
✅ All unit tests pass  
✅ No compiler/lint errors  

## Example

**Before completion (in backlog):**
```markdown
## Status
backlog

- [ ] Feature A
```

**After completion (in done):**
```markdown
## Status
done

- [x] Feature A (verified by test)
```

