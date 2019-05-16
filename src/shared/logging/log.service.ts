import { Injectable, LoggerService } from '@nestjs/common';
import winston = require('winston');
import { use } from "typescript-mix";
import { LogModule } from './log.module';


// tslint:disable-next-line: no-empty-interface
export interface LogService extends winston.Logger { }
@Injectable()
export class LogService implements winston.Logger {
    @use(winston, LogService)
    this: winston.Logger;
    /**
     *
     */
    // tslint:disable-next-line: no-empty
    constructor() {
    }
}
