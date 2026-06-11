// Task Management Workflow Summary

```
FOLDER STRUCTURE
================

/tasks/
  ├─ backlog/        → status: "backlog"       (not started)
  ├─ in-progress/    → status: "in-progress"   (being worked on)
  └─ done/           → status: "done"          (completed ✅)


WORKFLOW RULES
==============

1. FILE LOCATION = STATUS
   ✓ backlog/004-task.md        when status: backlog
   ✓ in-progress/004-task.md    when status: in-progress
   ✓ done/004-task.md           when status: done

2. ACCEPTANCE CRITERIA MUST MATCH STATUS
   Backlog/In-Progress:  - [ ] Criterion    (mostly unchecked)
   Done:                 - [x] Criterion    (ALL must be checked)

3. TASK LIFECYCLE
   1️⃣  Write in /tasks/backlog/XXX-task.md
       Status: backlog
       Criteria: - [ ]

   2️⃣  Start work → Move to /tasks/in-progress/XXX-task.md
       Status: in-progress
       Criteria: check off as you complete

   3️⃣  Complete → Move to /tasks/done/XXX-task.md
       Status: done
       Criteria: ALL must be [x]
       Tests: npm test ✅


CURRENT STATUS
==============

✅ 001-project-setup.md          → DONE
✅ 002-game-loop-system.md       → DONE
✅ 003-input-system.md           → DONE
⏳ 004-trex-entity.md            → BACKLOG
⏳ 005-jump-mechanic.md          → BACKLOG
⏳ 006-ground-and-render-setup.md → BACKLOG
... more tasks in backlog


QUICK ACTIONS
=============

Starting a task:               Moving a task to done:
1. Move file from             1. Move file from
   backlog/ to in-progress/      in-progress/ to done/
2. Change status to            2. Change status to done
   "in-progress"               3. Mark ALL criteria [x]
3. Start implementing          4. Verify npm test passes


See .github/TASK_WORKFLOW.md for full documentation
```

