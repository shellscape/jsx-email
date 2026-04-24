# v1 Roadmap

### Drizzle Kit V1
- [x] `generated` columns support [beta branch]
- [x] Brocli integration to Drizzle Kit
- [x] Generated SQL migration strict mode without `try catches` and `if not exists`
- [x] Drizzle Kit goes OSS steam 🎉
- [x] PostgreSQL enums alternations improvements
- [x] PostgreSQL RLS support
- [x] `check` constraint support in Drizzle Kit
- [x] Exposed API for programmatic access in Drizzle Kit
- [x] `materialized views` support in Drizzle Kit
- [x] Drizzle Studio `mkcert` fixes for dockerised environments

### Drizzle ORM V1

- [x] Migrate to folder v3, remove journal
- [x] Add explain mode for push
- [x] Add commutative migrations check (PostgreSQL, MySQL)
- [ ] Add commutative migrations check (SQLite, MSSQL, CockroachDB, SingleStore)
- [x] `generated` columns support [beta branch]
- [x] MySQL `.$returningIds()`
- [x] `mode: number` and `mode: bigint` support for PostgreSQL `decimals`
- [x] Table declarations with `(t) => ` callback to optionally omit column type imports
- [x] Optional database aliases for columns in table declarations -> `id: serial()`
- [x] PostgreSQL RLS support
- [x] Relational Queries V2 API
- [x] `drizzle('pg', ...)` driver instantiation to lower the entrance learning curve
- [x] CockroachDB support (supported with strict SQL migrations)
- [x] Native seeding
- [x] fixes: [#2575](https://github.com/drizzle-team/drizzle-orm/issues/2575), [#2572](https://github.com/drizzle-team/drizzle-orm/issues/2572), [#2571](https://github.com/drizzle-team/drizzle-orm/issues/2571),
[#2568](https://github.com/drizzle-team/drizzle-orm/issues/2568), [#2559](https://github.com/drizzle-team/drizzle-orm/issues/2559), [#2555](https://github.com/drizzle-team/drizzle-orm/issues/2555), [#2530](https://github.com/drizzle-team/drizzle-orm/issues/2530), [#2514](https://github.com/drizzle-team/drizzle-orm/issues/2514), [#2510](https://github.com/drizzle-team/drizzle-orm/issues/2510), [#2506](https://github.com/drizzle-team/drizzle-orm/issues/2506), [#2496](https://github.com/drizzle-team/drizzle-orm/issues/2496), [#2486](https://github.com/drizzle-team/drizzle-orm/issues/2486), [#2484](https://github.com/drizzle-team/drizzle-orm/issues/2484), [#2474](https://github.com/drizzle-team/drizzle-orm/issues/2474), [#2472](https://github.com/drizzle-team/drizzle-orm/issues/2472), [#2458](https://github.com/drizzle-team/drizzle-orm/issues/2458), [#2455](https://github.com/drizzle-team/drizzle-orm/issues/2455), add `drizzle-kit migrate/push --inspect` [#2488](https://github.com/drizzle-team/drizzle-orm/issues/2448), [#2432](https://github.com/drizzle-team/drizzle-orm/issues/2432), [#2430](https://github.com/drizzle-team/drizzle-orm/issues/2430), [#2426](https://github.com/drizzle-team/drizzle-orm/issues/2426), [#2424](https://github.com/drizzle-team/drizzle-orm/issues/2424), [#2418](https://github.com/drizzle-team/drizzle-orm/issues/2418), [#2414](https://github.com/drizzle-team/drizzle-orm/issues/2414), [#2401](https://github.com/drizzle-team/drizzle-orm/issues/2401), [#2396](https://github.com/drizzle-team/drizzle-orm/issues/2396), [#2395](https://github.com/drizzle-team/drizzle-orm/issues/2395), [#2394](https://github.com/drizzle-team/drizzle-orm/issues/2394), [#2390](https://github.com/drizzle-team/drizzle-orm/issues/2390), [#2389](https://github.com/drizzle-team/drizzle-orm/issues/2389), [#2388](https://github.com/drizzle-team/drizzle-orm/issues/2388), [#2387](https://github.com/drizzle-team/drizzle-orm/issues/2387), [#2384](https://github.com/drizzle-team/drizzle-orm/issues/2384), [#1210](https://github.com/drizzle-team/drizzle-orm/issues/1210), [#1157](https://github.com/drizzle-team/drizzle-orm/issues/1157), [#1113](https://github.com/drizzle-team/drizzle-orm/issues/1113), [#1020](https://github.com/drizzle-team/drizzle-orm/issues/1020), [#1003](https://github.com/drizzle-team/drizzle-orm/issues/1003), [#998](https://github.com/drizzle-team/drizzle-orm/issues/998), [#830](https://github.com/drizzle-team/drizzle-orm/issues/830), [#724](https://github.com/drizzle-team/drizzle-orm/issues/724), [#2254](https://github.com/drizzle-team/drizzle-orm/issues/2254), [#2239](https://github.com/drizzle-team/drizzle-orm/issues/2239), [#2236](https://github.com/drizzle-team/drizzle-orm/issues/2236), [#2224](https://github.com/drizzle-team/drizzle-orm/issues/2224), [#2216](https://github.com/drizzle-team/drizzle-orm/issues/2216), [#2198](https://github.com/drizzle-team/drizzle-orm/issues/2198), [#2189](https://github.com/drizzle-team/drizzle-orm/issues/2189), [#2183](https://github.com/drizzle-team/drizzle-orm/issues/2183), [#2174](https://github.com/drizzle-team/drizzle-orm/issues/2174), [#2169](https://github.com/drizzle-team/drizzle-orm/issues/2169), [#2157](https://github.com/drizzle-team/drizzle-orm/issues/2157), [#2151](https://github.com/drizzle-team/drizzle-orm/issues/2151), [#2146](https://github.com/drizzle-team/drizzle-orm/issues/2146), [#2136](https://github.com/drizzle-team/drizzle-orm/issues/2136), [#2122](https://github.com/drizzle-team/drizzle-orm/issues/2122), [#2085](https://github.com/drizzle-team/drizzle-orm/issues/2085), [#2067](https://github.com/drizzle-team/drizzle-orm/issues/2067), [#2047](https://github.com/drizzle-team/drizzle-orm/issues/2047), [#2015](https://github.com/drizzle-team/drizzle-orm/issues/2015), [#1928](https://github.com/drizzle-team/drizzle-orm/issues/1928), [#1835](https://github.com/drizzle-team/drizzle-orm/issues/1835), [#1804](https://github.com/drizzle-team/drizzle-orm/issues/1804), [#1765](https://github.com/drizzle-team/drizzle-orm/issues/1765), [#1748](https://github.com/drizzle-team/drizzle-orm/issues/1748), [#1744](https://github.com/drizzle-team/drizzle-orm/issues/1744), [#1625](https://github.com/drizzle-team/drizzle-orm/issues/1625), [#1428](https://github.com/drizzle-team/drizzle-orm/issues/1428), [#1402](https://github.com/drizzle-team/drizzle-orm/issues/1402), [#1315](https://github.com/drizzle-team/drizzle-orm/issues/1315), [#1313](https://github.com/drizzle-team/drizzle-orm/issues/1313), [#1294](https://github.com/drizzle-team/drizzle-orm/issues/1294), [#1272](https://github.com/drizzle-team/drizzle-orm/issues/1272), [#1269](https://github.com/drizzle-team/drizzle-orm/issues/1269), [#1225](https://github.com/drizzle-team/drizzle-orm/issues/1225), [#2378](https://github.com/drizzle-team/drizzle-orm/issues/2378), [#2343](https://github.com/drizzle-team/drizzle-orm/issues/2343), [#2322](https://github.com/drizzle-team/drizzle-orm/issues/2322), [#2315](https://github.com/drizzle-team/drizzle-orm/issues/2315), [#2282](https://github.com/drizzle-team/drizzle-orm/issues/2282), [#2279](https://github.com/drizzle-team/drizzle-orm/issues/2279)
- [x] MSSQL support
- [ ] 🎉 V1 RELEASE STREAM 🎉
- [ ] Down migrations, better rollbacks and improvements to `migrate` experience in Drizzle Kit
- [ ] `NODE_ENV` support for embedded `.env` consumer
- [ ] MariaDB support
