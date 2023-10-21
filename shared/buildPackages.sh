#!/usr/bin/env bash

moon run body:build button:build column:build container:build font:build head:build heading:build hr:build html:build img:build link:build markdown:build preview:build row:build section:build text:build create-jsx-email:build render:build tailwind:build
moon run all:build
moon run cli:build

echo "✓ All packages compiled"
