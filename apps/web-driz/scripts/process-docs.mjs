#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '../..');
const sourceDocsDir = path.resolve(repoRoot, 'docs');
const outputDocsDir = path.resolve(appRoot, 'src/content/docs');

const installSnippet = [
  '<CodeTabs items={["pnpm", "bun", "npm", "yarn"]}>',
  '<CodeTab>',
  '```sh',
  'pnpm add jsx-email',
  '```',
  '</CodeTab>',
  '<CodeTab>',
  '```sh',
  'bun add jsx-email',
  '```',
  '</CodeTab>',
  '<CodeTab>',
  '```sh',
  'npm add jsx-email',
  '```',
  '</CodeTab>',
  '<CodeTab>',
  '```sh',
  'yarn add jsx-email',
  '```',
  '</CodeTab>',
  '</CodeTabs>'
].join('\n');

const humanize = (value) =>
  value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());

async function listMarkdownFiles(dir, baseDir = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const abs = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listMarkdownFiles(abs, baseDir)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(path.relative(baseDir, abs));
    }
  }

  return files.sort((a, b) => a.localeCompare(b));
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n')) {
    return { frontmatterBlock: null, data: {}, body: raw };
  }

  const closingMarker = raw.indexOf('\n---\n', 4);
  if (closingMarker === -1) {
    return { frontmatterBlock: null, data: {}, body: raw };
  }

  const frontmatterInner = raw.slice(4, closingMarker);
  const sanitizedFrontmatterInner = frontmatterInner
    .split('\n')
    .filter((line) => !line.trim().startsWith('slug:'))
    .join('\n');
  const body = raw.slice(closingMarker + 5);
  const data = {};

  for (const line of frontmatterInner.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    let value = rawValue.trim();
    if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return {
    frontmatterBlock: `---\n${sanitizedFrontmatterInner}\n---`,
    data,
    body,
  };
}

function mapCalloutType(type) {
  if (type === 'warning') return 'warning';
  return 'info';
}

function convertAdmonitions(input) {
  const lines = input.split('\n');
  const out = [];
  let inAdmonition = false;

  for (const line of lines) {
    const open = line.match(/^\s*:::\s*(tip|warning|info)\s*$/i) || line.match(/^\s*:::(tip|warning|info)\s*$/i);
    if (!inAdmonition && open) {
      inAdmonition = true;
      out.push(`<Callout type="${mapCalloutType(open[1].toLowerCase())}">`);
      continue;
    }

    if (inAdmonition && /^\s*:::\s*$/.test(line)) {
      inAdmonition = false;
      out.push('</Callout>');
      continue;
    }

    out.push(line);
  }

  if (inAdmonition) {
    out.push('</Callout>');
  }

  return out.join('\n');
}

function readRange(content, start, end) {
  if (!start || !end) {
    return content;
  }

  const startLine = Number(start);
  const endLine = Number(end);
  const lines = content.split('\n');
  return lines.slice(startLine - 1, endLine).join('\n');
}

async function resolveInclude({ includeFile, start, end, frontmatter }) {
  if (includeFile === 'header.md') {
    return frontmatter.description ? `${frontmatter.description}\n` : '';
  }

  if (includeFile === 'install.md') {
    return installSnippet;
  }

  if (includeFile === 'README.md') {
    const readme = await fs.readFile(path.resolve(repoRoot, 'README.md'), 'utf8');
    return readRange(readme, start, end).trim();
  }

  if (includeFile === 'CONTRIBUTING.md') {
    const contributing = await fs.readFile(path.resolve(repoRoot, 'CONTRIBUTING.md'), 'utf8');
    return readRange(contributing, start, end).trim();
  }

  return '';
}

async function applyIncludes(input, frontmatter) {
  const includeRegex = /<!--@include:\s*@\/include\/([^\s{]+)(?:\{(\d+),(\d+)\})?\s*-->/g;
  const matches = [...input.matchAll(includeRegex)];
  if (matches.length === 0) return input;

  let output = input;
  for (const match of matches) {
    const [fullMatch, includeFile, start, end] = match;
    const replacement = await resolveInclude({ includeFile, start, end, frontmatter });
    output = output.replace(fullMatch, replacement);
  }

  return output;
}

function stripHtmlComments(input) {
  return input.replace(/<!--([\s\S]*?)-->/g, '');
}

function ensureSpacing(content) {
  return content
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\n+$/g, '\n');
}

