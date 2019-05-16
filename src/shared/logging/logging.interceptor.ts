import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IncomingMessage, ServerResponse } from 'http';
import { LogService } from './log.service';
import { LogOptions, LogOptionsInjectToken } from './log.module';
import * as expressWinston from "express-winston";
import { Request, Handler } from 'express';


@Injectable()
export class ResponseLoggingInterceptor implements NestInterceptor {
    genericLogger: Handler;
    /**
     *
     */
    constructor(private readonly logger: LogService,
        private readonly logOptions: LogOptions) {
    }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const gqlContext = GqlExecutionContext.create(context);
        let request = (context.switchToHttp().getRequest() || gqlContext.getContext().req) as Request;
        let now = Date.now();
        return next.handle().pipe(
            map((body) => {
                let response = gqlContext.getContext().res as ServerResponse;
                response.on("finish", () => {
                    let elapsedTime = Date.now() - now;
                    let content = {
                        req: {},
                        res: {},
                    };
                    expressWinston.requestWhitelist.concat("body").forEach(x => content.req[x] = request[x]);
                    expressWinston.responseWhitelist.forEach(x => content.res[x] = response[x]);
                    if (this.logOptions.enableResponseLogging) {
                        // tslint:disable-next-line: no-string-literal
                        content.res["body"] = body;
                    }
                    // tslint:disable-next-line: no-string-literal
                    content.res["elapsedTime"] = elapsedTime;
                    this.logger.info(content);
                });
                return body;
            }),
        );
    }
}
