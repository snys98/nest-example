import { Module, Global, DynamicModule, ArgumentsHost } from '@nestjs/common';
import { LoggingService } from '@shared/logging/logging.service';
import { LogModule, LogLevel, LogOptions } from '@shared/logging/logging.module';
import winston = require('winston');
import { GqlExecutionContext } from '@nestjs/graphql';
import { IncomingMessage, ServerResponse } from 'http';


// tslint:disable-next-line: max-classes-per-file
@Global()
@Module({
  imports: []
})
export class SharedModule {
    static forRoot(logOptions: LogOptions): DynamicModule {
        return {
            imports: [LogModule.forRoot(logOptions)],
            module: SharedModule,
            exports: [LogModule]
        };
    }
}
