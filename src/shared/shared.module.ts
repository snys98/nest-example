import { Module, Global, DynamicModule, ArgumentsHost } from '@nestjs/common';
import { LoggingService } from '@shared/logging/logging.service';
import { LogModule, LogLevel, LogOptions } from '@shared/logging/logging.module';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IncomingMessage, ServerResponse } from 'http';
import { ExceptionFilterModule } from './exception-filter/exception-filter.module';
import winston = require('winston');


// tslint:disable-next-line: max-classes-per-file
@Global()
@Module({
  imports: [ExceptionFilterModule]
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
