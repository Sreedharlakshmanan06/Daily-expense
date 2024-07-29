import { IsNotEmpty, IsString, IsNumber, IsArray, ArrayMinSize, ValidateNested, IsEnum, IsOptional } from 'class-validator';

export class ParticipantDto {
    @IsNotEmpty()
    @IsString()
    userId: string;
  
    @IsNotEmpty()
    @IsNumber()
    amount: number;
  }

export class CreateExpenseDto {
    @IsNotEmpty()
    @IsString()
    userId: string;
  
    @IsNotEmpty()
    @IsNumber()
    amount: number;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsEnum(['Equal', 'Exact', 'Percentage'])
    splitType: 'Equal' | 'Exact' | 'Percentage';
    
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    participants: ParticipantDto[];
}