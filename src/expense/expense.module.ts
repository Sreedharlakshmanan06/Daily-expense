import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { Expense, ExpenseSchema } from 'src/schemas/expense.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

// Defines a module that encapsulates all expense-related components and functionality
@Module({
  // Imports required modules: MongooseModule to interact with the MongoDB database and UserModule for user-related functionality
  imports: [
    // Configures Mongoose to use the Expense schema for the 'expenses' collection
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]), 
    // Imports the UserModule to enable interaction with user-related services
    UserModule
  ],
  // Registers the ExpenseService as a provider within this module
  providers: [ExpenseService],
  // Registers the ExpenseController to handle incoming HTTP requests for expense-related routes
  controllers: [ExpenseController]
})
// Exports the ExpenseModule so it can be imported and used in other parts of the application
export class ExpenseModule { }
