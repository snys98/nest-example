import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ProductResolver } from './resolvers/product/product.resolver';
import { ProductsService } from './services/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './models/product.schema';
import { GraphQLModule } from '@nestjs/graphql';
import { PubSub } from 'apollo-server';
import { nameof } from 'ts-simple-nameof';
import { Product } from './models/product.model';


const SERVICES = [ProductsService];
const RESOLVERS = [ProductResolver];
const MODEL_SCHEMAS = [{ name: nameof(Product), schema: ProductSchema }];
const THIRD_DEPS = [PubSub];

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            installSubscriptionHandlers: true,
            playground: true,
        }),
        MongooseModule.forRoot('mongodb://root:snys19931103@localhost/db'),
        MongooseModule.forFeature(MODEL_SCHEMAS),
    ],
    providers: [...SERVICES, ...RESOLVERS, ...THIRD_DEPS],
})
export class ApplicationModule {}
