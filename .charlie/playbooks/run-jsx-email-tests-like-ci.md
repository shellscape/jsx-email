# Run jsx-email tests locally exactly like CI (Moon + FORCE_COLOR)

## Overview
Run the `packages/jsx-email` test suite locally with the same settings CI uses so snapshots (including ANSI color) match exactly.

## Prerequisites
- Capabilities: GitHub + Devbox write access (local or CI).
- Tools: pnpm, Moon tasks (configured in this repo).
- Context: Some suites import from `dist/esm`, so plugin packages must be built first.

## Steps
1. Install deps and build required artifacts
   - `pnpm install`
   - `pnpm moon run plugin-inline:build plugin-minify:build plugin-pretty:build`
   - `pnpm moon run jsx-email:build`
2. Run tests with color forced (matches CI)
   - `FORCE_COLOR=1 pnpm moon run jsx-email:test.ci`
3. Optional: update snapshots only for intentional HTML/markup changes (never for log/ANSI deltas)
   - `cd packages/jsx-email && pnpm vitest -u --config ../../shared/vitest.config.ts && cd -`
4. TypeScript check (package)
   - `pnpm moon run jsx-email:tsc`

## Verify
- Expect: `Test Files 44 passed`, `Tests 187 passed` (numbers may grow over time).
- No snapshot diffs for logs when `FORCE_COLOR=1` is set.

## Rollback
- If you mistakenly updated snapshots for log/ANSI output, reset them:
  - `git restore --source=origin/$(git rev-parse --abbrev-ref HEAD) -- "packages/jsx-email/test/**/.snapshots/*.snap" || true`
  - Or discard all local changes: `git reset --hard`

## References
- CI workflow (color): `.github/workflows/test-*.yml` (look for `FORCE_COLOR=1`)
- Shared Vitest config: `shared/vitest.config.ts`
- Moon project tasks: `packages/jsx-email/moon.yml`