async function writeFileEnsured(absPath, content) {
  await fs.mkdir(path.dirname(absPath), { recursive: true });
  await fs.writeFile(absPath, content, 'utf8');
}

async function main() {
  const markdownFiles = await listMarkdownFiles(sourceDocsDir);

  await fs.rm(outputDocsDir, { recursive: true, force: true });
  await fs.mkdir(outputDocsDir, { recursive: true });

  const fileMeta = new Map();
  const byDirectory = new Map();

  for (const relativePath of markdownFiles) {
    const sourceAbs = path.join(sourceDocsDir, relativePath);
    const sourceRaw = await fs.readFile(sourceAbs, 'utf8');

    const { frontmatterBlock, data: frontmatter, body: initialBody } = parseFrontmatter(sourceRaw);
    const safeFrontmatter = frontmatterBlock ?? `---\ntitle: ${humanize(path.basename(relativePath, '.md'))}\n---`;

    let body = await applyIncludes(initialBody, frontmatter);
    body = stripHtmlComments(body);
    body = convertAdmonitions(body);
    body = ensureSpacing(body.trim());

    const imports = [];
    if (body.includes('<Callout')) {
      imports.push("import Callout from '@mdx/Callout.astro';");
    }
    if (body.includes('<CodeTabs')) {
      imports.push("import CodeTabs from '@mdx/CodeTabs.astro';");
    }
    if (body.includes('<CodeTab')) {
      imports.push("import CodeTab from '@mdx/CodeTab.astro';");
    }

    const composed = [
      safeFrontmatter,
      '',
      ...(imports.length ? [...imports, ''] : []),
      body,
      '',
    ].join('\n');

    const parsed = path.parse(relativePath);
    const targetRelative = path.join(parsed.dir, `${parsed.name}.mdx`);
    const targetAbs = path.join(outputDocsDir, targetRelative);

    await writeFileEnsured(targetAbs, composed);

    const slug = parsed.name;
    const dir = parsed.dir;
    const title = frontmatter.title || humanize(slug);

    fileMeta.set(relativePath, { slug, dir, title });
    if (!byDirectory.has(dir)) byDirectory.set(dir, []);
    byDirectory.get(dir).push({ slug, title });
  }

  const rootSections = [
    {
      label: 'Getting Started',
      items: ['introduction', 'quick-start', 'recipes', 'email-providers', 'faq', 'contributing'],
    },
    { label: 'Components', dir: 'components' },
    { label: 'Core', dir: 'core' },
    { label: 'Plugins', dir: 'plugins' },
    { label: 'Upgrade', dir: 'v2' },
  ];

  const rootEntries = byDirectory.get('') || [];
  const rootLookup = new Map(rootEntries.map((entry) => [entry.slug, entry.title]));
  const rootMeta = [];

  for (const section of rootSections) {
    rootMeta.push(section.label);

    if (section.items) {
      for (const slug of section.items) {
        if (rootLookup.has(slug)) {
          rootMeta.push([slug, rootLookup.get(slug)]);
        }
      }
      continue;
    }

    if (section.dir) {
      rootMeta.push([section.dir, section.label]);
    }
  }

  await writeFileEnsured(path.join(outputDocsDir, '_meta.json'), `${JSON.stringify(rootMeta, null, 2)}\n`);

  const directoryOrders = {
    core: ['cli', 'compile', 'config', 'plugins', 'render'],
    plugins: ['inline', 'minify', 'pretty'],
    v2: ['migration', 'button'],
  };

  for (const [dir, entries] of byDirectory.entries()) {
    if (!dir) continue;

    const desiredOrder = directoryOrders[dir] || entries.map((entry) => entry.slug).sort((a, b) => a.localeCompare(b));
    const entryLookup = new Map(entries.map((entry) => [entry.slug, entry]));

    const ordered = [];
    for (const slug of desiredOrder) {
      if (!entryLookup.has(slug)) continue;
      const entry = entryLookup.get(slug);
      ordered.push([entry.slug, entry.title]);
      entryLookup.delete(slug);
    }

    for (const [slug, entry] of entryLookup.entries()) {
      ordered.push([slug, entry.title]);
    }

    await writeFileEnsured(path.join(outputDocsDir, dir, '_meta.json'), `${JSON.stringify(ordered, null, 2)}\n`);
  }

  console.log(`Processed ${markdownFiles.length} docs files into ${outputDocsDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
