import { Request, Response, NextFunction } from "express";

/**
 * A middleware used to check for client authentication
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) return next();
  res.status(401).send("Client Not Authenticated");
};
