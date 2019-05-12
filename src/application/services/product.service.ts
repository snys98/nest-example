import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../models/product.model';

@Injectable()
export class ProductsService {
    async addNew(data: Partial<Product>): Promise<Product> {
        let product = new this.productModel(data);
        product = await product.save();
        return product;
    }
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }
    async findByPage(input: { skip: number, take: number }) {
        let { skip, take } = input;
        return await this.productModel.find().skip(skip).limit(take).exec();
    }
    async find(id: string) {
        return await this.productModel.findById(id).exec();
    }

    async findAll(): Promise<Product[]> {
        const models = await this.productModel.find().exec();
        return models;
    }
}
