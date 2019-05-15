import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IncomingMessage, ServerResponse } from 'http';
import { LogService } from './log.service';

@Injectable()
export class ResponseLoggingInterceptor implements NestInterceptor {
    /**
     *
     */
    constructor(private readonly logger: LogService) {

    }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map(data => {
                    this.logger.debug(data, {});
                    return data;
                }),
            );
    }
}