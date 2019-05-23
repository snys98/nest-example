import { Injectable, LoggerService } from '@nestjs/common';
import winston = require('winston');
import { use } from "typescript-mix";
import { LoggingModule } from '@shared/logging/logging.module';


// tslint:disable-next-line: no-empty-interface
export interface LoggingService extends winston.Logger { }
@Injectable()
export class LoggingService implements winston.Logger {
    @use(winston, LoggingService)
    this: winston.Logger;
    /**
     *
     */
    // tslint:disable-next-line: no-empty
    constructor() {
    }
}
