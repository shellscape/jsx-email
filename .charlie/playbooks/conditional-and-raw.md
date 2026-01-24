# Conditional + Raw playbook (renderer and tests) — next/v3 branch

Apply this when changing how `<Conditional>` or `<Raw>` render (MSO/expr tokens, wrappers, or how nested Raw is inlined).

This copy lives on the `next/v3` branch. For the ongoing alignment work on `<Raw>` / `<Conditional>` semantics and tests (tracked in #348):
- Branch from `origin/next/v3`.
- Open pull requests with `base` set to `next/v3` (not `main`).
- Mention `#348` in the PR description so reviewers can tie the change back to the alignment effort.

Rules
- Include targeted tests and keep snapshot updates minimal (only intentional markup diffs).
- Do not introduce token "centralization" helpers or adjacency tests unless a maintainer explicitly requests them.
- Import from source for new tests to avoid prebuild coupling: `import { Conditional, Raw, render } from '../src/index.ts'`.

Test guidelines
- Closer/opener integrity
  - Assert exactly one opener and closer for MSO: `<!--[if mso]>` and the current closer `<![endif]/-->`.
  - Add a small case for the expression path (e.g., `expression="gte mso 16"`) and assert the same closer.
- No‑duplication when nesting Raw
  - For `<Conditional mso><Raw …/></Conditional>`, assert the inner payload appears exactly once and not outside the block.
  - Use `lastIndexOf` for closer slicing and allow opener at index `>= 0`.
- Snapshots and colorized logs
  - Run with `FORCE_COLOR=1` to match CI. Never "de‑colorize" or normalize log snapshots.

Commands (jsx-email)
- Build artifacts some suites rely on: `pnpm moon run plugin-inline:build plugin-minify:build plugin-pretty:build && pnpm moon run jsx-email:build`
- Tests (CI‑aligned for `next/v3`): `pnpm moon run jsx-email:test` (the Moon task sets `FORCE_COLOR=1` like CI)
- TypeScript: `pnpm moon run jsx-email:tsc`

References
- CI workflow (color): `.github/workflows/test-*.yml` (look for `FORCE_COLOR=1`)
- Shared Vitest config: `shared/vitest.config.mts`
- Package tasks: `packages/jsx-email/moon.yml`
