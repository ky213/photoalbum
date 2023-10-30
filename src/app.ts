import "reflect-metadata";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import session from "express-session";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { clientController } from "controllers";
import { DIR } from "config/constants";
import { sessionConfig } from "config/authentication";

// create express app
export const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.static(DIR.PRIVATE));
app.use(express.static(DIR.PUBLIC));

// init authencitation services
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// api endpoints
app.post("/api/register", (req: Request, res: Response, next: NextFunction) =>
  clientController.handlRegister(req, res, next)
);
app.post("/api/login", passport.authenticate("local"), (req, res) => {
  return res.json(req.user);
});
app.use("*", (_, res: Response): Response => res.status(404).send("Not Found"));

app.use((error: Error, req: Request, res: Response, next: NextFunction): Response => {
  return res.status(500).send(error.message);
});
