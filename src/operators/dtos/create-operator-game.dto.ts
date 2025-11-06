import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum GameTypes {
  ROULETTE = 'roulette',
  WHEEL = 'wheel',
}

export class ConfigPaymentItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  optionBet: string;

  @ApiProperty()
  @IsNumber()
  pay: number;
}

export class CreateOperatorGameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  game: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  currencies: string[];

  @ApiProperty({ enum: GameTypes })
  @IsEnum(GameTypes)
  typeGame: GameTypes;

  @ApiProperty({ type: [ConfigPaymentItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConfigPaymentItemDto)
  configPayment?: ConfigPaymentItemDto[];

  // Campos específicos de ruleta (opcionales, ya que solo aplican si typeGame === 'roulette')
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  pleno?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  semipleno?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  cuadro?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  calle?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  linea?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  columna?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  docena?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  chanceSimple?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  cubre?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  specialCalle?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  layout?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  template?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  logo?: string;
}
