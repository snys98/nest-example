import { Field, ObjectType, Int } from "type-graphql";
import { User } from "@shared/auth/user.base";

@ObjectType("user")
export class UserType {
    @Field()
    readonly createdAt: Date;
    constructor(init?: User ) {
        this.username = init.username;
        this.id = init.id;
        this.createdAt = init.createdAt;
    }
    @Field()
    id: string;
    @Field()
    username: string;
    // get only porp also works
    // @Field()
    // get averageScore(): number {
    //     return new List<number>(this.price).average();
    // }
}
