import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  ValidateNested,
  IsOptional,
  IsArray,
} from 'class-validator';
import { GameTypes } from './create-operator-game.dto';

export enum OperatorLimitsTypesEnum {
  ROULETTE = 'op_lm_roulette',
  WHEEL = 'op_lm_wheel',
}

class LimitBetDto {
  @ApiProperty()
  @IsNumber()
  min: number;

  @ApiProperty()
  @IsNumber()
  max: number;
}

class FiguresLimitsDto {
  @ApiProperty()
  @IsNumber()
  figure: number;

  @ApiProperty()
  @IsNumber()
  minBet: number;

  @ApiProperty()
  @IsNumber()
  maxBet: number;
}

// Main DTO
export class CreateOperatorLimitsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  game: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  short: string;

  @ApiProperty()
  @IsNumber()
  minBet: number;

  @ApiProperty()
  @IsNumber()
  maxBet: number;

  @ApiProperty()
  @IsNumber()
  maxBetPosition: number;

  @ApiProperty({ enum: GameTypes })
  @IsEnum(GameTypes)
  typeGame: GameTypes;

  // WHEEL-specific optional field
  @ApiProperty({ type: [FiguresLimitsDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FiguresLimitsDto)
  figures?: FiguresLimitsDto[];

  // ROULETTE-specific optional fields
  @ApiProperty({ type: LimitBetDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => LimitBetDto)
  pleno?: LimitBetDto;

  @ApiProperty({ type: LimitBetDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => LimitBetDto)
  semipleno?: LimitBetDto;

  @ApiProperty({ type: LimitBetDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => LimitBetDto)
  cuadro?: LimitBetDto;

  @ApiProperty({ type: LimitBetDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => LimitBetDto)
  calle?: LimitBetDto;

  @ApiProperty({ type: LimitBetDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => LimitBetDto)
  linea?: LimitBetDto;

  @ApiProperty({ type: LimitBetDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => LimitBetDto)
  columna?: LimitBetDto;

  @ApiProperty({ type: LimitBetDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => LimitBetDto)
  docena?: LimitBetDto;

  @ApiProperty({ type: LimitBetDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => LimitBetDto)
  cubre?: LimitBetDto;

  @ApiProperty({ type: LimitBetDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => LimitBetDto)
  chanceSimple?: LimitBetDto;

  @ApiProperty({ type: LimitBetDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => LimitBetDto)
  even_odd?: LimitBetDto;

  @ApiProperty({ type: LimitBetDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => LimitBetDto)
  color?: LimitBetDto;

  @ApiProperty({ type: LimitBetDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => LimitBetDto)
  specialCalle?: LimitBetDto;
}
