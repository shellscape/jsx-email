This repo is a pnpm workspace and uses Moon as the task runner.

- Repo tasks are run via Moon (not `package.json` scripts). The only root script is `prepare` (Husky).
- `pnpm` is for dependency management only. Never use it as a prefix to run another Node binary (no `pnpm exec`, no `pnpm <tool>`, etc.). The only exception is inside Husky hooks (for example `.husky/pre-commit`).
- Do not bypass pnpm's `minimumReleaseAge` policy. When adding or updating dependencies, choose versions that satisfy the policy in `pnpm-workspace.yaml`.
- Bun is BANNED in this repository. NEVER use it (use `tsx` for running TypeScript scripts).

## Commits and PR titles

Use Conventional Commits for both commit messages and PR titles: https://www.conventionalcommits.org/en/v1.0.0/

Format:

`<type>(<scope>)!?: <description>`

- The `scope` should be a package name, minus any npm scope (like @jsx-email). Scope for `@jsx-email/plugin-minify` would be `plugin-minify`
  - If the change is not tied to a project, use `chore(repo): ...`.
  - `repo` is reserved for repo-wide changes only and must not be combined with other scopes (avoid `feat(svc-api,repo): ...`).
  - If the change affects multiple projects, list them in `scope` separated by commas with no spaces (for example `feat(svc-api,web-admin): ...`).
- Add `!` after the scope for breaking changes (for example `feat(svc-api)!: ...`).
- Keep the description succinct and direct.
- If a Linear issue is associated, end the description with a period and append the issue ID(s).
  - Single: `fix(svc-api): handle invalid tokens. JUR-21`
  - Multiple: `fix(svc-api): handle invalid tokens. JUR-21,JUR-22`
- In PR bodies, use `Resolves` (not `Refs`) when preceding a Linear issue link (for example `Resolves https://linear.app/jurymax/issue/JUR-21`).

## Git workflow

- Push early and often to the branch you’re working on (especially in an ephemeral devbox), so your work is always backed up.

## Scripts

Prefer TypeScript over plain JavaScript for scripts written as code files, and prefer `tsx` for
running scripts written in TypeScript or JavaScript. This does not mean Bash scripts are
forbidden; use the best tool for the job.

"scripts" are defined as code files intended to be run standalone and typically located in a
`scripts/` directory. "scripts" does not mean Moon commands or Bash commands.

Adhoc browser automation commands are forbidden. Do not run inline Playwright, Puppeteer, Chrome,
or other browser scripts with `node -e`, heredocs, shell one-liners, or temporary files outside the
repo. Browser automation must live in a committed TypeScript script under `scripts/agents/` and be
run with `tsx`.

## Preview app

- The preview app lives in `apps/preview/app/src`; keep app code there and mirror tests under
  `apps/preview/app/test`.
- The packed preview is built by `apps/preview/scripts/pack-preview.ts`, which concatenates an
  explicit `sourceFiles` list and strips local imports. When adding, moving, or importing preview
  source files that must run in the packed app, update that list and the `importHeader` in the pack
  script for any external imports/types those files need.
- After changing preview source used by the packed app, run
  `./node_modules/.bin/moon run app-preview:pack` and the smoke test
  `./node_modules/.bin/moon run smoke-v2:run`.
- Do not rely only on the Vite dev app checks for preview changes; smoke tests exercise the packed
  preview path used by the CLI.

## Checks

Run checks through Moon (mirrors CI):

```bash
moon run :lint
moon run :format
moon run :typecheck
moon run :test
```

If `moon` isn’t available on your PATH, run it via `./node_modules/.bin/moon` (for example `./node_modules/.bin/moon run :lint`).

`moon repo:build.all --cache off` is the canonical task to use for building (compiling) all packages.
Do not run `:compile` tasks directly. `:build` tasks can be called on projects outside of packages.

## Moon config

