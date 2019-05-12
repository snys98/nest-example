import { ArgsType, Field, Int } from "type-graphql";
import { Min, Max } from "class-validator";

@ArgsType()
export class PageInput {
    constructor(init?: Partial<PageInput>, ) {
        Object.assign(this, init);
    }
    @Field(type => Int, { nullable: true })
    @Min(0)
    skip: number = 0;

    @Field(type => Int, { nullable: true })
    @Min(1)
    @Max(50)
    take = 25;
    // startIndex = this.skip;
    // endIndex = this.skip + this.take;
}
