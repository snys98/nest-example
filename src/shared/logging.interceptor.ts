// import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { tap, map } from 'rxjs/operators';
// import { Logger } from 'winston';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { IncomingMessage, ServerResponse } from 'http';

// @Injectable()
// export class GraphQLLoggingInterceptor implements NestInterceptor {
//     /**
//      *
//      */
//     constructor(@Inject('winston') private readonly logger: Logger) {

//     }
//     intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//         const ctx = GqlExecutionContext.create(context);
//         const now = Date.now();
//         const req = ctx.getContext().req;
//         this.logger.info(`${req.body.query}`, req);
//         return next
//             .handle()
//             .pipe(
//                 map(data => {
//                     this.logger.info(data, req);
//                 })
//             );
//     }
// }