# Charlie instructions for jsx-email

Repo‑specific rules that keep Charlie aligned with this codebase and review preferences. Keep diffs small, mirror existing patterns, and don’t widen scope beyond the request.

## Scope
Applies to the entire repository, with extra focus on `packages/jsx-email` and its tests.

## Context
- Monorepo using pnpm + Moon. Most tasks are run with `pnpm moon run <project>:<task>`.
- TypeScript uses ESM with NodeNext resolution; relative imports in source include the `.js` suffix.
- Tests use Vitest; snapshots live in `.snapshots` next to tests (custom resolver).
- GitHub Actions sets `FORCE_COLOR=1` when running tests; local runs must mirror this to avoid ANSI snapshot diffs.
- Conventional Commits are the norm (e.g., `fix(jsx-email): …`). PRs should use the repository template.

## Rules
- [R1] Stay on task. Do not add refactors, helpers, or style tweaks outside the explicit ask. Keep diffs minimal.
- [R2] Tests and snapshots:
  - Run with `FORCE_COLOR=1` to match CI.
  - Never change log/ANSI‑colored snapshots to “de‑colorize” or “stabilize” output. If a log snapshot fails, fix the cause or mirror CI settings; do not rewrite the assertion shape.
  - Do not introduce “snapshot normalization” helpers (e.g., projecting only parts of config objects) unless a maintainer requests it.
  - Place/update snapshots under `.snapshots` alongside the test file; prefer targeted assertions plus snapshots when behavior changes intentionally.
- [R3] Writing tests for `packages/jsx-email`:
  - Prefer importing from package source (e.g., `../src/index.ts`) for new tests to avoid prebuild coupling. If an existing suite imports from `dist`, keep that pattern for that suite.
  - Avoid adding `// @ts-ignore` to suppress React imports; tests can rely on the React automatic JSX runtime. Don’t add new ignores.
  - Follow NodeNext import style in source files (relative imports include `.js`).
- [R4] Verification commands (run locally before marking a PR Ready):
  - Build artifacts used by tests:
    - `pnpm moon run plugin-inline:build plugin-minify:build plugin-pretty:build`
    - `pnpm moon run jsx-email:build`
  - Lint: `pnpm moon run repo:lint`
  - Tests (exactly like CI): `FORCE_COLOR=1 pnpm moon run jsx-email:test.ci`
  - TypeScript (package): `pnpm moon run jsx-email:tsc`
  - Do not change tool configs or CI to make checks pass.
- [R4.1] Linting (must run before pushing any commits):
  - Run repo linting via Moon: `pnpm moon run repo:lint`.
  - Do not push if linting reports errors anywhere. Fix them or coordinate a follow‑up if they are unrelated but surfaced by your changes.
  - If linting reports warnings in files you modified, resolve those warnings before pushing.
  - For quick checks while iterating, you may run ESLint scoped to touched files, but always run the full `repo:lint` before the final push.
- [R5] Git & PRs:
  - Branch names: `<type>/<short-slug>` (e.g., `fix/conditional-endif-slash`).
  - Commit messages use Conventional Commits; ≤ 72 chars in the subject; no emojis.
  - Use the repository PR template. Start as Draft when work is in flux; mark Ready only after local verification passes and the description reflects the actual changes.
  - Don’t add novel labels. Assign and request review from the human requester when appropriate.
- [R6] Conditional/Raw specifics (from recent work):
  - Changes to conditional comment tokens or rendering must include targeted tests and minimal snapshot updates limited to intentional markup differences.
  - Do not introduce token “centralization” or adjacency tests unless explicitly requested by a maintainer.

## References
1. CI workflow (test color): `.github/workflows/test-*.yml` (see `FORCE_COLOR=1` in test steps)
2. Vitest shared config: `shared/vitest.config.ts`
3. jsx-email package scripts/tasks: `packages/jsx-email/moon.yml`
4. Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/
