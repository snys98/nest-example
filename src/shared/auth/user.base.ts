import { Document, Schema, PassportLocalDocument } from "mongoose";
import * as passportLocalMongoose from "passport-local-mongoose";

export interface User extends PassportLocalDocument {
    username: string;
    email: string;
    phone: string;
    password: string;
    createdAt: Date;
}
export class User {
    role: string;

}



export const UserSchema = new Schema<User>({
    username: String,
    email: String,
    phone: String,
    password: String,
    createdAt: Date,
}, {
        timestamps: { createdAt: true, updatedAt: true },
    });

UserSchema.plugin(passportLocalMongoose);
