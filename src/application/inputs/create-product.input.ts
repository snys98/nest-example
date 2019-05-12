import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CreateProductInput {
    constructor(init?: Partial<CreateProductInput>, ) {
        Object.assign(this, init);

    }
    @Field()
    name: string;
    @Field()
    price: number;
}
