import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Defines the UserDocument type as a combination of the User class and the Mongoose Document
export type UserDocument = User & Document;

// Marks the class as a schema for Mongoose
@Schema()
export class User {
    // Property to store the name of the user, marked as required
    @Prop({ required: true })
    name: string;

    // Property to store the email of the user, marked as required
    @Prop({ required: true })
    email: string;

    // Property to store the phone number of the user, marked as required
    @Prop({ required: true })
    phno: string;
}

// Creates a Mongoose schema from the User class
export const UserSchema = SchemaFactory.createForClass(User);
