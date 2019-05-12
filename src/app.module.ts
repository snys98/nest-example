import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AngularModule } from './angular/angular.module';
import { ApplicationModule } from './application/application.module';
import { WinstonModule } from 'nest-winston';
import winston = require('winston');
@Module({
    imports: [
        WinstonModule.forRoot({
            level: 'verbose',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            ),
            transports: [
                //
                // - Write to all logs with level `info` and below to `combined.log` 
                // - Write all logs error (and below) to `error.log`.
                //
                new winston.transports.Console()
            ]
        }),
        ApplicationModule,
        AngularModule.forRoot({
            rootPath: 'client-app/dist/client-app',
            renderPath: "app",
        }),
    ],
    providers: [],
    controllers: [],
})
export class AppModule { }
