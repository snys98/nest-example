import { List } from "linqts-camelcase";
import { ArgumentsHost } from "@nestjs/common";
import { IncomingMessage, ServerResponse } from "http";
import { Request } from "express-serve-static-core";
import { Response } from "express";
import { use } from "typescript-mix";
import { GqlExecutionContext } from "@nestjs/graphql";

declare module '@nestjs/common' {
    export interface ArgumentsHost {
        switchToGql?: () => GqlExecutionContext;
    }


    export interface GqlExecutionContext {
        getRequest(): Request;
        getResponse(): Response;
    }

}

declare global {
    interface Array<T> {
        toList(): List<T>;
    }
}

export function isFunction(obj: any): obj is Function {
    return obj.call !== undefined;
}

Array.prototype.toList = function () {
    return new List(this);
};

export function toMemberArray<T>(this): T[] {
    return Object.keys(this)
        .map(key => this[key])
        .filter(x => !isFunction(x));
}
