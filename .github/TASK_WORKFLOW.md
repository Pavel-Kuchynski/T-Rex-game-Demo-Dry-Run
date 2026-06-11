# Task Workflow Rules

## Overview
This document defines the rules for task organization and tracking in the T-Rex Runner project.

## Folder Structure

Tasks are organized by status in three folders:

### `/tasks/backlog`
- Contains tasks with status: `backlog`
- These are not yet started or scheduled
- No acceptance criteria should be checked
- Use when planning future work

### `/tasks/in-progress`
- Contains tasks with status: `in-progress`
- These are actively being worked on
- Some acceptance criteria may be checked
- Automatically updated when work begins
- Move task file here when starting implementation

### `/tasks/done`
- Contains tasks with status: `done`
- These are completed and verified
- **ALL** acceptance criteria MUST be checked with `[x]`
- Moved here when implementation is complete and all tests pass

## Task File Organization Rules

### Rule 1: Status Must Match Folder Location
```
Status: backlog      → lives in /tasks/backlog/XXX-task-name.md
Status: in-progress  → lives in /tasks/in-progress/XXX-task-name.md
Status: done         → lives in /tasks/done/XXX-task-name.md
```

### Rule 2: Acceptance Criteria Checkboxes
- Each acceptance criterion is a checkbox: `- [ ] Criterion text`
- Completed items are marked: `- [x] Criterion text`
- **At task completion:** ALL criteria must be `[x]`
- **No bare unchecked criteria allowed** in done tasks

### Rule 3: Task Workflow
```
[Backlog] → [In Progress] → [Done]
  (step 1)     (step 2)     (step 3)
```

**Step 1: Plan**
- Write task in `/tasks/backlog/XXX-task-name.md`
- Status: `backlog`
- Leave acceptance criteria unchecked: `- [ ]`

**Step 2: Start Work**
- Move file to `/tasks/in-progress/XXX-task-name.md`
- Update status: `in-progress`
- Check off criteria as you complete them

**Step 3: Complete**
- Move file to `/tasks/done/XXX-task-name.md`
- Update status: `done`
- **VERIFY:** All acceptance criteria are `[x]`
- Include test results showing all tests pass

## Verification Checklist

Before marking a task as `done`:

- [ ] All acceptance criteria have `[x]`
- [ ] Task file is in `/tasks/done/` folder
- [ ] Status field says `done`
- [ ] All unit tests pass (`npm test`)
- [ ] No compiler/lint errors (`npm run lint`)
- [ ] Documentation updated (README, comments)

## Example Task Lifecycle

### backlog/004-example-task.md
```markdown
# ExampleTask

## Status
backlog

## Acceptance Criteria
- [ ] Feature A implemented
- [ ] Feature B tested
- [ ] Documentation written
```

After implementation:

### done/004-example-task.md
```markdown
# ExampleTask

## Status
done

## Acceptance Criteria
- [x] Feature A implemented
- [x] Feature B tested
- [x] Documentation written
```

## Automation

- When moving a task between folders, update the `Status` field to match
- Use PR descriptions to reference task files: "Closes #004-example-task.md"
- Review task status before planning next sprint

---

**Last Updated:** June 10, 2026  
**Applies to:** T-Rex Runner project

