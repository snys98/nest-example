import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IncomingMessage, ServerResponse } from 'http';
import { LoggingService } from '@shared/logging/logging.service';
import { LogOptions, LogOptionsInjectToken } from '@shared/logging/logging.module';
import * as expressWinston from "express-winston";
import { Request, Handler } from 'express';
import winston = require('winston');

const requestMeta = expressWinston.requestWhitelist.concat("body");
const responseMeta = expressWinston.responseWhitelist;

export type LogContent = { req: any, res?: any, error?: any, elapsedTime?:number };

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    genericLogger: Handler;
    /**
     *
     */
    constructor(private readonly logger: LoggingService,
        private readonly logOptions: LogOptions) {
    }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const gqlContext = GqlExecutionContext.create(context);
        let request = (context.switchToHttp().getRequest() || gqlContext.getContext().req) as Request;
        let now = Date.now();
        let handle = next.handle();
        let content: LogContent = { req: {} };
        handle.pipe().subscribe(
            (body) => {
                let response = gqlContext.getContext().res as ServerResponse;
                response.on("finish", () => {
                    content.res = {};
                    let elapsedTime = Date.now() - now;
                    requestMeta.forEach(x => content.req[x] = request[x]);
                    responseMeta.forEach(x => content.res[x] = response[x]);
                    if (this.logOptions.enableResponseLogging) {
                        // tslint:disable-next-line: no-string-literal
                        content.res.body = body;
                    }
                    // tslint:disable-next-line: no-string-literal
                    content.elapsedTime = elapsedTime;
                    this.logger.info(content);
                });
            },
            err => {
                let elapsedTime = Date.now() - now;
                requestMeta.forEach(x => content.req[x] = request[x]);
                content.elapsedTime = elapsedTime;
                Object.assign(content, winston.exceptions.getAllInfo(err));
                this.logger.error(content);
            },
            // () => console.log('HTTP request completed.')
        );
        return handle;
    }
}
