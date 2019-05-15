import { Module, DynamicModule, OnModuleInit, Inject, INestApplication, OnApplicationBootstrap } from '@nestjs/common';
import { LogService } from './log.service';
import * as path from "path";
import { WinstonModule } from "nest-winston";
import * as fs from 'fs';
import * as winston from "winston";
import { Format } from 'logform';
import { FileTransportOptions } from 'winston/lib/winston/transports';
import * as winstonDailyRotateFile from "winston-daily-rotate-file";
import * as JSON from "JSON5";
import { List } from "linqts-camelcase";
import { ResponseLoggingInterceptor } from './logging.interceptor';
import { HttpAdapterHost, NestContainer, ModuleRef, AbstractHttpAdapter } from '@nestjs/core';
import { ServerResponse } from 'http';

// declare module "@nestjs/core" { 
//     interface ModuleRef { 
//         container: NestContainer;
//     }
// }

// ensure log directory exists
const logDirectory = path.resolve(`${path.parse(process.mainModule.filename).dir}`, "logs");
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const files = {
    info: {
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        level: "info",
        filename: path.resolve(logDirectory, "%DATE%-info.log"),
        handleExceptions: true,
        json: true,
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    } as winstonDailyRotateFile.DailyRotateFileTransportOptions,
    debug: {
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        level: "debug",
        filename: path.resolve(logDirectory, "%DATE%-debug.log"),
        handleExceptions: true,
        json: true,
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    } as winstonDailyRotateFile.DailyRotateFileTransportOptions,
    warn: {
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        level: "warn",
        filename: path.resolve(logDirectory, "%DATE%-warn.log"),
        handleExceptions: true,
        json: true,
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    } as winstonDailyRotateFile.DailyRotateFileTransportOptions,
    error: {
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        level: "error",
        filename: path.resolve(logDirectory, "%DATE%-error.log"),
        handleExceptions: true,
        json: true,
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    } as winstonDailyRotateFile.DailyRotateFileTransportOptions,
    crit: {
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        level: "crit",
        filename: path.resolve(logDirectory, "%DATE%-crit.log"),
        handleExceptions: true,
        json: true,
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    } as winstonDailyRotateFile.DailyRotateFileTransportOptions,
};

export type LogLevel = keyof typeof files;
export type LogOptions = { enabledLevels: LogLevel[], enableResponseLogging: boolean };

const LogOptionsInjectToken = "LogOptions";

let logger: LogService;

@Module({})
export class LogModule implements OnModuleInit {
    onModuleInit() {
        if (this.logOptions.enableResponseLogging) {
            this.moduleRef["container"].applicationConfig.addGlobalInterceptor(new ResponseLoggingInterceptor(logger));
        }
    }

    /**
     *
     */
    constructor(private readonly moduleRef: ModuleRef,
        @Inject(LogOptionsInjectToken) private readonly logOptions: LogOptions) {

    }
    static forRoot(logOptions: LogOptions): DynamicModule {
        const transports = new List(logOptions.enabledLevels).distinct().select(x => new winstonDailyRotateFile(files[x])).toArray();
        logger = new LogService({
            transports: [
                ...transports,
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.simple()),
                }),
            ],
        });
        return {
            module: LogModule,
            providers: [{ provide: LogService, useValue: logger }, { provide: LogOptionsInjectToken, useValue: logOptions }],
            exports: [{ provide: LogService, useValue: logger }],

        };
    }

}
