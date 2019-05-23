import { Injectable } from "@nestjs/common";

import { PassportStrategy } from "@nestjs/passport";

import { AuthService } from "./auth.service";

import { InjectModel } from "@nestjs/mongoose";

import { PassportLocalModel } from "mongoose";
import { Strategy } from "passport-local";
import { User } from "./user.base";

@Injectable()
export class LocalStrategy<TUser extends User = User> extends PassportStrategy(Strategy,"local") {
    constructor(private readonly authService: AuthService<TUser>,
        @InjectModel('User') private readonly userModel: PassportLocalModel<TUser>) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        }, userModel.authenticate());
    }
}