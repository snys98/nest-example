import { Module, Global, DynamicModule } from '@nestjs/common';
// import { ResponseLoggingInterceptor } from './logging.interceptor';
import { LogService } from '@shared/logging/log.service';
import { LogModule, LogLevel, LogOptions } from './logging/log.module';
import winston = require('winston');

@Module({})
export class SharedModule {
    static forRoot(logOptions:LogOptions): DynamicModule {
        return {
            imports: [LogModule.forRoot(logOptions)],
            module: SharedModule,
        };
    }
}
