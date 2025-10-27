import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCurrencyDto {
  @ApiProperty({
    description: 'Nombre de la moneda',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'Código corto de la moneda',
    minLength: 2,
  })
  @IsString()
  short: string;

  @ApiProperty({
    description: 'Símbolo de la moneda',
    minLength: 1,
  })
  @IsString()
  symbol: string;

  @ApiProperty({
    description: 'Indica si la moneda está activa',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: 'Tasa de cambio respecto al USD',
  })
  @IsNumber()
  @IsPositive()
  usdExchange: number;
}
