import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import sitemap from "@astrojs/sitemap";
import yaml from "@rollup/plugin-yaml";
import tailwindcss from "@tailwindcss/vite";
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

// https://astro.build/config
export default defineConfig({
  site: isProd ? "https://orm.drizzle.team" : "http://localhost:4321",
  build: {
    format: "file", // mandatory due to CloudFlare Pages trailing slash problem
  },
  vite: {
    plugins: [yaml(), tailwindcss()],
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
