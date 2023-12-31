import { DataSource } from "typeorm";

export const db = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  entities: ["src/model/entities/*.ts", "src/model/entities/*.js"],
  logging: process.env.NODE_ENV == "prod",
  synchronize: process.env.NODE_ENV == "dev",
});
