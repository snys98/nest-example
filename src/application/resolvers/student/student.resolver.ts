import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { StudentType } from '../../types/student.type';
import { StudentsService } from '../../services/student.service';
import { PageInput } from '../../inputs/common-args/page.input';
import { CreateStudentInput } from '../../inputs/create-student.input';

@Resolver(of => StudentType)
export class StudentResolver {
    constructor(private readonly studentService: StudentsService) { }

    @Query(returns => StudentType)
    async student(@Args("id") id: string): Promise<StudentType> {
        let student = await this.studentService.find(id);
        return new StudentType(student);
    }

    @Query(returns => [StudentType])
    async students(@Args() input: PageInput): Promise<StudentType[]> {
        let students = await this.studentService.findByPage(input);
        return students.map(x => new StudentType(x));
    }

    @Mutation(returns => StudentType)
    // @Authorized()
    async addStudent(
        @Args("newStudentData") newStudentData: CreateStudentInput,
        // @Ctx("user") user: User,
    ): Promise<StudentType> {
        // return this.studentService.addNew({ data: newStudentData, user });
        let student = await this.studentService.addNew(newStudentData);
        return new StudentType(student);
    }

    // @Mutation(returns => Boolean)
    // @Authorized(Roles.Admin)
    // async removeStudent(@Arg("id") id: string) {
    //     try {
    //         await this.studentService.removeById(id);
    //         return true;
    //     } catch {
    //         return false;
    //     }
    // }
}
