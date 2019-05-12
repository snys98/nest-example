import { Module, Global } from '@nestjs/common';
import "ts-nameof";
import { LoggingInterceptor } from './logging.interceptor';

@Global()
@Module({
    providers: [LoggingInterceptor]
})
export class SharedModule { }
