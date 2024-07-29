// src/schemas/expense.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Defines the ExpenseDocument type as a combination of the Expense class and the Mongoose Document
export type ExpenseDocument = Expense & Document;

// Marks the class as a schema for Mongoose
@Schema()
export class Expense extends Document {
    // Property to store the ID of the user who created the expense
    @Prop({ required: true })
    userId: string;

    // Property to store the amount of the expense
    @Prop({ required: true })
    amount: number;

    // Property to store the description of the expense
    @Prop({ required: true })
    description: string;

    // Property to store the type of split for the expense (Equal, Exact, or Percentage)
    @Prop({ required: true, enum: ['Equal', 'Exact', 'Percentage'] })
    splitType: string;

    // Property to store the participants of the expense, including user IDs and amounts
    @Prop({ required: true })
    participants: Array<{ userId: string, amount: number, percentage?: number }>;
}

// Creates a Mongoose schema from the Expense class
export const ExpenseSchema = SchemaFactory.createForClass(Expense);
