#!/bin/bash

# This script sets up an independent environment for testing the preview app, outside of this monorepo
# That's important because how pnpm arranges node_modules within the monorepo give false positives
# when Vite is loading imports and setting up the preview app for a development mode run. Setting this
# up in a separate directory alleviates those differences and more closesly represents a user's machine
# which provides a more accurate test environment

TESTS_DIR="$TMPDIR"jsx-email-tests/smoke-test
SMOKE_DIR=$(readlink -f $TESTS_DIR)
cd $SMOKE_DIR
pnpm exec email preview fixtures
