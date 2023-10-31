import { Request } from "express";
import { createLogger, format, transports } from "winston";

const { combine, timestamp, label, printf, colorize } = format;
const basicFormat = printf(({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`);

/**
 * A winston logger adapter to log both runtime exceptions and http exceptions.
 */
const logger = (req?: Request) => {
  const labelType: string = req ? `${req.method} ${req.path}` : "error";

  return createLogger({
    format: combine(label({ label: labelType }), colorize({ all: true }), timestamp(), basicFormat),
    transports: [new transports.Console()],
  });
};

export default logger;
