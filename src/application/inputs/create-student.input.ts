import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CreateStudentInput {
    constructor(init?: Partial<CreateStudentInput>, ) {
        Object.assign(this, init);

    }
    @Field()
    number: string;
    @Field()
    name: string;
    @Field(type => [Int])
    historyScores: number[];
}

