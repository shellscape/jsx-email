import type { ISupportingElement } from "@/types";

export const databases: {
  [key: string]: ISupportingElement;
} = {
  Neon: {
    imageSrc: {
      lightThemeSrc: "/public/svg/neon-light.svg",
      darkThemeSrc: "/public/svg/neon-dark.svg",
    },
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    sponsorUrl: "https://driz.link/neon",
  },
  PlanetScale: {
    imageSrc: "/public/svg/planetscale.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
      color: "#f0f0f0",
    },
    sponsorUrl: "http://planetscale.com/",
  },
  "Vercel Postgres": {
    imageSrc: "/public/svg/vercel.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      fill: "#000000",
      width: 24,
    },
  },
  SingleStore: {
    imageSrc: {
      lightThemeSrc: "/public/svg/singlestore_light.svg",
      darkThemeSrc: "/public/svg/singlestore_dark.svg",
    },
    lightStyle: {
      width: 26,
    },
    darkStyle: {
      width: 26,
    },
  },
  Turso: {
    imageSrc: {
      lightThemeSrc: "/public/svg/new-turso.svg",
      darkThemeSrc: "/public/svg/new-turso-light.svg",
    },
    lightStyle: {
      width: 32,
    },
    darkStyle: {
      width: 32,
    },
    sponsorUrl: "https://driz.link/turso",
  },
  Xata: {
    imageSrc: "/public/svg/xata.svg",
    lightStyle: {
      width: 32,
    },
    darkStyle: {
      width: 32,
    },
    sponsorUrl: "https://driz.link/xataio",
  },
  Supabase: {
    imageSrc: "/public/svg/supabase.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
  },
  PostgreSQL: {
    imageSrc: "/public/svg/postgresql.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
      fill: "#f0f0f0",
    },
  },
  MySQL: {
    imageSrc: "/public/svg/mysql.svg",
    lightStyle: {
      width: 24,
      fill: "#00546B",
    },
    darkStyle: {
      width: 24,
      fill: "#F0F0F0",
    },
  },
  SQLite: {
    imageSrc: "/public/svg/sqlite.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
  },
  "Web SQLite": {
    imageSrc: "/public/svg/database.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
  },
  LiteFS: {
    imageSrc: "/public/svg/flyio.svg",
    lightStyle: {
      width: 28,
    },
    darkStyle: {
      width: 28,
    },
  },
  TiDB: {
    imageSrc: "/public/svg/tidb.svg",
    lightStyle: {
      width: 28,
    },
    darkStyle: {
      width: 28,
    },
    sponsorUrl: "https://driz.link/silver-sponsor-tidb",
  },
  Tembo: {
    imageSrc: "/public/images/tembo.png",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
  },
  Gel: {
    imageSrc: {
      lightThemeSrc: "/public/svg/gel_transparent.svg",
      darkThemeSrc: "/public/svg/gel_transparent.svg",
    },
    lightStyle: {
      width: 36,
      height: 36,
    },
    darkStyle: {
      width: 36,
      height: 36,
    },
    sponsorUrl: "https://driz.link/edgedb",
  },
  "SQLite Cloud": {
    imageSrc: {
      lightThemeSrc: "/public/svg/sqlite-cloud.svg",
      darkThemeSrc: "/public/svg/sqlite-cloud.svg",
    },
    lightStyle: {
      width: 26,
    },
    darkStyle: {
      width: 26,
    },
    sponsorUrl: "https://driz.link/sqlitecloud",
  },
  "Prisma Postgres": {
    imageSrc: {
      lightThemeSrc: "/public/svg/prisma.svg",
      darkThemeSrc: "/public/svg/prisma-dark.svg",
    },
    lightStyle: {
      width: 36,
    },
    darkStyle: {
      width: 36,
    },
    sponsorUrl: "https://driz.link/rickroll",
  },
};

export const runtimes: {
  [key: string]: ISupportingElement;
} = {
  Railway: {
    imageSrc: {
      lightThemeSrc: "/public/svg/railway.svg",
      darkThemeSrc: "/public/svg/railway.svg",
    },
    lightStyle: {
      width: 28,
      filter: "invert(1)",
    },
    darkStyle: {
      width: 28,
    },
    sponsorUrl: "https://driz.link/railway",
    badge: "Cloud Partner",
  },
  "Cloudflare Workers": {
    imageSrc: "/public/svg/cloudflareworker.svg",
    lightStyle: {
      width: 32,
    },
    darkStyle: {
      width: 32,
    },
  },
  "Supabase functions": {
    imageSrc: "/public/svg/supabase.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
  },
  Bun: {
    imageSrc: "/public/svg/bun.svg",
    lightStyle: {
      width: 30,
    },
    darkStyle: {
      width: 30,
    },
  },
  "Deno deploy": {
    imageSrc: "/public/svg/deno.svg",
    lightStyle: {
      width: 36,
    },
    darkStyle: {
      width: 36,
      fill: "#cccccc",
    },
  },
  Browser: {
    imageSrc: "/public/svg/browser.svg",
    lightStyle: {
      width: 30,
    },
    darkStyle: {
      width: 30,
      color: "#cccccc",
    },
  },
  ElectronJS: {
    imageSrc: "/public/svg/electron.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
      filter: "brightness(200%)",
    },
  },
  Lagon: {
    imageSrc: "/public/svg/lagon.webp",
    lightStyle: {
      filter: "brightness(15%)",
      width: 24,
    },
    darkStyle: {
      filter: "brightness(80%)",
      width: 24,
    },
  },
  "Vercel functions": {
    imageSrc: "/public/svg/vercel.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      fill: "#000000",
      width: 24,
    },
  },
  "Fly.io": {
    imageSrc: "/public/svg/flyio.svg",
    lightStyle: {
      width: 28,
    },
    darkStyle: {
      width: 28,
    },
  },
  "React Native": {
    imageSrc: "/public/svg/react-native.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
  },
  Expo: {
    imageSrc: "/public/svg/expo.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
  },
};