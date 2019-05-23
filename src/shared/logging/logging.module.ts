import { Module, DynamicModule, OnModuleInit, Inject, INestApplication, OnApplicationBootstrap } from '@nestjs/common';
import { LoggingService } from '@shared/logging/logging.service';
import * as path from "path";
import { WinstonModule } from "nest-winston";
import * as fs from 'fs';
import * as winston from "winston";
import { Format } from 'logform';
import { FileTransportOptions } from 'winston/lib/winston/transports';
import * as winstonDailyRotateFile from "winston-daily-rotate-file";
import * as JSON from "JSON5";
import { List } from "linqts-camelcase";
import { LoggingInterceptor } from '@shared/logging/logging.interceptor';
import { HttpAdapterHost, NestContainer, ModuleRef, AbstractHttpAdapter } from '@nestjs/core';
import { ServerResponse } from 'http';
import stream = require('stream');
import { toMemberArray } from 'src/global';
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
function buildTransportOption(level: LogLevel) {
    return {
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        level,
        filename: path.resolve(logDirectory, `%DATE%-${level}.log`),
        handleExceptions: true,
        json: true,
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    } as winstonDailyRotateFile.DailyRotateFileTransportOptions;
}

export enum LogLevel {
    error = "error",
    warn = "warn",
    info = "info",
    verbose = "verbose",
    debug = "debug",
    silly = "silly",
}

// tslint:disable-next-line: no-namespace
declare module "./logging.module" {
    export namespace LogLevel {
        function toMemberArray(this): LogLevel[];

    }
}
LogLevel.toMemberArray = toMemberArray;
export function isTransports(obj: any): obj is { transports: stream.Writable | stream.Writable[]; enableResponseLogging: boolean; } {
    return Object.keys(obj).includes("transports");
}


export type LogOptions = { levels: LogLevel[]; enableResponseLogging: boolean; } | { transports: stream.Writable | stream.Writable[]; enableResponseLogging: boolean; };

export const LogOptionsInjectToken = "LogOptions";

let logService: LoggingService;

@Module({})
export class LoggingModule implements OnModuleInit {
    static winstonInstance: any;
    onModuleInit() {
        // tslint:disable-next-line: no-string-literal
        this.moduleRef["container"].applicationConfig.addGlobalInterceptor(this.moduleRef.get(LoggingInterceptor));
    }

    /**
     *
     */
    constructor(private readonly moduleRef: ModuleRef) {

    }
    static forRoot(logOptions: LogOptions): DynamicModule {
        if (!isTransports(logOptions)) {
            const transports = new List(logOptions.levels).distinct().select(x => new winstonDailyRotateFile(buildTransportOption(x))).toArray();
            transports.push(new winston.transports.Console({
                format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.cli()),
                level: "debug",
            }) as any);
            transports.toList().forEach(x => winston.add(x));
            logService = new LoggingService();
            return {
                module: LoggingModule,
                providers: [{ provide: LoggingService, useValue: logService },
                { provide: LogOptionsInjectToken, useValue: logOptions },
                {
                    provide: LoggingInterceptor, useFactory: () => {
                        new LoggingInterceptor(logService, logOptions)
                    },
                }],
                exports: [{ provide: LoggingService, useValue: logService }, LoggingInterceptor],

            };
        } else {
            winston.configure({
                transports: logOptions as any,
            });
            logService = new LoggingService();
            return {
                module: LoggingModule,
                providers: [{ provide: LoggingService, useValue: logService },
                { provide: LogOptionsInjectToken, useValue: logOptions },
                {
                    provide: LoggingInterceptor, useFactory: () => {
                        new LoggingInterceptor(logService, logOptions)
                    },
                }],
                exports: [{ provide: LoggingService, useValue: logService }, LoggingInterceptor],

            };
        }

    }

}
