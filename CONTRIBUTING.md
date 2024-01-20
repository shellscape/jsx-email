## Contributing in this repository

We 💛 contributions! The rules for contributing to this org are few:

1. Don't be a jerk
1. Search issues before opening a new one
1. Lint and run tests locally before submitting a PR
1. Adhere to the code style the project has chosen

## Repo Info

The `jsx-email` repository is a [Monorepo](https://en.wikipedia.org/wiki/Monorepo) that uses two primary tools; [`pnpm`](https://pnpm.io/) and [`Moon`](https://moonrepo.dev/). `pnpm` is used for package management and [workspace management](https://pnpm.io/workspaces) of the repo. `Moon` is used as our task runner for the repo - all commands to work with the packages and code in the repo go through `Moon`. We also assume that you have Node.js installed, because this is a project that leverages React.

### Getting Started

If you're new to either `pnpm` or `Moon` you'll want to run the `bootstrap.sh` script first. It will install everything you'll need to get started, and bootstrap your environment:

```console
$ ./shared/bootstrap.sh
```

Next we'll want to get dependencies installed, and get everything built. _(Note: One of the benefits of `Moon` is that it uses intelligent caching to assert that dependencies are always up to date before running any command. We don't technically have to install dependencies first)_:

```console
$ pnpm install
```

Then build all the things:

```console
$ moon repo:build.all
```

## Before Committing

1. Use at least Node.js v18.0.0 or higher. [NVM](https://github.com/creationix/nvm) can be handy for switching between Node versions.
1. Lint your changes via `moon run repo:lint`. Fix any errors and warnings before committing.
1. Test your changes via `moon run repo:test`. Only Pull Requests with passing tests will be accepted.

## Submitting Code

Any code change should be submitted as a pull request. Our guidelines for Pull Requests:

- Please fill in our template in its entirety. Please don't reformat it or modify it
- The description should explain what the code does and give steps to execute it
- The pull request should also contain tests
- Before submitting your Pull Request, please lint your changes by running `moon run repo:lint` in the root directory
- If any checks fail for your Pull Request, please resolve them. Always feel free to ask for help if unable to resolve issues with checks

## Code Review Process

The bigger the pull request, the longer it will take to review and merge. Try to break down large pull requests in smaller chunks that are easier to review and merge.

It is also always helpful to have some context for your pull request. What was the purpose? Why does it matter to you? Does it resolve any known Github issues? Adding a line "resolves #&lt;issue number&gt;" (e.g. "resolves #23") to the description of your pull request or of a specific commit will automatically close this issue once the pull request is merged.
