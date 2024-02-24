#!/bin/bash

# This script sets up an independent environment for testing the preview app, outside of this monorepo
# That's important because how pnpm arranges node_modules within the monorepo give false positives
# when Vite is loading imports and setting up the preview app for a development mode run. Setting this
# up in a separate directory alleviates those differences and more closesly represents a user's machine
# which provides a more accurate test environment

rm -rf /tmp/jsx-email-test
REPO_DIR=$(pwd)
pnpm exec create-jsx-email jsx-email-test --yes
mv -f jsx-email-test /tmp
cd /tmp/jsx-email-test
pnpm i

# The dependencies below are required for fixtures
pnpm add unocss

# The dependencies below have to be pointed back to the repo
pnpm add "@jsx-email/app-preview@file:$REPO_DIR/apps/preview"
pnpm add "@jsx-email/minify-preset@file:$REPO_DIR/packages/minify-preset"

# We have to link this due to the workspace dependency
pnpm link "$REPO_DIR/packages/jsx-email"

rm -rf templates
cp -r $REPO_DIR/apps/test/fixtures .
