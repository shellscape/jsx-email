#!/usr/bin/env bash

if [ -z "${BASH_VERSION:-}" ]; then
  echo "This release script must be run with bash." >&2
  exit 1
fi

set -euo pipefail

# This script is primarily intended for CI (GitHub Actions OIDC publish).
# It assumes `pnpm` and `node` are available on PATH.

if [ "${1-}" = "" ]; then
  echo "Usage: $0 <project-root>" >&2
  exit 1
fi

# npm 11.5.1+ is required for `npm publish --provenance`.
# Pinned for reproducible publishing; override via env when needed.
NPM_CLI_VERSION="${NPM_CLI_VERSION:-11.5.1}"

project_root="$1"
cd "$project_root"

for cmd in pnpm node; do
  command -v "$cmd" >/dev/null 2>&1 || {
    echo "'$cmd' is required but not found on PATH" >&2
    exit 1
  }
done

NPM_CLI_SPEC="npm@${NPM_CLI_VERSION}"

PACK_DIR="$(mktemp -d)"
trap 'rm -rf "$PACK_DIR"' EXIT

echo "Packing to $PACK_DIR"
echo "Running pnpm pack in $project_root"
pnpm pack --pack-destination "$PACK_DIR"

pkg_name=$(node -e "const fs=require('node:fs');const p=JSON.parse(fs.readFileSync('./package.json','utf8'));process.stdout.write(p.name||'<unknown>')" 2>/dev/null || echo '<unknown>')
pkg_version=$(node -e "const fs=require('node:fs');const p=JSON.parse(fs.readFileSync('./package.json','utf8'));process.stdout.write(p.version||'<unknown>')" 2>/dev/null || echo '<unknown>')
pkg_base="${pkg_name#@}"
pkg_base="${pkg_base//\//-}"
expected_tarball_name="${pkg_base}-${pkg_version}.tgz"

shopt -s nullglob
tarballs=("$PACK_DIR"/*.tgz)
shopt -u nullglob

if [ "${#tarballs[@]}" -eq 0 ]; then
  printf 'No package tarballs produced for %s@%s in %s after `pnpm pack`.\n' \
    "$pkg_name" \
    "$pkg_version" \
    "$PACK_DIR" >&2
  printf 'Contents of %s:\n' "$PACK_DIR" >&2
  ls -lah "$PACK_DIR" >&2 || true
  exit 1
fi

selected_tarball="${tarballs[0]}"
if [ "${#tarballs[@]}" -gt 1 ]; then
  selected_tarball=""
  for tb in "${tarballs[@]}"; do
    if [ "$(basename "$tb")" = "$expected_tarball_name" ]; then
      selected_tarball="$tb"
      break
    fi
  done

  if [ "$selected_tarball" = "" ]; then
    printf 'Multiple package tarballs produced for %s@%s in %s after `pnpm pack`, but none matched %s. Found: %s\n' \
      "$pkg_name" \
      "$pkg_version" \
      "$PACK_DIR" \
      "$expected_tarball_name" \
      "${tarballs[*]}" >&2
    printf 'Contents of %s:\n' "$PACK_DIR" >&2
    ls -lah "$PACK_DIR" >&2 || true
    exit 1
  fi
fi

if [ -z "${GITHUB_ACTIONS:-}" ] && [ "${ALLOW_LOCAL_PUBLISH:-0}" != "1" ]; then
  echo "Refusing to publish outside GitHub Actions. Set ALLOW_LOCAL_PUBLISH=1 to override." >&2
  exit 1
fi

echo "Publishing tarball: $selected_tarball"
echo "Using npm CLI: $NPM_CLI_SPEC"
pnpm dlx "$NPM_CLI_SPEC" publish --provenance "$selected_tarball"
