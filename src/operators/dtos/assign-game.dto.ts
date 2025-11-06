import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum GameTypes {
  ROULETTE = 'roulette',
  WHEEL = 'wheel',
}

export class ConfigPaymentItemDto {
  @IsString()
  @IsNotEmpty()
  optionBet: string;

  @IsNumber()
  pay: number;
}

export class AssignOperatorGameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  game: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  currencies: string[];

  @ApiProperty()
  @IsEnum([GameTypes.ROULETTE, GameTypes.WHEEL])
  typeGame: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConfigPaymentItemDto)
  configPayment: ConfigPaymentItemDto[];
}
