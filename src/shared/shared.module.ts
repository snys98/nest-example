import { Module, Global, DynamicModule } from '@nestjs/common';
import { LogService } from '@shared/logging/log.service';
import { LogModule, LogLevel, LogOptions } from './logging/log.module';
import winston = require('winston');
@Global()
@Module({})
export class SharedModule {
    static forRoot(logOptions: LogOptions): DynamicModule {
        return {
            imports: [LogModule.forRoot(logOptions)],
            module: SharedModule,
            exports: [LogModule]
        };
    }
}
