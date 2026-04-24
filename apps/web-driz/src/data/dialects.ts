import type { ICards } from "@/types";

export const dialects: ICards = {
  pg: {
    title: "PostgreSQL",
    imageSrc: "/public/svg/postgresql.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description: "Serverless multi-cloud fully managed Postgres",
    href: "/pg",
  },
  mysql: {
    title: "MySQL",
    imageSrc: "/public/svg/mysql.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
      fill: "#f0f0f0",
    },
    description: "Fastest full featured PostgreSQL client for Node.js and Deno",
    href: "/mysql",
  },
  sqlite: {
    title: "SQLite",
    imageSrc: "/public/svg/sqlite.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description: "Collection of nodejs modules to interact with SQLite",
    href: "/sqlite",
  },
  singlestore: {
    title: "SingleStore",
    imageSrc: "/public/svg/singlestore.svg",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description: "Collection of nodejs modules to interact with SingleStore",
    href: "/singlestore",
  },
  mssql: {
    title: "MSSQL",
    imageSrc: "",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description: "Collection of nodejs modules to interact with MSSQL",
    href: "/mssql",
  },
  cockroach: {
    title: "CockroachDB",
    imageSrc: "",
    lightStyle: {
      width: 24,
    },
    darkStyle: {
      width: 24,
    },
    description: "Collection of nodejs modules to interact with CockroachDB",
    href: "/cockroach",
  },
};
