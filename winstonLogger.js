const winston = require("winston");
const path = require("path");

const logFolder = path.join(__dirname, "logs");

const logger = winston.createLogger({
    level: "silly", // Set the default level to the lowest (silly)
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston.transports.File({ filename: path.join(logFolder, "error.log"), level: "error" }),
        new winston.transports.File({ filename: path.join(logFolder, "warn.log"), level: "warn" }),
        new winston.transports.File({ filename: path.join(logFolder, "info.log"), level: "info" }),
        new winston.transports.File({ filename: path.join(logFolder, "verbose.log"), level: "verbose" }),
        new winston.transports.File({ filename: path.join(logFolder, "debug.log"), level: "debug" }),
        new winston.transports.File({ filename: path.join(logFolder, "silly.log"), level: "silly" }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
            level: "silly", // Set the console log level to the lowest (silly)
        })
    );
}

module.exports = { logger };
