#!/bin/bash

# This script sets up an independent environment for testing the preview app, outside of this monorepo
# That's important because how pnpm arranges node_modules within the monorepo give false positives
# when Vite is loading imports and setting up the preview app for a development mode run. Setting this
# up in a separate directory alleviates those differences and more closesly represents a user's machine
# which provides a more accurate test environment

TESTS_DIR="$TMPDIR"jsx-email-tests
echo "Tests Directory: $TESTS_DIR"

rm -rf $TESTS_DIR
mkdir -p $TESTS_DIR

REPO_DIR=$(pwd)
echo "Repo Directory: $REPO_DIR"

pnpm exec create-mail smoke-test --yes

echo "Moving smoke-test to $TESTS_DIR/smoke-test"
mv -f smoke-test $TESTS_DIR

cd $TESTS_DIR/smoke-test
pnpm i

# The dependencies below are required for fixtures
pnpm add unocss set-cookie-parser

# The dependencies below have to be pointed back to the repo
pnpm add "@jsx-email/app-preview@file:$REPO_DIR/apps/preview"
pnpm add "@jsx-email/plugin-inline@file:$REPO_DIR/packages/plugin-inline"
pnpm add "@jsx-email/plugin-minify@file:$REPO_DIR/packages/plugin-minify"
pnpm add "@jsx-email/plugin-pretty@file:$REPO_DIR/packages/plugin-pretty"
pnpm add "jsx-email@file:$REPO_DIR/packages/jsx-email"

# We have to link this due to the workspace dependency
pnpm link "$REPO_DIR/packages/jsx-email"

# Remove the templates that were created for us
rm -rf templates

# Copy our test fixtures to the temp smoke-test
cp -r $REPO_DIR/test/smoke/fixtures .
