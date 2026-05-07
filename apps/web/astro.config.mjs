import { defineConfig } from "astro/config";
import fs from "node:fs/promises";
import path from "node:path";
import { loadEnv } from "vite";
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import sitemap from "@astrojs/sitemap";
import astroLlmsTxt from "@4hse/astro-llms-txt";
import yaml from "@rollup/plugin-yaml";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import { codeSnippetTransformer } from "./src/transformers";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from "@shikijs/transformers";

const env = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const isProd = env.PROD_BUILD === "true";
const llmsTxtBridgeFiles = new Set();

const removeEmptyDirs = async (dir, stopDir) => {
  let current = dir;

  while (current.startsWith(stopDir) && current !== stopDir) {
    try {
      await fs.rmdir(current);
      current = path.dirname(current);
    } catch {
      break;
    }
  }
};

const getDocsHtmlFiles = async (distDir) => {
  const files = [];
  const docsIndex = path.join(distDir, "docs.html");
  const docsDir = path.join(distDir, "docs");

  try {
    await fs.access(docsIndex);
    files.push(docsIndex);
  } catch {
    // The docs landing page is optional for this bridge.
  }

  const walk = async (dir) => {
    let entries;

    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const file = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(file);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        files.push(file);
      }
    }
  };

  await walk(docsDir);

  return files;
};

const llmsTxtFileFormatBridge = () => ({
  name: "web:llms-txt-file-format-bridge",
  hooks: {
    "astro:build:generated": async ({ dir }) => {
      const distDir = dir.pathname;
      const htmlFiles = await getDocsHtmlFiles(distDir);

      for (const source of htmlFiles) {
        const relative = path.relative(distDir, source);
        const pathname = relative.slice(0, -".html".length);
        const target = path.join(distDir, pathname, "index.html");

        try {
          await fs.mkdir(path.dirname(target), { recursive: true });
          await fs.copyFile(source, target);
          llmsTxtBridgeFiles.add(target);
        } catch {
          // @4hse/astro-llms-txt will report any missing docs page it needs.
        }
      }
    },
  },
});

const llmsTxtFileFormatBridgeCleanup = () => ({
  name: "web:llms-txt-file-format-bridge-cleanup",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      const distDir = dir.pathname;

      for (const file of llmsTxtBridgeFiles) {
        await fs.rm(file, { force: true });
        await removeEmptyDirs(path.dirname(file), distDir);
      }

      llmsTxtBridgeFiles.clear();
    },
  },
});

const llmsTxtWellKnownAliases = () => ({
  name: "web:llms-txt-well-known-aliases",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      const distDir = dir.pathname;
      const wellKnownDir = path.join(distDir, ".well-known");
      const files = ["llms.txt", "llms-full.txt", "llms-small.txt"];

      await fs.mkdir(wellKnownDir, { recursive: true });

      for (const file of files) {
        await fs.copyFile(
          path.join(distDir, file),
          path.join(wellKnownDir, file),
        );
      }

      await fs.writeFile(path.join(distDir, ".nojekyll"), "", "utf-8");
    },
  },
});

// https://astro.build/config
export default defineConfig({
  site: isProd ? "https://jsx.email" : "http://localhost:4321",
  build: {
    format: "file", // mandatory due to CloudFlare Pages trailing slash problem
  },
  vite: {
    plugins: [yaml(), tailwindcss()],
    optimizeDeps: {
      exclude: ["bwip-js", "jsx-email"],
      include: ["motion", "motion/react"],
    },
    ssr: {
      external: ["jsx-email"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
  image: {
    domains: ["img.youtube.com"],
  },
  prefetch: isProd
    ? {
        prefetchAll: true,
        defaultStrategy: "viewport",
      }
    : undefined,
  integrations: [
    mdx(),
    react(),
    llmsTxtFileFormatBridge(),
    astroLlmsTxt({
      title: "JSX email",
      description:
        "JSX email provides React and TypeScript components and helpers for building responsive, standards-compliant email templates compatible with modern email clients.",
      details:
        "Use these docs for JSX email component APIs, CLI usage, rendering, compilation, plugins, Tailwind support, preview tooling, and provider integration guidance.",
      notes:
        "- Generated from the official JSX email documentation.\n- Prefer the full docs file for complete context and the small docs file for a compact outline.",
      optionalLinks: [
        {
          label: "GitHub",
          url: "https://github.com/shellscape/jsx-email",
          description: "Source repository for JSX email.",
        },
        {
          label: "npm",
          url: "https://www.npmjs.com/package/jsx-email",
          description: "jsx-email package on npm.",
        },
      ],
      docSet: [
        {
          title: "Complete documentation",
          description: "Full JSX email documentation as Markdown.",
          url: "/llms-full.txt",
          include: ["/docs/*", "/docs/**/*", "docs/*", "docs/**/*"],
          promote: [
            "/docs/introduction",
            "docs/introduction",
            "/docs/quick-start",
            "docs/quick-start",
            "/docs/core/**",
            "docs/core/**",
            "/docs/components/**",
            "docs/components/**",
          ],
          demote: [
            "/docs/v2/**",
            "docs/v2/**",
            "/docs/v3/**",
            "docs/v3/**",
            "/docs/contributing",
            "docs/contributing",
          ],
          mainSelector: ".documentation-content",
          ignoreSelectors: [
            ".autolink-header",
            ".edit-page",
            ".copy-button",
            "script",
            "style",
          ],
        },
        {
          title: "Compact documentation",
          description: "Compact JSX email documentation outline.",
          url: "/llms-small.txt",
          include: ["/docs/*", "/docs/**/*", "docs/*", "docs/**/*"],
          onlyStructure: true,
          promote: [
            "/docs/introduction",
            "docs/introduction",
            "/docs/quick-start",
            "docs/quick-start",
            "/docs/core/**",
            "docs/core/**",
            "/docs/components/**",
            "docs/components/**",
          ],
          demote: [
            "/docs/v2/**",
            "docs/v2/**",
            "/docs/v3/**",
            "docs/v3/**",
            "/docs/contributing",
            "docs/contributing",
          ],
          mainSelector: ".documentation-content",
          ignoreSelectors: [
            ".autolink-header",
            ".edit-page",
            ".copy-button",
            "script",
            "style",
          ],
        },
      ],
      pageSeparator: "\n\n---\n\n",
    }),
    llmsTxtWellKnownAliases(),
    llmsTxtFileFormatBridgeCleanup(),
    ...(isProd ? [sitemap()] : []),
  ],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            class: "autolink-header",
            ariaHidden: true,
            tabIndex: -1,
          },
          test: ["h2", "h3", "h4", "h5"],
        },
      ],
    ],
    shikiConfig: {
      theme: "css-variables",
      transformers: [
        codeSnippetTransformer(),
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
        transformerMetaHighlight(),
        transformerMetaWordHighlight(),
      ],
    },
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
  },
});
