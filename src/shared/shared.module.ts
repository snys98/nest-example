import { Module, Global, DynamicModule, ArgumentsHost } from '@nestjs/common';
import { LoggingService } from '@shared/logging/logging.service';
import { LogLevel, LogOptions, LoggingModule } from '@shared/logging/logging.module';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IncomingMessage, ServerResponse } from 'http';
import { ExceptionFilterModule } from './exception-filter/exception-filter.module';
import { AuthModule } from './auth/auth.module';
import winston = require('winston');
import { UserFriendlyExceptionFilter } from './exception-filter/user-friendly-exception.filter';
import { LocalStrategy } from './auth/http.strategy';
import { LoggingInterceptor } from './logging/logging.interceptor';


// tslint:disable-next-line: max-classes-per-file
@Module({
    imports: []
})
export class SharedModule {
    static forRoot(logOptions: LogOptions): DynamicModule {
        return {
            imports: [LoggingModule.forRoot(logOptions), AuthModule.forRoot(), ExceptionFilterModule],
            providers: [LoggingService, UserFriendlyExceptionFilter, LocalStrategy, LoggingInterceptor],
            module: SharedModule,
            exports: [LoggingModule, AuthModule, ExceptionFilterModule]
        };
    }
}
