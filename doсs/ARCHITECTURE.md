# T-Rex Runner — Architecture Document

## 🎯 Purpose

This document defines the internal architecture of the T-Rex Runner game.

It describes:
- how the game is structured
- how systems interact
- how data flows
- how the game loop works

All agents MUST follow this architecture.

---

## 🧠 Core Architecture Principle

The game is built using a **system-based architecture**:

> Entities are passive data  
> Systems contain all logic

No “smart objects” are allowed.

---

## 🔁 Game Loop Model

The entire game runs inside a fixed loop:

```text
GameLoop
 ├── input.update()
 ├── systems.update()
 ├── physics/collision update
 ├── state update
 └── render()