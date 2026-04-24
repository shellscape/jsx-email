type GetStartedItems = {
  title: string;
  items: {
    name: string;
    path: {
      new: string;
      existing: string;
    };
    icon: {
      light: {
        path: string;
        style?: Record<string, any>;
      };
      dark: {
        path: string;
        style?: Record<string, any>;
      };
    };
  }[];
}[];

export const getStartedItems: GetStartedItems = [
  {
    title: "PostgreSQL",
    items: [
      {
        name: "PostgreSQL",
        path: {
          existing: "/docs/get-started/postgresql-existing",
          new: "/docs/get-started/postgresql-new",
        },
        icon: {
          light: {
            path: "/public/svg/postgresql.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/postgresql.svg",
            style: {
              width: 20,
              fill: "#f0f0f0",
            },
          },
        },
      },
      {
        name: "Neon",
        path: {
          existing: "/docs/get-started/neon-existing",
          new: "/docs/get-started/neon-new",
        },
        icon: {
          light: {
            path: "/public/svg/neon-light.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/neon-dark.svg",
            style: {
              width: 20,
            },
          },
        },
      },
      {
        name: "Vercel Postgres",
        path: {
          existing: "/docs/get-started/vercel-existing",
          new: "/docs/get-started/vercel-new",
        },
        icon: {
          light: {
            path: "/public/svg/vercel.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/vercel.svg",
            style: {
              width: 20,
              fill: "#000000",
            },
          },
        },
      },
      {
        name: "Supabase",
        path: {
          existing: "/docs/get-started/supabase-existing",
          new: "/docs/get-started/supabase-new",
        },
        icon: {
          light: {
            path: "/public/svg/supabase.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/supabase.svg",
            style: {
              width: 20,
            },
          },
        },
      },
      {
        name: "Xata",
        path: {
          existing: "/docs/get-started/xata-existing",
          new: "/docs/get-started/xata-new",
        },
        icon: {
          light: {
            path: "/public/svg/xata.svg",
            style: {
              width: 26,
            },
          },
          dark: {
            path: "/public/svg/xata.svg",
            style: {
              width: 26,
            },
          },
        },
      },
      {
        name: "PGLite",
        path: {
          existing: "/docs/get-started/pglite-existing",
          new: "/docs/get-started/pglite-new",
        },
        icon: {
          light: {
            path: "/public/svg/pglite.svg",
            style: {
              width: 26,
            },
          },
          dark: {
            path: "/public/svg/pglite.svg",
            style: {
              width: 26,
            },
          },
        },
      },
      {
        name: "Nile",
        path: {
          existing: "/docs/get-started/nile-existing",
          new: "/docs/get-started/nile-new",
        },
        icon: {
          light: {
            path: "/public/svg/nile.svg",
          },
          dark: {
            path: "/public/svg/nile.svg",
          },
        },
      },
      {
        name: "Bun SQL",
        path: {
          existing: "/docs/get-started/bun-sql-existing",
          new: "/docs/get-started/bun-sql-new",
        },
        icon: {
          light: {
            path: "/public/svg/bun.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/bun.svg",
            style: {
              width: 20,
            },
          },
        },
      },
      {
        name: "Effect",
        path: {
          existing: "/docs/get-started/effect-postgresql-existing",
          new: "/docs/get-started/effect-postgresql-new",
        },
        icon: {
          light: {
            path: "/public/svg/effect_light.svg",
            style: {
              width: 20,
              fill: "#f0f0f0",
            }
          },
          dark: { 
            path: "/public/svg/effect.svg",
            style: {
              width: 20,
              fill: "#f0f0f0",
            }
          }
        },
      },
      {
        name: "PlanetScale Postgres",
        path: {
          existing: "/docs/get-started/planetscale-postgres-existing",
          new: "/docs/get-started/planetscale-postgres-new",
        },
        icon: {
          light: {
            path: "/public/svg/planetscale.svg",

            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/planetscale.svg",
            style: {
              width: 20,
              color: "#f0f0f0",
            },
          },
        },
      },
    ],
  },
  {
    title: "Gel",
    items: [
      {
        name: "Gel",
        path: {
          existing: "/docs/get-started/gel-existing",
          new: "/docs/get-started/gel-new",
        },
        icon: {
          light: {
            path: "/public/svg/gel_light.svg",
            style: {
              style: "border-radius: 5px",
              width: 34,
              height: 34,
            },
          },
          dark: {
            path: "/public/svg/gel_dark.svg",
            style: {
              style: "border-radius: 5px",
              width: 34,
              height: 34,
            },
          },
        },
      },
    ],
  },
  {
    title: "MySQL",
    items: [
      {
        name: "MySQL",
        path: {
          existing: "/docs/get-started/mysql-existing",
          new: "/docs/get-started/mysql-new",
        },
        icon: {
          light: {
            path: "/public/svg/mysql.svg",
            style: {
              width: 20,
              fill: "#00546B",
            },
          },
          dark: {
            path: "/public/svg/mysql.svg",
            style: {
              width: 20,
              fill: "#F0F0F0",
            },
          },
        },
      },
      {
        name: "PlanetScale",
        path: {
          existing: "/docs/get-started/planetscale-existing",
          new: "/docs/get-started/planetscale-new",
        },
        icon: {
          light: {
            path: "/public/svg/planetscale.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/planetscale.svg",
            style: {
              width: 20,
              color: "#f0f0f0",
            },
          },
        },
      },
      {
        name: "TiDB",
        path: {
          existing: "/docs/get-started/tidb-existing",
          new: "/docs/get-started/tidb-new",
        },
        icon: {
          light: {
            path: "/public/svg/tidb.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/tidb.svg",
            style: {
              width: 20,
            },
          },
        },
      },
      {
        name: "SingleStore",
        path: {
          existing: "/docs/get-started/singlestore-existing",
          new: "/docs/get-started/singlestore-new",
        },
        icon: {
          light: {
            path: "/public/svg/singlestore_light.svg",
            style: {
              width: 20,
              fill: "#00546B",
            },
          },
          dark: {
            path: "/public/svg/singlestore_dark.svg",
            style: {
              width: 20,
              fill: "#F0F0F0",
            },
          },
        },
      },
    ],
  },
  {
    title: "SQLite",
    items: [
      {
        name: "SQLite",
        path: {
          existing: "/docs/get-started/sqlite-existing",
          new: "/docs/get-started/sqlite-new",
        },
        icon: {
          light: {
            path: "/public/svg/sqlite.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/sqlite.svg",
            style: {
              width: 20,
            },
          },
        },
      },
      {
        name: "Turso Cloud",
        path: {
          existing: "/docs/get-started/turso-existing",
          new: "/docs/get-started/turso-new",
        },
        icon: {
          light: {
            path: "/public/svg/new-turso.svg",
            style: {
              width: 26,
            },
          },
          dark: {
            path: "/public/svg/new-turso-light.svg",
            style: {
              width: 26,
            },
          },
        },
      },
      {
        name: "SQLite Cloud",
        path: {
          existing: "/docs/get-started/sqlite-cloud-existing",
          new: "/docs/get-started/sqlite-cloud-new",
        },
        icon: {
          light: {
            path: "/public/svg/sqlite-cloud.svg",
            style: {
              width: 26,
            },
          },
          dark: {
            path: "/public/svg/sqlite-cloud.svg",
            style: {
              width: 26,
            },
          },
        },
      },
      {
        name: "Turso Database",
        path: {
          existing: "/docs/get-started/turso-database-existing",
          new: "/docs/get-started/turso-database-new",
        },
        icon: {
          light: {
            path: "/public/svg/new-turso.svg",
            style: {
              width: 26,
            },
          },
          dark: {
            path: "/public/svg/new-turso-light.svg",
            style: {
              width: 26,
            },
          },
        },
      },
      {
        name: "Cloudflare D1",
        path: {
          existing: "/docs/get-started/d1-existing",
          new: "/docs/get-started/d1-new",
        },
        icon: {
          light: {
            path: "/public/svg/cloudflare.svg",
            style: {
              width: 26,
            },
          },
          dark: {
            path: "/public/svg/cloudflare.svg",
            style: {
              width: 26,
            },
          },
        },
      },
      {
        name: "Bun SQLite",
        path: {
          existing: "/docs/get-started/bun-sqlite-existing",
          new: "/docs/get-started/bun-sqlite-new",
        },
        icon: {
          light: {
            path: "/public/svg/bun.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/bun.svg",
            style: {
              width: 20,
            },
          },
        },
      },
      {
        name: "Cloudflare Durable Objects",
        path: {
          existing: "/docs/get-started/do-existing",
          new: "/docs/get-started/do-new",
        },
        icon: {
          light: {
            path: "/public/svg/cloudflare.svg",
            style: {
              width: 26,
            },
          },
          dark: {
            path: "/public/svg/cloudflare.svg",
            style: {
              width: 26,
            },
          },
        },
      },
    ],
  },
  {
    title: "MSSQL",
    items: [
      {
        name: "MSSQL",
        path: {
          existing: "/docs/get-started/mssql-existing",
          new: "/docs/get-started/mssql-new",
        },
        icon: {
          light: {
            path: "/public/svg/mssql-light.png",
            style: {
              style: "border-radius: 5px",
              width: 34,
              height: 34,
            },
          },
          dark: {
            path: "/public/svg/mssql-dark.png",
            style: {
              style: "border-radius: 5px",
              width: 34,
              height: 34,
            },
          },
        },
      },
    ],
  },
  {
    title: "CockroachDB",
    items: [
      {
        name: "CockroachDB",
        path: {
          existing: "/docs/get-started/cockroach-existing",
          new: "/docs/get-started/cockroach-new",
        },
        icon: {
          light: {
            path: "/public/svg/cockroachdb-light.png",
            style: {
              style: "border-radius: 5px",
              width: "24px",
            },
          },
          dark: {
            path: "/public/svg/cockroachdb-dark.png",
            style: {
              style: "border-radius: 5px",
              width: "24px",
            },
          },
        },
      },
    ],
  },
  {
    title: "Native SQLite",
    items: [
      {
        name: "Expo SQLite",
        path: {
          existing: "/docs/get-started/expo-existing",
          new: "/docs/get-started/expo-new",
        },
        icon: {
          light: {
            path: "/public/svg/expo.svg",
            style: {
              width: 20,
            },
          },
          dark: {
            path: "/public/svg/expo.svg",
            style: {
              width: 20,
            },
          },
        },
      },
      {
        name: "OP SQLite",
        path: {
          existing: "/docs/get-started/op-sqlite-existing",
          new: "/docs/get-started/op-sqlite-new",
        },
        icon: {
          light: {
            path: "/public/svg/opsqlite.png",
            style: {
              width: "20px",
              borderRadius: "4px",
            },
          },
          dark: {
            path: "/public/svg/opsqlite.png",
            style: {
              width: "20px",
              borderRadius: "4px",
            },
          },
        },
      },
    ],
  },
];
