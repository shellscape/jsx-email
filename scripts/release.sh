#!/usr/bin/env bash

if [ -z "${BASH_VERSION:-}" ]; then
  echo "This release script must be run with bash." >&2
  exit 1
fi

set -euo pipefail

# Release wrapper (version + OIDC-backed `npm publish --provenance`).
# Note: requires Bash.

if [ "${1-}" = "" ]; then
  echo "Usage: $0 <project-root>" >&2
  exit 1
fi

project_root="$1"

SCRIPT_DIR="$(cd -- "$(dirname -- "$0")" && pwd)"

for cmd in pnpm node; do
  command -v "$cmd" >/dev/null 2>&1 || {
    echo "'$cmd' is required but not found on PATH" >&2
    exit 1
  }
done

pnpm exec versioner --target "$project_root" --publish=false
"$SCRIPT_DIR/release-publish.sh" "$project_root"
