#!/usr/bin/env node
/**
 * This script processes the documentation files from the docs directory
 * and copies them into the Astro.js content structure.
 */
/* oxlint-disable no-await-in-loop */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const rootDir = path.resolve(__dirname, '..');
const docsDir = path.resolve(rootDir, '../../docs');
const targetDir = path.resolve(rootDir, 'src/content/docs');

// Create directories if they don't exist
async function ensureDir(dir) {
  try {
    await fs.promises.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

// Convert Markdown files for Astro compatibility
async function processMarkdownFile(sourcePath, targetPath) {
  console.log(`Processing: ${sourcePath} -> ${targetPath}`);

  let content = await fs.promises.readFile(sourcePath, 'utf8');

  // Add frontmatter if not present
  if (!content.startsWith('---')) {
    const filename = path.basename(sourcePath, '.md');
    const title = filename.charAt(0).toUpperCase() + filename.slice(1).replace(/-/g, ' ');

    content = `---
title: ${title}
---

${content}`;
  }

  // Make sure the target directory exists
  await ensureDir(path.dirname(targetPath));

  // Write the processed content
  await fs.promises.writeFile(targetPath, content);
}

// Copy a directory recursively
async function processDirectory(sourceDir, targetDir, relativePath = '') {
  const currentSourceDir = path.join(sourceDir, relativePath);
  const currentTargetDir = path.join(targetDir, relativePath);

  await ensureDir(currentTargetDir);

  const entries = await fs.promises.readdir(currentSourceDir);

  for (const entry of entries) {
    const sourcePath = path.join(currentSourceDir, entry);
    const entryRelativePath = relativePath ? path.join(relativePath, entry) : entry;
    const targetPath = path.join(targetDir, entryRelativePath);

    const stats = await fs.promises.stat(sourcePath);

    if (stats.isDirectory()) {
      await processDirectory(sourceDir, targetDir, entryRelativePath);
    } else if (entry.endsWith('.md')) {
      await processMarkdownFile(sourcePath, targetPath);
    }
  }
}

// Process root-level docs
async function processRootDocs() {
  const files = [
    'introduction.md',
    'quick-start.md',
    'recipes.md',
    'email-providers.md',
    'faq.md',
    'contributing.md'
  ];

  for (const file of files) {
    const sourcePath = path.join(docsDir, file);
    const targetPath = path.join(targetDir, file);

    try {
      await fs.promises.stat(sourcePath);
      await processMarkdownFile(sourcePath, targetPath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`File ${sourcePath} does not exist, skipping...`);
      } else {
        throw error;
      }
    }
  }
}

// Process directories
async function processDirs() {
  const dirs = ['components', 'core', 'plugins', 'v2'];

  for (const dir of dirs) {
    const sourceDir = path.join(docsDir, dir);
    const targetDirForType = path.join(targetDir, dir);

    try {
      const stats = await fs.promises.stat(sourceDir);
      if (stats.isDirectory()) {
        await processDirectory(sourceDir, targetDirForType);
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`Directory ${sourceDir} does not exist, skipping...`);
      } else {
        throw error;
      }
    }
  }
}

// Main function
async function main() {
  try {
    console.log('Starting docs processing...');

    // Ensure the target directory exists
    await ensureDir(targetDir);

    // Process root-level documentation files
    await processRootDocs();

    // Process directories
    await processDirs();

    console.log('Documentation processing completed!');
  } catch (error) {
    console.error('Error processing documentation:', error);
    process.exit(1);
  }
}

main();
