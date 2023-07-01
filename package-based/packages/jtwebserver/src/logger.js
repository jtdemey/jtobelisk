import winston from "winston";

const padDigit = (n) => {
  return n < 10 ? "0" + n : n;
};

const logFormat = winston.format.printf(function (info) {
  const d = new Date();
  const p = `${info.level}@${padDigit(
    d.getMonth() + 1
  )}/${d.getDate()}/${d.getFullYear()}@${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:`;
  const b = `${JSON.stringify(info.message, null, 4)}`;
  return p + b;
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.colorize(), logFormat),
  transports: [
    new winston.transports.Console({ timestamp: "true" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export default logger;
