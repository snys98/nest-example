import * as fs from 'fs';
import * as path from 'path';
import * as winston from "winston";
import { Format } from 'logform';
import * as expressWinston from "express-winston";
import { FileTransportOptions } from 'winston/lib/winston/transports';
import * as winstonDailyRotateFile from "winston-daily-rotate-file";

// ensure log directory exists
const logDirectory = path.resolve(`${path.parse(process.mainModule.filename).dir}`, "logs");
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

let options = {
    infoFile: {
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        level: "info",
        filename: path.resolve(logDirectory, "%DATE%-info.log"),
        handleExceptions: true,
        json: true,
        format: winston.format.combine(winston.format.timestamp(), winston.format.json())
    } as winstonDailyRotateFile.DailyRotateFileTransportOptions,
    debugFile: {
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        level: "debug",
        filename: path.resolve(logDirectory, "%DATE%-debug.log"),
        handleExceptions: true,
        json: true,
        format: winston.format.combine(winston.format.timestamp(), winston.format.json())
    } as winstonDailyRotateFile.DailyRotateFileTransportOptions,
    errorFile:  {
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        level: "error",
        filename: path.resolve(logDirectory, "%DATE%-error.log"),
        handleExceptions: true,
        json: true,
        // maxsize: 5242880, // 5MB
        format: winston.format.combine(winston.format.timestamp(), winston.format.json())
    } as winstonDailyRotateFile.DailyRotateFileTransportOptions,
};

export const LOGGER = winston.createLogger({
    transports: [
        new winstonDailyRotateFile(options.infoFile),
        new winstonDailyRotateFile(options.debugFile),
        new winstonDailyRotateFile(options.errorFile),
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.simple()),
        }),
    ],
    // ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
});

// // create a stream object with a 'write' function that will be used by `morgan`. This stream is based on node.js stream https://nodejs.org/api/stream.html.
// LOGGER.stream = {
//     write(message, encoding) {
//         // use the 'info' log level so the output will be picked up by both transports
//         LOGGER.info(message);
//     },
// };

// export const morganston = morgan("combined", { stream: LOGGER.stream });

// LOGGER.combinedFormat = function(err, req, res) {
//     // Similar combined format in morgan
//     // :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
//     return `${req.ip} - - [${new Date().toISOString()}] \"${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\" ${err.status ||
//     500} - ${req.headers["user-agent"]}`;
// };
