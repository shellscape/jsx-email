---
title: 'Common Questions'
description: 'You know the drill. Questions that get asked oodles'
---

<!--@include: @/include/header.md-->

## Next.js `import` or `export` Errors

If you're a Next.js user, and you're trying to run `jsx-email` in a server action (or `use server`) and running into an error which looks like this:

```
./node_modules/shikiji/dist/index.mjs
export 'getHighlighterCore' (reexported as 'getHighlighterCore') was not found in './core.mjs' (module has no exports)
```

Then congratulations, you've been affected by Next.js using webpack and webpack not handling `.mjs` files correctly. Luckily, there's a quick fix to get around this limitation. Please follow the instructions on this issue: https://github.com/antfu/shikiji/issues/13#issuecomment-1749588964
