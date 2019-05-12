import { Schema } from "mongoose";
import { Product } from "./product.model";

export const ProductSchema = new Schema<Product>({
    price: String,
    name: String,
    createdAt: Date,
}, {
        timestamps: { createdAt: true, updatedAt: true },
    });
