import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  short: string;

  @IsString()
  symbol: string;

  @IsNumber()
  @IsPositive()
  usdExchange: number;
}
