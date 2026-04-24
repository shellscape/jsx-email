import { type IData, type IParams } from "../types";
import data from "../data/data.json";
import dataMapper from "@components/landing/benchmark/utils/dataMapper";

const variants = [
  {
    orm: "go",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "bun-1.3.4",
    joins: false,
    drizzleData: data["drizzle-beta-bun"],
    compareData: data["go"],
  },
  {
    orm: "prisma-v7.1.0",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "node-24",
    joins: false,
    drizzleData: data["drizzle-beta-node-24"],
    compareData: data["prisma-7-node-24"],
  },
  {
    orm: "prisma-v5.18.0",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "node-22",
    joins: false,
    drizzleData: data["drizzle-node-22"],
    compareData: data["prisma-node-22"],
  },
  {
    orm: "prisma-v5.18.0",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "node-18",
    joins: false,
    drizzleData: data["drizzle-node-18"],
    compareData: data["prisma-node-18"],
  },
  {
    orm: "prisma-v7.1.0",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "bun-1.3.4",
    joins: false,
    drizzleData: data["drizzle-beta-bun"],
    compareData: data["prisma-7-bun"],
  },
  {
    orm: "prisma-v5.18.0",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "bun-1.1.25",
    joins: false,
    drizzleData: data["drizzle-bun"],
    compareData: data["prisma-bun"],
  },
  {
    orm: "prisma-v5.18.0",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "node-22",
    joins: true,
    drizzleData: data["drizzle-node-22"],
    compareData: data["prisma-joins-node-22"],
  },
  {
    orm: "prisma-v5.18.0",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "node-18",
    joins: true,
    drizzleData: data["drizzle-node-18"],
    compareData: data["prisma-joins-node-18"],
  },
  {
    orm: "prisma-v5.18.0",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "bun-1.1.25",
    joins: true,
    drizzleData: data["drizzle-bun"],
    compareData: data["prisma-joins-bun"],
  },
  {
    orm: "prisma-v5.18.0",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "node-20",
    joins: false,
    drizzleData: data["drizzle-node-20"],
    compareData: data["prisma-node-20"],
  },
  {
    orm: "prisma-v5.18.0",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "node-20",
    joins: true,
    drizzleData: data["drizzle-node-20"],
    compareData: data["prisma-joins-node-20"],
  },
];

const getBenchmarkData = (
  params: IParams,
): null | { drizzleData: IData[]; compareData: IData[] } => {
  const { orm, dbSize, projectType, database, runtime, joins } = params;
  const foundVariants = variants.find(
    (path) =>
      path.orm === orm &&
      path.dbSize === dbSize &&
      path.projectType === projectType &&
      path.database === database &&
      path.joins === joins &&
      path.runtime === runtime,
  );
  if (!foundVariants) {
    return null;
  }

  return {
    drizzleData: dataMapper(foundVariants.drizzleData),
    compareData: dataMapper(foundVariants.compareData),
  };
};

export default getBenchmarkData;
