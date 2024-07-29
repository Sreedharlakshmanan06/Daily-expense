export class GetExpenseDto {
    readonly userId: string;
    readonly amount: number;
    readonly description: string;
    readonly date: Date;
}