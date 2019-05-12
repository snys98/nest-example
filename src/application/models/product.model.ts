import { Document } from "mongoose";
import { nameof } from "ts-simple-nameof";
// import { applyMixins } from "@shared/helpers";
export interface Product extends Document {
    name: string;
    price: number;
    createdAt: Date;
}
export class Product {

}

// applyMixins(Document, [Model]);
