# jsx-email ChangeLog

## v2.5.5

_2025-01-08_

### Bugfixes

- jsx-email: add link href to vml for outlook buttons (#274)

## v2.5.4

_2024-12-12_

### Bugfixes

- jsx-email: update unocss for Tailwind component (#265)

## v2.5.3

_2024-12-09_

### Bugfixes

- jsx-email: deprecate the `base-path` flag (#262)

## v2.5.2

_2024-12-09_

### Bugfixes

- jsx-email: export Raw component + docs fixes (#261)

## v2.5.1

_2024-12-08_

### Bugfixes

- jsx-email: correct the disable prop of the Raw component, add docs (#260)

## v2.5.0

_2024-12-08_

### Features

- jsx-email: `Raw` component (#259)

## v2.4.2

_2024-12-03_

### Bugfixes

- jsx-email: rollback the watcher to only watch entrypoint directories (#258)

## v2.4.1

_2024-12-02_

### Bugfixes

- jsx-email: optimize cookie, set-cookie-parser for vite (#256)

## v2.4.0

_2024-12-02_

### Features

- jsx-email: improve preview speed, hot reload, routing (#253)

## v2.3.5

_2024-11-26_

### Updates

- jsx-email: update dependencies (#251)

## v2.3.4

_2024-11-25_

### Bugfixes

- jsx-email: update unocss/tailwind support (#250)

## v2.3.3

_2024-11-24_

### Bugfixes

- jsx-email: configure tshy to stop removing compile export (7635846)

## v2.3.2

_2024-11-24_

### Bugfixes

- jsx-email: correct package.json (7c58d46)

## v2.3.1

_2024-11-24_

### Bugfixes

- jsx-email: export compile method in separate path (#249)

## v2.3.0

_2024-11-24_

### Features

- jsx-email,app-preview: --base-path flag, deploy preview to sub path (#247)

## v2.2.0

_2024-11-23_

### Features

- jsx-email: import css in templates (#244)

## v2.1.5

_2024-11-15_

### Bugfixes

- jsx-email,create-jsx-email: consolidate and fix TS types in template (#242)

## v2.1.4

_2024-11-04_

### Bugfixes

- jsx-email: dont declare exports for cjs build. fixes #235 (#236)

## v2.1.3

_2024-11-02_

### Updates

- jsx-email: update unocss (tailwind) dependencies (#233)

## v2.1.2

_2024-10-29_

### Bugfixes

- jsx-email,create-jsx-email: dangling width on button in generator (#232)

## v2.1.1

_2024-10-26_

### Bugfixes

- jsx-email: use upstream lilconfig, upstream next fix (#231)

## v2.1.0

_2024-10-26_

### Bugfixes

- jsx-email: modify core plugin imports for bundler resolution (#230)

### Features

- jsx-email: add config support for ESBuild plugins (#229)

## v2.0.11

_2024-10-16_

### Bugfixes

- jsx-email: prevent cellPadding, cellSpacing override (#223)

## v2.0.10

_2024-10-15_

### Bugfixes

- jsx-email: rework watcher for preview. add smoke test. fixes #217 (#219)

## v2.0.9

_2024-10-15_

### Bugfixes

- jsx-email: create command esm fix (#222)

## v2.0.8

_2024-10-13_

### Bugfixes

- jsx-email: change how package.json is read so it doesn't break with recent node versions (#215)

## v2.0.7

_2024-10-06_

### Bugfixes

- jsx-email: linux bin execution bug (#214)

## v2.0.6

_2024-10-05_

### Bugfixes

- jsx-email: restore local static assets for preview (#212)

## v2.0.5

_2024-10-04_

### Bugfixes

- jsx-email: add classnames to optimized deps for vite preview (0be455b)

## v2.0.4

_2024-10-04_

### Bugfixes

- jsx-email: use regular react vite plugin (a428d50)

## v2.0.3

_2024-10-04_

### Updates

- jsx-email: reverse symlink for readme (648c9ba)

## v2.0.2

_2024-10-04_

### Updates

- jsx-email: restore jsx-email package REAMDE (7486b4d)

## v2.0.1

_2024-10-04_

### Updates

- jsx-email: revert version number to prep for major (dd7cd2c)
- jsx-email: improve build, preview, mergeConfig, de-dupe plugins (#208)

### Bugfixes

- jsx-email: watch all template imports for preview (#210)

### Features

- jsx-email,app-preview,create-jsx-email,plugin-inline,plugin-minify,plugin-pretty: version 2.0.0 (#206)

## v1.12.1

_2024-05-09_

### Bugfixes

- jsx-email: build process broken on Windows, fixes #194 (#195)

## v1.12.0

_2024-04-19_

### Features

- jsx-email: add `bgImage` and `bgColor` props to `<Column>` (#188)

## v1.11.0

_2024-04-17_

### Features

- jsx-email: add meta tags to `head` and update test suite (#187)
- jsx-email: add `rem-to-px` preset to `unoconfig` (#189)

## v1.10.12

_2024-02-24_

### Bugfixes

- jsx-email,create-jsx-email: deal with node:fs/promise imports in preview (#177)

## v1.10.11

_2024-02-23_

### Bugfixes

- jsx-email: bump minify-preset, add tests (51304c8)

## v1.10.10

_2024-02-23_

### Bugfixes

- jsx-email: use custom minify preset (#173)

## v1.10.9

_2024-02-02_

### Bugfixes

- jsx-email: assert media query for Tailwind dark mode variants (#167)

## v1.10.8

_2024-01-31_

### Bugfixes

- jsx-email: correct nested build output (#165)

## v1.10.7

_2024-01-31_

### Bugfixes

- jsx-email: cli build nested files (#164)

## v1.10.6

_2024-01-29_

### Bugfixes

- jsx-email: move preview app to peerDeps, isolation for preview tests (#157)

## v1.10.5

_2024-01-26_

### Bugfixes

- jsx-email: shouldn't clobber `<head>` contents (#155)

## v1.10.4

_2024-01-24_

### Bugfixes

- jsx-email: normalize relative preview path for windows (#154)

## v1.10.3

_2024-01-24_

### Bugfixes

- jsx-email: bump app-preview dep version (98cb8ca)

## v1.10.2

_2024-01-23_

### Bugfixes

- jsx-email: inject target path for preview app (#151)

## v1.10.1

_2024-01-23_

### Bugfixes

- jsx-email: debug dependency needs vite optimize (b660f8f)

## v1.10.0

_2024-01-22_

### Features

- jsx-email: use debug for data attribute rendering (#147)

## v1.9.0

_2024-01-20_

### Features

- jsx-email: build and deploy user preview apps (#144)

## v1.8.0

_2024-01-16_

### Features

- jsx-email: add better environment variable support. fixes #139 (#142)

## v1.7.3

_2024-01-13_

### Bugfixes

- jsx-email: revert excluding jsx-email+react during build. fixes #137 (#138)

## v1.7.2

_2024-01-09_

### Bugfixes

- jsx-email: shikiji error while using cjs, auto import react (#130)

## v1.7.1

_2024-01-08_

### Bugfixes

- jsx-email: use compatible version range for app-preview dependency (0ce03e1)

## v1.7.0

_2024-01-01_

### Features

- jsx-email: add Conditional (mso) component (#119)

## v1.6.1

_2023-12-29_

### Bugfixes

- jsx-email: remove qr-code (#117)

## v1.6.0

_2023-12-28_

### Features

- jsx-email: preview mobile devices in preview app (#114)

## v1.5.3

_2023-12-26_

### Bugfixes

- jsx-email: make jsx files visible to preview app (#112)

## v1.5.2

_2023-12-26_

### Bugfixes

- jsx-email: allow preview server to serve files outside of workspace root (#105)

## v1.5.1

_2023-12-26_

### Bugfixes

- jsx-email: add prefix to production class names (#111)

## v1.5.0

_2023-12-21_

### Features

- jsx-email: QrCode component (#93)

## v1.4.1

_2023-12-19_

### Bugfixes

- jsx-email: remove errant semicolon in ColorScheme component (dfe366b)

## v1.4.0

_2023-12-18_

### Features

- jsx-email: ColorScheme component for dark and light mode setup (#104)

## v1.3.1

_2023-12-17_

### Bugfixes

- jsx-email: assert comma color function notation for Tailwind (#101)

## v1.3.0

_2023-12-16_

### Features

- jsx-email: disable default component style (#100)

## v1.2.0

_2023-12-09_

### Features

- jsx-email: allow passing html-to-text options to render (2a90ec9)

## v1.1.3

_2023-12-08_

### Bugfixes

- jsx-email: further normalize janky windows paths (8e57033)
- jsx-email: strip brackets from links for plain text (9b8a1cc)

## v1.1.2

_2023-12-04_

### Bugfixes

- jsx-email: tweak the exports loading logic for `build` (daac84b)

## v1.1.1

_2023-12-03_

### Bugfixes

- jsx-email: optimize transient deps for preview, fixes #90 (725baaa)

## v1.1.0

_2023-12-03_

### Features

- jsx-email: show html size, warn if over gmail threshold (#89)

## v1.0.3

_2023-12-01_

### Bugfixes

- jsx-email: don't default button target to \_blank. fixes #81 (a7690ba)

## v1.0.2

_2023-12-01_

### Bugfixes

- jsx-email: render TemplateStruct in preview (6c315a8)

## v2.0.0

_2023-11-30_

### Breaking Changes

- feat!: use jsx-email (f606d30)

## v1.0.1

_2023-11-30_

### Bugfixes

- fix: correct moon release dependencies (8187d3f)

## v1.0.0

_2023-11-30_

### Breaking Changes

- feat!: initial release, move to a monopackage (#76)

### Bugfixes

- fix: add react to devDeps (b9a1373)

### Features

- feat: initial release (#34)

### Updates

- chore(\*): use tsup (again) to produce compatible esm and cjs builds (#42)
