import { Schema } from "mongoose";
import { Student } from "../../domain/models/student.model";

export const StudentSchema = new Schema<Student>({
    number: String,
    name: String,
    historyScores: [Number]
});