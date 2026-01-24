#!/bin/bash

set -euo pipefail

# This script sets up an independent environment for testing the preview app, outside of this monorepo
# That's important because how pnpm arranges node_modules within the monorepo give false positives
# when Vite is loading imports and setting up the preview app for a development mode run. Setting this
# up in a separate directory alleviates those differences and more closesly represents a user's machine
# which provides a more accurate test environment

TMP_ROOT=${TMPDIR:-"/tmp"}
STATE_PATH=${SMOKE_V2_STATE_PATH:-"${TMP_ROOT%/}/jsx-email-smoke-v2.state"}

SMOKE_DIR=$(cat "$STATE_PATH")
cd "$SMOKE_DIR"
pnpm exec email preview fixtures/templates --no-open --port 55420
