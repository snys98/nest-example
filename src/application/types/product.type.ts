import { Product } from "../models/product.model";
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType("product")
export class ProductType {
    @Field()
    readonly createdAt: Date;
    constructor(init?: Product ) {
        this.price = init.price;
        this.name = init.name;
        this.id = init.id;
        this.createdAt = init.createdAt;
    }
    @Field()
    id: string;
    @Field()
    name: string;
    @Field()
    price: number;
    // get only porp also works
    // @Field()
    // get averageScore(): number {
    //     return new List<number>(this.price).average();
    // }
}
