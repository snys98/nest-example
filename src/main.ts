import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as expressWinston from "express-winston";
import { Request, Response, NextFunction } from 'express';
import { LogService } from '@shared/logging/log.service';
// import { ResponseLoggingInterceptor } from '@shared/logging.interceptor';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = app.get(LogService);
    app.use(expressWinston.logger({
        winstonInstance: logger,
        requestWhitelist: [...expressWinston.requestWhitelist, "body"],
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        level: "info",
        statusLevels: {
            success: "info",
            warn: "info",
            error: "warn",
        },
    }));
    await app.listen(3000);
}
bootstrap();

