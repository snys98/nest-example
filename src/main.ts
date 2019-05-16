import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as expressWinston from "express-winston";
import { Request, Response, NextFunction } from 'express';
import { LogService } from '@shared/logging/log.service';
import * as helper from "@shared/helpers";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();

