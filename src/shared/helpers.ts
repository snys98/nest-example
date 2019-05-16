import { List } from "linqts-camelcase";

export function toArray<T>(this): T[] {
    return Object.keys(this)
        .map(key => this[key])
        .filter(x => !isFunction(x));
}

// tslint:disable-next-line: ban-types
export function isFunction(obj: any): obj is Function {
    return obj.call !== undefined;
}

declare global {
    interface Array<T> {
        toList(): List<T>;
    }
}

Array.prototype.toList = function() {
    return new List(this);
};

