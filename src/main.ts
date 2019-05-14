import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { GraphQLLoggingInterceptor } from '@shared/logging.interceptor';
import * as expressWinston from "express-winston";
import winston = require('winston');
import { LOGGER } from '@shared/morganston.logger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // const logger = app.get(GraphQLLoggingInterceptor);
    app.use(expressWinston.logger({
        winstonInstance: LOGGER,
        requestWhitelist: [...expressWinston.requestWhitelist, "body"],
        responseWhitelist: ["body"],
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    }));
    // app.useGlobalInterceptors(logger);
    await app.listen(3000);
}
bootstrap();
