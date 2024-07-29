import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Expense, ExpenseDocument } from 'src/schemas/expense.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UserService } from 'src/user/user.service';

// Marks the class as an injectable service for dependency injection
@Injectable()
export class ExpenseService {
  constructor(
    // Injects the Mongoose model for the Expense schema
    @InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>,
    // Injects the UserService to interact with user-related functionalities
    private userService: UserService,
  ) {}

  // Method to create a new expense
  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    try {
      // Validates the percentages if the splitType is 'Percentage'
      if (createExpenseDto.splitType === 'Percentage') {
        const totalPercentage = createExpenseDto.participants.reduce(
          (sum, participant) => sum + participant.amount,
          0,
        );

        // Throws an error if the total percentage does not add up to 100%
        if (totalPercentage !== 100) {
          throw new BadRequestException('Percentages must add up to 100%');
        }
      }

      // Creates a new expense document
      const createdExpense = await new this.expenseModel(createExpenseDto);
      // Saves the expense document to the database
      return createdExpense.save();
    } catch (error) {
      // Throws any caught errors
      throw error;
    }
  }

  // Method to find expenses by user ID
  async findByUserId(userId: string): Promise<Expense[]> {
    try {
      // Queries the database for expenses associated with the given user ID
      return await this.expenseModel.find({ userId }).exec();
    } catch (error) {
      // Throws any caught errors
      throw error;
    }
  }

  // Method to calculate overall expenses
  async calculateOverallExpenses(): Promise<any> {
    try {
      // Retrieves all expense records from the database
      const allRecords = await this.expenseModel.find().exec();

      // Calculates the total overall expense
      const overallExpense = await allRecords.reduce(
        (total, expense) => total + expense.amount,
        0,
      );

      // Returns the overall expense
      return {
        OverallExpense: overallExpense,
      };
    } catch (error) {
      // Throws any caught errors
      throw error;
    }
  }

  // Method to calculate expenses for a specific user
  async calculateExpenses(
    userId: string,
  ): Promise<{ total: number; splitDetails: any; checkedBy: any }> {
    try {
      // Queries the database for expenses where the user is a participant
      const expenses = await this.expenseModel
        .find({ 'participants.userId': userId })
        .exec();
        
      // Converts the userId to an ObjectId type
      const userObjectId = new Types.ObjectId(userId);
      // Retrieves the user information from the UserService
      const user = await this.userService.findById(userId);

      let total = 0;
      const splitDetails = [];

      // Iterates over the expenses to calculate the amount owed by the user
      for (const expense of expenses) {
        const participant = expense.participants.find(
          (participant) => participant.userId === userId,
        );

        if (participant) {
          let amountOwed = 0;

          // Calculates the amount owed based on the split type
          switch (expense.splitType) {
            case 'Equal':
              amountOwed = expense.amount / expense.participants.length;
              break;
            case 'Exact':
              amountOwed = participant.amount || 0;
              break;
            case 'Percentage':
              const totalPercentage = expense.participants.reduce(
                (acc, p) => acc + (p.percentage || 0),
                0,
              );
              amountOwed =
                (expense.amount * (participant.percentage || 0)) /
                totalPercentage;
              break;
            default:
              break;
          }

          // Retrieves the user information of the person to whom the amount is owed
          const owesToUser = await this.userService.findById(expense.userId);

          // Adds the expense details to the splitDetails array
          splitDetails.push({
            expenseId: expense._id,
            amountOwed,
            description: expense.description,
            owesTo: owesToUser ? owesToUser.name : 'Unknown',
          });

          // Adds the amount owed to the total
          total += amountOwed;
        }
      }

      // Returns the total amount owed and the split details
      return { total, splitDetails, checkedBy: user ? user.name : 'Unknown' };
    } catch (error) {
      // Throws any caught errors
      throw error;
    }
  }
}
