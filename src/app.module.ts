import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AngularModule } from './angular/angular.module';
import { ApplicationModule } from './application/application.module';
import { SharedModule } from '@shared/shared.module';
import * as path from "path";

@Module({
    imports: [
        ApplicationModule,
        AngularModule.forRoot({
            rootPath: path.resolve("client/dist"),
            renderPath: "/app/*",
        }),
        SharedModule.forRoot({ enabledLevels: ["debug", "info", "warn", "error", "crit"], enableResponseLogging: true }),
    ],
    providers: [],
    controllers: [],
})
export class AppModule { }

