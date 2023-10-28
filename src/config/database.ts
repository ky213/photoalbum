import { User, Client, Photo } from "model/entities";
import { DataSource } from "typeorm";

export const db = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  entities: [User, Photo, Client],
  logging: true,
  synchronize: true,
});
