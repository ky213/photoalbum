import "reflect-metadata";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import { clientController } from "controllers";
import { DIR } from "config/constants";
import { sessionConfig } from "config/authentication";
import { isAuthenticated } from "shared/middlewares/authentication";
import logger from "shared/utils/loggers";
import HttpException from "shared/utils/http-exceptions";
import swaggerSpec from "../docs/api/swagger-spec.json";
// create express app
export const app = express();

app.use(cors({ origin: ["http://localhost:8080", "*"], credentials: true, methods: ["GET", "POST"] }));
app.use(express.json({ limit: "5mb" }));

// init authencitation services
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

//api docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

app.use((error: HttpException, req: Request, res: Response, next: NextFunction): Response => {
  const level = error.status <= 400 ? "warn" : "error";

  logger(req).log(level, error.message);

  return res.status(error.status || 500).json({ message: error.message, errors: error.content?.errors });
});
