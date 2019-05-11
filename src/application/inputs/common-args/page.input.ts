import { ArgsType, Field, Int } from "type-graphql";
import { Min, Max } from "class-validator";

@ArgsType()
export class PageInput {
    constructor(init?:Partial<PageInput>,) {
        Object.assign(this, init);
    }
    @Field(type => Int, { defaultValue: 0 })
    @Min(0)
    skip: number;

    @Field(type => Int)
    @Min(1)
    @Max(50)
    take = 25;
    startIndex = this.skip;
    endIndex = this.skip + this.take;
}
