import { Document, Schema } from "mongoose";
import { nameof } from "ts-simple-nameof";
// import { applyMixins } from "@shared/helpers";
export interface Product extends Document {
    name: string;
    price: number;
    createdAt: Date;
}
export class Product {

}

export const ProductSchema = new Schema<Product>({
    price: String,
    name: String,
    createdAt: Date,
}, {
        timestamps: { createdAt: true, updatedAt: true },
    });

