import "reflect-metadata";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import session from "express-session";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { clientController } from "controllers";
import { DIR } from "config/constants";
import { sessionConfig } from "config/authentication";
import { isAuthenticated } from "shared/middlewares/authentication";
import logger from "shared/utils/loggers";

// create express app
export const app = express();

app.use(express.json({ limit: "5mb" }));

// init authencitation services
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

//serve files
app.use("/photos", isAuthenticated, express.static(DIR.PRIVATE));
app.use(express.static(DIR.PUBLIC));

// api endpoints
app.post("/api/register", (req: Request, res: Response, next: NextFunction) =>
  clientController.handlRegister(req, res, next)
);
app.post("/api/login", passport.authenticate("local"), (req, res) => res.json(req.user));
app.get("/api/users/me", isAuthenticated, (req: Request, res: Response, next: NextFunction) =>
  clientController.handleGetlient(req, res, next)
);
app.use("*", (_, res: Response): Response => res.status(404).send("Not Found."));

app.use((error: Error, req: Request, res: Response, next: NextFunction): Response => {
  logger(req).error(error.message);

  return res.status(500).send(error.message);
});
