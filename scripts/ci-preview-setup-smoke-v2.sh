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

REPO_PACKAGE_MANAGER=$(node -p "require('$REPO_DIR/package.json').packageManager")

REPO_PACKAGE_MANAGER="$REPO_PACKAGE_MANAGER" node -e "const fs=require('node:fs'); const pkg=JSON.parse(fs.readFileSync('package.json', 'utf8')); pkg.packageManager=process.env.REPO_PACKAGE_MANAGER; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');"

cat > pnpm-workspace.yaml <<'EOF'
packages:
  - .

dangerouslyAllowAllBuilds: true
EOF

pnpm i

# The dependencies below are required for fixtures
pnpm add unocss

# The dependencies below have to be pointed back to the repo
pack_local_package() {
  local package_dir="$1"
  (
    cd "$package_dir"
    pnpm pack --pack-destination "$TESTS_DIR" | tail -n 1
  )
}

# Pack local packages before installing into the isolated smoke workspace so
# workspace/catalog protocols are replaced with publishable dependency specs.
APP_PREVIEW_TARBALL=$(pack_local_package "$REPO_DIR/apps/preview")
PLUGIN_INLINE_TARBALL=$(pack_local_package "$REPO_DIR/packages/plugin-inline")
PLUGIN_MINIFY_TARBALL=$(pack_local_package "$REPO_DIR/packages/plugin-minify")
PLUGIN_PRETTY_TARBALL=$(pack_local_package "$REPO_DIR/packages/plugin-pretty")
JSX_EMAIL_TARBALL=$(pack_local_package "$REPO_DIR/packages/jsx-email")

pnpm add "@jsx-email/app-preview@file:$APP_PREVIEW_TARBALL"
pnpm add "@jsx-email/plugin-inline@file:$PLUGIN_INLINE_TARBALL"
pnpm add "@jsx-email/plugin-minify@file:$PLUGIN_MINIFY_TARBALL"
pnpm add "@jsx-email/plugin-pretty@file:$PLUGIN_PRETTY_TARBALL"
pnpm add "jsx-email@file:$JSX_EMAIL_TARBALL"

# We have to link this due to the workspace dependency
pnpm link "$REPO_DIR/packages/jsx-email"

# Remove the templates that were created for us
rm -rf templates

# Copy our test fixtures to the temp project
cp -r "$REPO_DIR/test/smoke-v2/fixtures" .

echo "$TESTS_DIR/$PROJECT_DIR_NAME" > "$STATE_PATH"
