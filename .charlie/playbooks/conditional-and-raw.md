# Conditional + Raw playbook (renderer and tests)

Apply this when changing how `<Conditional>` or `<Raw>` render (MSO/expr tokens, wrappers, or how nested Raw is inlined).

Rules
- Include targeted tests and keep snapshot updates minimal (only intentional markup diffs).
- Do not introduce token “centralization” helpers or adjacency tests unless a maintainer explicitly requests them.
- Import from source for new tests to avoid prebuild coupling: `import { Conditional, Raw, render } from '../src/index.ts'`.

Test guidelines
- Closer/opener integrity
  - Assert exactly one opener and closer for MSO: `<!--[if mso]>` and the current closer `<![endif]/-->`.
  - Add a small case for the expression path (e.g., `expression="gte mso 16"`) and assert the same closer.
- No‑duplication when nesting Raw
  - For `<Conditional mso><Raw …/></Conditional>`, assert the inner payload appears exactly once and not outside the block.
  - Use `lastIndexOf` for closer slicing and allow opener at index `>= 0`.
- Snapshots and colorized logs
  - Run with `FORCE_COLOR=1` to match CI. Never “de‑colorize” or normalize log snapshots.

Commands (jsx-email)
- Build artifacts some suites rely on: `pnpm moon run plugin-inline:build plugin-minify:build plugin-pretty:build && pnpm moon run jsx-email:build`
- Tests (CI‑equivalent): `FORCE_COLOR=1 pnpm moon run jsx-email:test.ci`
- TypeScript: `pnpm moon run jsx-email:tsc`

References
- CI workflow (color): `.github/workflows/test-*.yml` (look for `FORCE_COLOR=1`)
- Shared Vitest config: `shared/vitest.config.ts`
- Package tasks: `packages/jsx-email/moon.yml`
