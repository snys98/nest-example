import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { ProductType } from '../../types/product.type';
import { ProductService } from '../../services/product.service';
import { PageInput } from '../../inputs/common-args/page.input';
import { CreateProductInput } from '../../inputs/create-product.input';
import { PubSub } from 'apollo-server';
import { nameof } from "ts-simple-nameof";
import { UseInterceptors, Catch, InternalServerErrorException, UseFilters, UseGuards } from '@nestjs/common';
import { LoggingService } from '@shared/logging/logging.service';
import { UserFriendlyExceptionFilter } from '@shared/exception-filter/user-friendly-exception.filter';
import { GqlAuthGuard } from '@shared/auth/auth.guard';

@UseFilters(UserFriendlyExceptionFilter)
@Resolver(of => ProductType)
export class ProductResolver {
    constructor(private readonly productService: ProductService, private readonly pubSub: PubSub, private readonly logger: LoggingService) { }

    @Query(returns => ProductType)
    async product(@Args("id") id: string): Promise<ProductType> {
        let product = await this.productService.find(id);
        return new ProductType(product);
    }

    @Query(returns => [ProductType])
    @UseGuards(GqlAuthGuard)
    async products(@Args() input: PageInput): Promise<ProductType[]> {
        let products = await this.productService.findByPage(input);
        return products.map(x => new ProductType(x));
    }

    @Mutation(returns => ProductType)
    // @Authorized(Roles.Admin)
    async addProduct(
        @Args("newProductData") newProductData: CreateProductInput,
        // @Ctx("user") user: User,
    ): Promise<ProductType> {
        // return this.productService.addNew({ data: newProductData, user });
        let product = await this.productService.addNew(newProductData);
        let productType = new ProductType(product);
        await this.pubSub.publish(nameof<ProductResolver>(x => x.addProduct), productType);
        return productType;
    }
    @Subscription(returns => ProductType, {
        resolve: (x => x) as (<TPayload = ProductType, TReturnValue = ProductType>(x: TPayload) => TReturnValue),
    })
    async onNewProduct() {
        return this.pubSub.asyncIterator<ProductType>(nameof<ProductResolver>(x => x.addProduct));
    }
}
