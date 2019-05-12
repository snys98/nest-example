import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from 'winston';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    /**
     *
     */
    constructor(@Inject('winston') private readonly logger: Logger) {

    }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = GqlExecutionContext.create(context);
        this.logger.info('Request Begin.');
        
        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => this.logger.info(`Request Finished. ${Date.now() - now}ms`)),
            );
    }
}