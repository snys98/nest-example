import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as expressWinston from "express-winston";
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from '@shared/logging/logging.service';
import { ArgumentsHost } from '@nestjs/common';
import "./global";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: {
            debug: LoggingService.prototype.debug,
            log: LoggingService.prototype.log,
            verbose: LoggingService.prototype.verbose,
            error: LoggingService.prototype.error,
            warn: LoggingService.prototype.warn,
        }
    });
    await app.listen(3000);
}
bootstrap();

