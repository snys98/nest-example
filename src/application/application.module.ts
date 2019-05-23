import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ProductResolver } from './resolvers/product/product.resolver';
import { ProductService } from './services/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { PubSub } from 'apollo-server';
import { nameof } from 'ts-simple-nameof';
import { Product, ProductSchema } from './models/product.model';
import { SharedModule } from '@shared/shared.module';
import { CatsController } from './temp/temp.controller';
import { User, UserSchema } from '@shared/auth/user.base';


const SERVICES = [ProductService];
const RESOLVERS = [ProductResolver];
const MODEL_SCHEMAS = [{ name: nameof(Product), schema: ProductSchema },
{ name: nameof(User), schema: UserSchema }];
const THIRD_DEPS = [PubSub, CatsController];

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            installSubscriptionHandlers: true,
            playground: true,
            context: ({ ...args }) => args,
        }),
        MongooseModule.forRoot('mongodb://root:snys19931103@localhost/db'),
        MongooseModule.forFeature(MODEL_SCHEMAS),
        SharedModule,
    ],
    providers: [...SERVICES, ...RESOLVERS, ...THIRD_DEPS],
})
export class ApplicationModule { }
