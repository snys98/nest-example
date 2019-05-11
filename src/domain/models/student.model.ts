import { Document } from "mongoose";
export interface Student extends Document {
    number: string;

    name: string;
    historyScores: number[];
}

