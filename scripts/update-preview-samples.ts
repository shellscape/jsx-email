import { readFile, writeFile } from 'node:fs/promises';

const sampleOrigin = 'https://samples.jsx.email';
const previewPath = 'preview.html';

type BuiltTemplate = {
  html: string;
  plain: string;
  source: string;
  sourcePath: string;
  templateName?: string;
};

type PreviewTemplate = {
  file: string;
  html: string;
  htmlFile: string;
  id: string;
  jsx: string;
  name: string;
  plain: string;
  subject: string;
};

async function readUrl(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
}

function titleize(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function parseMainAsset(html: string) {
  const match = html.match(/src="\.\/assets\/([^"]+\.js)"/);
  if (!match) {
    throw new Error('Unable to find samples app asset');
  }

  return `${sampleOrigin}/assets/${match[1]}`;
}

function parseChunkMap(source: string) {
  return [...source.matchAll(/preview\/([^"]+?)\.js":\s*\(\)\s*=>[^']+'\.\/([^']+\.js)'/g)]
    .map((match) => ({
      file: `${match[1]}.tsx`,
      url: `${sampleOrigin}/assets/${match[2]}`
    }))
    .sort((a, b) => a.file.localeCompare(b.file));
}

function parseChunk(source: string): BuiltTemplate {
  const match = source.match(/const\s+\w+\s*=\s*(\{[\s\S]*?\n\});\n\nexport\s+\{/);
  if (!match) {
    throw new Error('Unable to parse sample chunk');
  }

  return JSON.parse(match[1]) as BuiltTemplate;
}

function toPreviewTemplate(file: string, built: BuiltTemplate): PreviewTemplate {
  const fallbackName = titleize(file.split('/').at(-1)?.replace(/\.tsx$/, '') ?? file);
  const name = built.templateName || fallbackName;

  return {
    file,
    html: built.html,
    htmlFile: file.replace(/\.tsx$/, '.html'),
    id: file.replace(/\.tsx$/, ''),
    jsx: built.source,
    name,
    plain: built.plain,
    subject: name
  };
}

async function main() {
  const preview = await readFile(previewPath, 'utf8');
  const home = await readUrl(sampleOrigin);
  const mainAsset = parseMainAsset(home);
  const app = await readUrl(mainAsset);
  const chunks = parseChunkMap(app);

  if (chunks.length === 0) {
    throw new Error('No sample chunks found');
  }

  const templates = await Promise.all(
    chunks.map(async ({ file, url }) => toPreviewTemplate(file, parseChunk(await readUrl(url))))
  );
  const replacement = `const templates = ${JSON.stringify(templates, null, 8)};`;
  const templatePattern = /const templates = \[[\s\S]*?\n\s*\];\n\n\s*const widths = /;
  if (!templatePattern.test(preview)) {
    throw new Error('Unable to replace preview template data');
  }
  const next = preview.replace(templatePattern, `${replacement}\n\n      const widths = `);

  await writeFile(previewPath, next);
  console.log(`Updated ${templates.length} templates from ${mainAsset}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
