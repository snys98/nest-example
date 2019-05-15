import { Injectable, LoggerService } from '@nestjs/common';
import winston = require('winston');
import { use } from "typescript-mix";


export interface LogService extends winston.Logger { }
@Injectable()
export class LogService implements winston.Logger {
    @use(LogService.instance, LogService)
    this: winston.Logger;
    static instance: winston.Logger;
    /**
     *
     */
    constructor(options?: winston.LoggerOptions) {
        LogService.instance = winston.createLogger(options);
        Object.assign(this, LogService.instance);
        this["__proto__"] = LogService.instance["__proto__"];
    }
}
