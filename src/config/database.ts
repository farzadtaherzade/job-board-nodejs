import { MikroORM } from "@mikro-orm/postgresql";

export async function initializeORM(root: string) {
  console.log();
  const orm = await MikroORM.init({
    dbName: "job-node",
    password: "1234",
    entities: [root + "/**/*.entity.ts"],
  });
  return orm;
}
