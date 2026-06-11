# T-Rex Runner Game

## 🎯 Project Goal

Create a browser-based clone of the Chrome offline T-Rex Runner game using **vanilla JavaScript and HTML5 Canvas**.

The game must be:
- simple
- fast (60 FPS)
- modular
- easily extendable

---

## 🧱 Core Vision

This is a **minimal real-time arcade game**:

- The player controls a running dinosaur
- The game is endless
- Obstacles spawn over time
- Difficulty increases gradually
- Collision ends the run
- Score increases based on survival time

---

## ⚙️ Tech Constraints

- JavaScript (ES2022+)
- HTML5 Canvas API only
- No game engines (NO Phaser, Unity, etc.)
- No heavy frameworks
- Optional: small utility libs allowed (only if justified)
- Must run in modern browsers

---

## 🧩 Game Architecture Principles

The game must be built using **system-based architecture**:

### Required systems:

- GameLoopSystem
- InputSystem
- RenderSystem
- CollisionSystem
- ScoreSystem
- ObstacleSystem
- DifficultySystem

---

## 🧠 Entity Model

Game entities must be simple and modular:

- T-Rex (player)
- Cactus (obstacle)
- Bird (obstacle)
- Ground

Rules:
- No God objects
- Entities must not contain game loop logic
- Behavior must be handled by systems

---

## 🎮 Game States

The game must support:

- `menu` → initial state
- `running` → active gameplay
- `gameOver` → end state

State transitions must be deterministic and controlled by GameLoopSystem.

---

## 🎯 MVP Definition (MOST IMPORTANT)

The first playable version MUST include:

### Core gameplay:
- T-Rex movement (run + jump)
- Obstacles (at least cactus)
- Collision detection
- Game over state
- Restart functionality
- Score system

### Requirements:
- Stable 60 FPS gameplay
- No memory leaks during long runs
- Clean restart (no broken state)

---

## 📈 Progression System

Game must include:

- gradual speed increase over time
- increasing obstacle frequency
- optional difficulty scaling system

---

## 🎨 Rendering Rules

- All rendering must use Canvas API
- Rendering must be separated from game logic
- No logic inside render functions
- No DOM-based gameplay logic

---

## ⌨️ Input System

- Keyboard controls:
    - Space → jump
    - (optional) Arrow up → jump

Rules:
- No continuous jump spam
- One jump per key press

---

## 💥 Collision Rules

- Must be pixel/box based (AABB acceptable)
- Must be deterministic
- Must handle high-speed edge cases
- Must not miss collisions at high FPS variance

---

## 🧪 Testing Requirements

Game logic must be testable using:

- Vitest
- Simulation-based tests

Must test:
- jump mechanics
- collision detection
- score progression
- game state transitions
- restart logic


## Task Lifecycle Rules

All tasks MUST follow this lifecycle:

### States

1. backlog/
2. in-progress/
3. done/

---

### Rules

#### 1. When Project Manager creates a task:
- It MUST be placed in `tasks/backlog/`

#### 2. When Developer starts working on a task:
- Move task file from `backlog/` → `in-progress/`

#### 3. When implementation is finished:
- Developer moves task → `done/`

#### 4. Tester validation:
- If tests fail → move back to `in-progress/`
- If tests pass → keep in `done/`

---

### Critical Rule

👉 No task is considered complete unless it is physically in `tasks/done/`
---