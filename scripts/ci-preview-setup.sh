#!/bin/bash

# This script sets up an independent environment for testing the preview app, outside of this monorepo
# That's important because how pnpm arranges node_modules within the monorepo give false positives
# when Vite is loading imports and setting up the preview app for a development mode run. Setting this
# up in a separate directory alleviates those differences and more closesly represents a user's machine
# which provides a more accurate test environment

rm -rf /tmp/jsx-email-test
REPO_DIR=$(pwd)
pnpm exec create-jsx-email jsx-email-test
mv -f jsx-email-test /tmp
cd /tmp/jsx-email-test
pnpm i
pnpm add "@jsx-email/app-preview@file:$REPO_DIR/apps/preview"
pnpm add "jsx-email@file:$REPO_DIR/packages/jsx-email"
rm -rf templates
cp -r $REPO_DIR/apps/test/fixtures .