# Radix inventory and shadcn replacement map (`main` + `next/v3`)

System font reference for docs/examples: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'`.

## Branch: `main`

### Radix packages/primitives observed

| Package | Primitives observed | Key files |
| --- | --- | --- |
| `@radix-ui/react-select` | `Root`, `Trigger`, `Value`, `Icon`, `Portal`, `Content`, `Viewport`, `Item`, `ItemText`, `ItemIndicator`, `ScrollUpButton`, `ScrollDownButton`, `Separator`, `Group` | `apps/preview/app/src/components/mobile.tsx` |
| `@radix-ui/react-popover` | `Root`, `Trigger`, `Portal`, `Content`, `Arrow`, `Close` | `apps/preview/app/src/components/nav.tsx`, `apps/preview/app/src/components/send.tsx` |
| `@radix-ui/react-toggle-group` | `Root`, `Item` | `apps/preview/app/src/components/nav-button.tsx`, `apps/preview/app/src/components/nav.tsx` |
| `@radix-ui/react-collapsible` | `Root`, `Trigger`, `Content` | `apps/preview/app/src/components/sidebar.tsx` |
| `@radix-ui/react-slot` | `Slot`, `Slottable` | `apps/preview/app/src/home.tsx`, `packages/jsx-email/src/components/heading.tsx` |
| `@radix-ui/react-icons` | icon set (`CheckIcon`, `Chevron*`, `Cross*`, etc.) | `apps/preview/app/src/components/mobile.tsx`, `apps/preview/app/src/components/nav.tsx`, `apps/preview/app/src/components/sidebar.tsx` |

### Effects/animation notes (`main`)

- **Motion-driven:** `framer-motion` is actively imported in:
  - `apps/preview/app/src/components/nav-button.tsx` (`motion.div`, `motion.span`, variants, `layoutId="topbar"`)
  - `apps/preview/app/src/components/nav.tsx` (`LayoutGroup`)
- **CSS / data-state driven:**
  - `apps/preview/app/src/index.css`
    - `.note[data-state='open'][data-side='*']` uses `slide*AndFade` keyframes.
    - `.collapsible-content[data-state='open'|'closed']` uses `slideDown` / `slideUp` with `--radix-collapsible-content-height`.
  - `apps/preview/app/src/components/mobile.tsx` uses `data-[highlighted]` state classes for Select items.
  - `apps/preview/app/src/components/sidebar.tsx` uses `animate-nav-fade-in` for row emphasis.
  - `apps/preview/app/src/components/send.tsx` includes utility animation classes (`animate-spin`, custom ping animation).

### Radix → shadcn mapping used for this branch

| Radix primitive | shadcn-equivalent component | Notes |
| --- | --- | --- |
| Select | `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, ... | 1:1 API surface via shadcn wrappers.
| Popover | `Popover`, `PopoverTrigger`, `PopoverContent` | Preserve side/state animation classes.
| Toggle Group | `ToggleGroup`, `ToggleGroupItem` | Keep `data-[state=on/off]` styling hooks.
| Collapsible | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` | Keep `data-state` + height-keyframe behavior.
| Dialog | `Dialog`, `DialogTrigger`, `DialogContent`, ... | Not currently used on `main`, but maps directly.
| Tabs | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | Not currently used on `main`, but maps directly.
| Separator | `Separator` | Not currently used on `main`, but maps directly.
| Slot | **Keep Radix Slot** (`@radix-ui/react-slot`) | shadcn uses Radix Slot for `asChild` composition.

## Branch: `next/v3`

### Radix packages/primitives observed

| Package | Primitives observed | Key files |
| --- | --- | --- |
| `@radix-ui/react-select` | `Root`, `Trigger`, `Value`, `Icon`, `Portal`, `Content`, `Viewport`, `Item`, `ItemText`, `ItemIndicator`, `ScrollUpButton`, `ScrollDownButton` | `apps/preview/app/src/views/Preview/render-preview.tsx` |
| `@radix-ui/react-popover` | `Root`, `Trigger`, `Portal`, `Content` | `apps/preview/app/src/components/ui/Popover.tsx`, `apps/preview/app/src/views/Preview/render-preview.tsx` |
| `@radix-ui/react-toggle-group` | `Root`, `Item` | `apps/preview/app/src/components/ui/toggle-group.tsx`, `apps/preview/app/src/components/sidebar.tsx` |
| `@radix-ui/react-collapsible` | `Root`, `Trigger`, `Content` | `apps/preview/app/src/components/sidebar.tsx` |
| `@radix-ui/react-dialog` | `Root`, `Trigger`, `Portal`, `Content`, `Title`, `Description`, `Close` | `apps/preview/app/src/components/ui/Popup.tsx` |
| `@radix-ui/react-tabs` | `Root`, `List`, `Trigger`, `Content` | `apps/web/src/components/BlockPreview.tsx` |
| `@radix-ui/react-separator` | `Root` | `apps/preview/app/src/components/ui/Separator.tsx` |
| `@radix-ui/react-slot` | `Slot` | `apps/preview/app/src/components/ui/Button.tsx`, `packages/jsx-email/src/components/heading.tsx` |

### Effects/animation notes (`next/v3`)

- **Motion-driven:** no direct `framer-motion` imports found in `apps/**` or `packages/**` source files on `next/v3`.
  - `framer-motion` is still listed in package manifests (for example `apps/preview/package.json`).
- **CSS / data-state driven:**
  - `apps/preview/app/src/components/ui/Popover.tsx` uses state/side utility classes:
    - `data-[state=open|closed]:animate-in|animate-out`, fade/zoom utilities, and `data-[side=*]:slide-in-*` classes.
  - `apps/preview/app/src/components/ui/toggle-group.tsx` and `apps/preview/app/src/components/sidebar.tsx` use `data-[state=on/off]` classes.
  - `apps/web/src/components/BlockPreview.tsx` uses `data-[state=active]` trigger styles with `transition-colors`.
  - `apps/preview/app/src/components/sidebar.tsx` references `animate-nav-fade-in` for selected row emphasis.
  - `apps/preview/app/src/views/Preview/render-preview.tsx` includes utility motion classes (`animate-[bounce_1s_ease-out_3]`, `animate-spin`).

### Radix → shadcn mapping used for this branch

| Radix primitive | shadcn-equivalent component | Notes |
| --- | --- | --- |
| Select | `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, ... | Consolidate custom Select styling in one `ui/select` wrapper.
| Popover | `Popover`, `PopoverTrigger`, `PopoverContent` | Existing `components/ui/Popover.tsx` is already shadcn-style.
| Toggle Group | `ToggleGroup`, `ToggleGroupItem` | Existing wrapper already matches shadcn pattern.
| Collapsible | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` | Keep existing collapsible content animation pattern.
| Dialog | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogTitle`, `DialogDescription`, `DialogClose` | Replace/align `Popup` naming to canonical shadcn naming where desired.
| Tabs | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | 1:1 replacement for current `BlockPreview` usage.
| Separator | `Separator` | Existing wrapper already matches shadcn approach.
| Slot | **Keep Radix Slot** (`@radix-ui/react-slot`) | shadcn `asChild` composition depends on Slot; no replacement needed.
