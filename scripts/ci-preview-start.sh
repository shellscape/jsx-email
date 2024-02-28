#!/bin/bash

# This script sets up an independent environment for testing the preview app, outside of this monorepo
# That's important because how pnpm arranges node_modules within the monorepo give false positives
# when Vite is loading imports and setting up the preview app for a development mode run. Setting this
# up in a separate directory alleviates those differences and more closesly represents a user's machine
# which provides a more accurate test environment

cd /tmp/jsx-email-test
pnpm exec email preview fixtures