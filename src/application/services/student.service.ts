import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from '../../domain/models/student.model';

@Injectable()
export class StudentsService {
    async addNew(data: {
        number: string,

        name: string,
        historyScores: number[],
    }): Promise<Student> {
        let student = new this.studentModel(data as Student);
        student = await student.save();
        return student;
    }
    constructor(@InjectModel('Student') private readonly studentModel: Model<Student>) { }
    async findByPage(input: { skip: number, take: number }) {
        let { skip, take } = input;
        return await this.studentModel.find().skip(skip).limit(take).exec();
    }
    async find(id: string) {
        return await this.studentModel.findById(id).exec();
    }

    async findAll(): Promise<Student[]> {
        const models = await this.studentModel.find().exec();
        return models;
    }
}
