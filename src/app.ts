import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";

import { db } from "config/database";
import { clientController } from "controllers";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// create express app
export const app = express();

app.set("port", process.env.PORT || 80);
app.use(express.json());

app.post("/api/register", clientController.handlRegister);

export function startServer() {
  db.initialize()
    .then(() => {
      console.log("Database initialized");
      app.listen(() => console.log("Server started on port: ", app.get("port")));
    })
    .catch((error) => {
      console.error("Error during Data Source initialization:", error);
    });
}
