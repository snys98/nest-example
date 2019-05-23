import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AngularModule } from './angular/angular.module';
import { ApplicationModule } from './application/application.module';
import { SharedModule } from '@shared/shared.module';
import * as path from "path";
import { LogLevel } from '@shared/logging/logging.module';

@Module({
    imports: [
        AngularModule.forRoot({
            rootPath: path.resolve("client/dist"),
            renderPath: "/app/*",
        }),
        SharedModule.forRoot({ levels: LogLevel.toMemberArray(), enableResponseLogging: true }),
        ApplicationModule,
    ],
    providers: [],
    controllers: [],
})
export class AppModule { }

