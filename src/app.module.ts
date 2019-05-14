import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AngularModule } from './angular/angular.module';
import { ApplicationModule } from './application/application.module';
import { SharedModule } from '@shared/shared.module';
@Module({
    imports: [
        ApplicationModule,
        AngularModule,
        SharedModule,
    ],
    providers: [],
    controllers: [],
})
export class AppModule { }
