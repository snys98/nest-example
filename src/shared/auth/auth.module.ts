import { Module, DynamicModule, Type } from '@nestjs/common';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from "passport-local";
import passport = require('passport');
import { User } from './user.base';
import { Model } from 'mongoose';
import { ModuleRef } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';

@Module({})
export class AuthModule {
    /**
     *
     */
    constructor() {

    }
    static forRoot<TUser>(): DynamicModule {
        return {
            module: AuthModule,
            imports: [
                PassportModule.register({
                    session: false,
                }),
            ],
            providers: [AuthService,
                {
                    provide: getModelToken("User"),
                    inject: [ModuleRef],
                    useFactory: (moduleRef: ModuleRef) => { 
                        return moduleRef.get(getModelToken("User"))
                    }
                }
            ],
            exports: [PassportModule, AuthService]
        };
    }
}
