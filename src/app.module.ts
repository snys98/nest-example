import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AngularModule } from './angular/angular.module';
import { ApplicationModule } from './application/application.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            installSubscriptionHandlers: true,
            playground: true,
        }),
        MongooseModule.forRoot('mongodb://root:snys19931103@localhost/db'),
        ApplicationModule,
        DomainModule,
        InfrastructureModule,
        AngularModule.forRoot({
            rootPath: 'client-app/dist/client-app',
            renderPath: "app",
        }),
    ],
    providers: [],
})
export class AppModule { }
