#!/bin/bash

set -euo pipefail

# This script sets up an independent environment for testing the preview app, outside of this monorepo
# That's important because how pnpm arranges node_modules within the monorepo give false positives
# when Vite is loading imports and setting up the preview app for a development mode run. Setting this
# up in a separate directory alleviates those differences and more closesly represents a user's machine
# which provides a more accurate test environment

TMP_ROOT=${TMPDIR:-"/tmp"}
TESTS_DIR="${TMP_ROOT%/}/jsx-email-tests"
PROJECT_DIR_NAME='smoke-v2'
STATE_PATH=${SMOKE_V2_STATE_PATH:-"${TMP_ROOT%/}/jsx-email-smoke-v2.state"}

rm -rf "$TESTS_DIR"
mkdir -p "$TESTS_DIR"

REPO_DIR="$(pwd)"

pnpm exec create-mail "$PROJECT_DIR_NAME" --yes

mv -f "$PROJECT_DIR_NAME" "$TESTS_DIR/$PROJECT_DIR_NAME"

cd "$TESTS_DIR/$PROJECT_DIR_NAME"
pnpm i

# The dependencies below are required for fixtures
pnpm add unocss

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

# Copy our test fixtures to the temp project
cp -r "$REPO_DIR/test/smoke-v2/fixtures" .

echo "$TESTS_DIR/$PROJECT_DIR_NAME" > "$STATE_PATH"
