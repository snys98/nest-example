import { Module } from '@nestjs/common';
import { StudentResolver } from './resolvers/student/student.resolver';
import { StudentsService } from './services/student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from '../infrastructure/schemas/student.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema}])
    ],
    providers: [StudentResolver, StudentsService],
})
export class ApplicationModule { }
