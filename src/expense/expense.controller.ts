import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from 'src/schemas/expense.schema';
import { UserService } from 'src/user/user.service';

// Marks the class as a controller to handle HTTP requests for the 'expense' route
@Controller('expense')
export class ExpenseController {
  constructor(
    // Injects the ExpenseService for handling expense-related logic
    private readonly expenseService: ExpenseService,
    // Injects the UserService for handling user-related logic
    private userService: UserService,
  ) {}

  // Handles POST requests to create a new expense
  @Post()
  async createExpense(
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<Expense> {
    // Calls the create method in ExpenseService to save the new expense
    return this.expenseService.create(createExpenseDto);
  }

  // Handles GET requests to retrieve expenses for a specific user by userId
  @Get(':userId')
  async findExpensesByUserId(
    @Param('userId') userId: string,
  ): Promise<Expense[]> {
    // Calls the findByUserId method in ExpenseService to get expenses for the user
    return this.expenseService.findByUserId(userId);
  }

  // Handles GET requests to calculate expenses for a specific user by userId
  @Get(':userId/calculate')
  async calculateUserExpenses(
    @Param('userId') userId: string,
  ): Promise<{ total: number; splitDetails: any }> {
    // Calls the calculateExpenses method in ExpenseService to calculate user's expenses
    return this.expenseService.calculateExpenses(userId);
  }

  // Handles GET requests to retrieve and calculate overall expenses
  @Get()
  async findAllExpenses(): Promise<any> {
    // Calls the calculateOverallExpenses method in ExpenseService to get overall expenses
    return this.expenseService.calculateOverallExpenses();
  }
}