- Workspace config lives in `.moon/workspace.yml`.
- Shared tasks live in `.moon/tasks.yml` and are inherited by all projects.
- Add a project `moon.yml` only when you need to override or extend inherited tasks.
- Moon docs: https://moonrepo.dev/docs/config

## Dependencies

- Workspace packages are declared in `pnpm-workspace.yaml`, with a single lockfile at `pnpm-lock.yaml`.
- Tooling that’s shared across the repo should live in the root `package.json`.
- Project `package.json` files should only include what that project needs.
- Use `workspace:` for internal package dependencies.
- Prefer the pnpm `catalog:` protocol for shared third-party versions.

## Git hooks

Husky is enabled via the root `prepare` script. The `pre-commit` hook runs
`lint-staged`, which runs `oxlint` and `oxfmt` on staged files.

## Code conventions

- Keep source files to ~200 lines max
  - If a file is pushing past ~200 lines, split it by concern (extract helpers/types, or move discrete features into separate modules).
  - Test files and `.astro` components are exempt from this limit.
  - Markdown, MDX and CSS files are exempt
- Constant variable names should use `camelCase` (for example `const myVar = null`, not `const MY_VAR = null`)
- Prefer a `helpers` directory/files over `utils`
- Never use a `lib` directory for app code
- Filenames are `kebab-case` for files you control
- Prefer arrow functions `const f = () => {}` vs `function f {}` where scope of `this` is not a concern
- Parent-path imports outside of the current/affected project directory are forbidden

## Tests

- Tests live in a `test/` directory at the same level as `src/`.
- Tests should never exist within `src/`.
- All new files, bug fixes, and new features must include unit and integration test coverage.
  - This is a requirement for a PR to be merged.
- The directory structure under `test/` should mirror `src/`.
  - If `src/server.ts` has tests created for it, that test file should be `test/server.test.ts`.
  - If `src/routes/myroute.ts` has tests created for it, that test file should be `test/routes/myroute.test.ts`.
- Snapshots should live within `test/.snapshots/`.
  - Each subdirectory should contain its own snapshots.
    - If `test/routes/myroute.test.ts` produces snapshots, those snapshots should live at `test/routes/.snapshots/`.
  - `vitest.config.ts` supports configuring a custom snapshot directory location.

## Patterns

- Avoid classes unless state is essential and must be encapsulated.
- Avoid throwing a generic `Error` for expected failures.
  - Prefer built-in errors when they accurately describe the failure (for example `TypeError`, `RangeError`, or `AssertionError`).
  - Otherwise throw an app-specific error that subclasses `BaseError` (never throw `BaseError` directly).
  - `BaseError` must be `abstract` and must accept a `code` in its constructor.
  - Error codes are string values with an `ERR_` prefix (uppercase, underscore-delimited), for example `const errAnExample = 'ERR_AN_EXAMPLE'`.

## TypeScript and imports

- Use ESM modules with TypeScript.
- Prefer workspace import paths (for example `@jsx-email/core`) over deep relative hops.

## Validation (Valibot)

- Use Valibot schemas for runtime validation of untrusted input (request bodies/params, env/config, external API payloads).
- Use the schema as the source of truth for object shape typing via `InferInput`/`InferOutput`.
- For object shapes, prefer `object(...)`; use `strictObject(...)` when unknown keys should be rejected.
- Prefer direct Valibot imports (for example `import { object, string } from 'valibot'`) instead of `import * as v from 'valibot'`.
- Reuse schemas: if create and update payloads share a shape, use one schema (prefer `{ name }`). Only split when the shapes diverge, and extend from the shared base.
- Prefer Valibot schemas for validation where validation is necessary and derive types from the schema (`InferInput`/`InferOutput`) instead of duplicating shapes in TypeScript.

## General principles

- Prefer DRY (Do Not Repeat Yourself).
- Prefer KISS (Keep It Simple Stupid).
- Don’t over-optimize error handling or validation
- Don’t be over-protective; use sane, reasonable data protection and error checking/throwing.
