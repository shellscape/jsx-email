# jsx-email ChangeLog

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
