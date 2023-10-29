import "reflect-metadata";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction, RequestHandler } from "express";

import { clientController } from "controllers";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// create express app
export const app = express();

app.use(express.json());

app.post("/api/register", (req: Request, res: Response, next: NextFunction) =>
  clientController.handlRegister(req, res, next)
);
app.use("*", (_, res: Response): Response => res.status(404).send("Not Found"));

app.use((error: Error, req: Request, res: Response, next: NextFunction): Response => {
  return res.status(500).send(error.message);
});
