# 🧁 Importing CSS

If you're using a design system based on Styled Components or similar, and aren't using Tailwind, you may have the need to export that design system as CSS for use in jsx-email` templates. Or, you may be raw-dogging CSS straight up. For either scenario, importing CSS directly may be useful when crafting your email templates. jsx-email ships with the ability to import CSS as a string for use in your templates.

This recipe contains code to demonstrate how.

## Run the Recipe

To run this recipe, please open the terminal or console of your choice, and navigate to the directory this file resides in. Then, run:

```shell
$ npm i && npm run dev
```

Once the preview app opens, select the `Import CSS` template and examine the HTML and JSX code tabs to view the source and result of a CSS import.

## Notes

_Caveat: Importing CSS is only supported when using the CLI [`build`](https://jsx.email/docs/core/cli#build) or [`preview`](https://jsx.email/docs/core/cli#preview) commands, or the [`compile`](https://jsx.email/docs/core/render) API method_

It's important to remember that jsx-email templates _are not_ React apps. This is something that often trips up users; where they expect a React app feature, such as importing CSS, to work exactly like a React app. With React, the user is _always_ compiling the app to run it, and React's bundler configurations provide for things like automatic import and injection of CSS.

The `render` method simply renders JSX/TSX; it doesn't perform a bundle or a build, hence traversing imports isn't something that it does. If a use case calls for using the API instead of the CLI and importing CSS is needed, use the `compile` API first, import the `Template` from the compiled file, and pass the `Template` to `render`.
