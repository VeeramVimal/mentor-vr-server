const winston = require("winston");
const config = require("./config");
const logDir = "mentorLogs";
const fs = require("fs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const now = new Date();
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
    new winston.transports.File({
      name: "error-file",
      filename: "./exceptLogs/exceptions.log",
      level: "error",
      json: false,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
