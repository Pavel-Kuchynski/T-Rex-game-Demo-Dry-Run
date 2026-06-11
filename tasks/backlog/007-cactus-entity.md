# Cactus Entity

## ID
007

## Priority
High

## Status
backlog

## Description
Define the `Cactus` passive data entity covering all MVP cactus variants. Variants differ in width, height, and hitbox — the entity stores which variant it is so `RenderSystem` and `CollisionSystem` can use the correct dimensions.

## Acceptance Criteria
- [ ] `Cactus` class (or factory function) exists in `src/entities/Cactus.js`
- [ ] Instance exposes: `x`, `y`, `width`, `height`, `speed` (all numbers)
- [ ] Instance exposes: `variant` (string: `"smallSingle"` | `"smallDouble"` | `"smallTriple"` | `"largeSingle"` | `"largeDouble"`)
- [ ] Instance exposes: `active` (boolean) used by the object pool (`true` = in use)
- [ ] A `reset(variant, x, speed)` method reinitialises all fields for pool reuse
- [ ] Dimensions per variant are defined in `src/core/constants.js` as a lookup table `CACTUS_VARIANTS` (each entry: `{ width, height }`)
- [ ] `y` is automatically set so the cactus base sits on the ground line (`GROUND_Y - height + TREX_HEIGHT` or equivalent)
- [ ] `active` defaults to `false` (entities start pooled/inactive)

## Technical Notes
- The variant dimension table in constants enables `RenderSystem` to draw the correct proportional rectangle without any logic in the render function.
- Do NOT hardcode pixel values inside `Cactus.js` — all sizes come from `CACTUS_VARIANTS` in constants.
- Suggested MVP dimensions: smallSingle 17×35, smallDouble 34×35, smallTriple 51×35, largeSingle 25×50, largeDouble 50×50.
- `active` flag is the pool sentinel — `ObstacleSystem` sets it to `true` on spawn and `false` on despawn.

## Dependencies
001

## Estimated Effort
XS
