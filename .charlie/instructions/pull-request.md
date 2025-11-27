# Charlie instructions for jsx-email

Repo‑specific rules that keep Charlie aligned with this codebase and review preferences. Keep diffs small, mirror existing patterns, and don’t widen scope beyond the request.

## Scope
Applies to the entire repository, with extra focus on `packages/jsx-email` and its tests.

## Context
- Monorepo using pnpm + Moon. Most tasks are run with `pnpm moon run <project>:<task>`.
- Task inheritance lives in `.moon/tasks.yml`. Each project can add/override tasks in its own `moon.yml` (for example, `packages/jsx-email/moon.yml`). The root `moon.yml` defines repository tasks and is aliased as the `repo` project.
- TypeScript uses ESM with NodeNext resolution; relative imports in source include the `.js` suffix.
- Tests use Vitest; snapshots live in `.snapshots` next to tests (custom resolver).
- GitHub Actions sets `FORCE_COLOR=1` when running tests; local runs must mirror this to avoid ANSI snapshot diffs.
- Conventional Commits are the norm (e.g., `fix(jsx-email): …`). PRs should use the repository template.
- Conventional Commit scopes map to affected project name(s) under `packages/` (e.g., `(jsx-email)`, `(plugin-inline)`, `(create-jsx-email)`). When multiple projects are affected, list each name in the scope, comma‑separated with no spaces (e.g., `(plugin-inline,plugin-pretty)`). PRs should use the repository template.

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
  - Branch names (from humans): `{type}/{project}/{short-desc}` — for example, `fix/jsx-email/conditional-endif-slash`. Use the package with the most changes (or the intended target) for `{project}`, and let `{short-desc}` be a descriptive phrase or a short slug.
  - Conventional Commits scope = affected project name(s) from `packages/`. Examples: `fix(jsx-email): …`, `refactor(plugin-inline,plugin-pretty): …`. For multiple projects, list names comma-separated with no spaces.
  - Commit messages use Conventional Commits; ≤ 72 chars in the subject; no emojis.
  - PRs must use the repository template as-is — Charlie is not allowed to remove sections from the template.
  - Start as Draft when work is in flux; mark Ready only after local verification passes and the description reflects the actual changes.
  - Don’t add novel labels. Assign and request review from the human requester when appropriate.

> Conditional/Raw specifics have been moved to a dedicated playbook. See `.charlie/playbooks/conditional-and-raw.md`.

## References
1. CI workflow (test color): `.github/workflows/test-*.yml` (see `FORCE_COLOR=1` in test steps)
2. Vitest shared config: `shared/vitest.config.mts`
3. Moon tasks inheritance: `.moon/tasks.yml`; per-project tasks: `apps/*/moon.yml`, `packages/*/moon.yml`, `test/*/moon.yml`; repository tasks: `moon.yml` (project `repo`)
4. jsx-email package tasks: `packages/jsx-email/moon.yml`
5. Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/
6. Conditional/Raw playbook: `.charlie/playbooks/conditional-and-raw.md`
