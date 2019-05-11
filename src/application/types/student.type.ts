import { Student } from "../../domain/models/student.model";
import { Field, ObjectType, Int } from "type-graphql";
import { List } from "linqts-camelcase";
@ObjectType("student")
export class StudentType {
    constructor(init?: Partial<StudentType | Student> ) {
        this.historyScores = init.historyScores;
        this.name = init.name;
        this.number = init.number;
    }
    @Field()
    number: string;
    @Field()
    name: string;
    @Field(type => [Int])
    historyScores: number[];
    @Field()
    get averageScore(): number {
        return new List<number>(this.historyScores).average();
    }
}
