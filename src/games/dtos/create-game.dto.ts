import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum GameTypes {
  ROULETTE = 'roulette',
  WHEEL = 'wheel',
}

export class CreateGameDto {
  @ApiProperty({ enum: GameTypes })
  @IsEnum(GameTypes)
  type: GameTypes;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  providerId: string;

  @ApiProperty()
  @IsString()
  urlTransmision: string;

  @ApiProperty()
  @IsString()
  logo: string;

  @ApiProperty()
  @IsBoolean()
  alwaysOpen: boolean;

  // --- Campo común opcional ---
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  // --- Campos específicos de ROULETTE (opcionales) ---
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ each: true })
  alertEmails?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  calle?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  chanceSimple?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  columna?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  cuadro?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  cubre?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  docena?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  initialBank?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isManualRoulette?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isShow?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  linea?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maximunBank?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxRepeatedResults?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  minutesToDisable?: number;

  @ApiProperty({ type: [Number], required: false })
  @IsArray()
  multisAllowed?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  numbersDistribution?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  pleno?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  saveRecordings?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  semipleno?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  specialCalle?: number;

  // --- Campos específicos de WHEEL (opcionales) ---
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  aditionalTime?: number;

  @ApiProperty({
    required: false,
    type: Object,
    description:
      'Mapa de pago por figura (clave: figura, valor: multiplicador)',
  })
  @IsOptional()
  betPays?: Record<string, number> | Record<number, number>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxBetFigures?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  timeOne?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  timeTwo?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  timeThree?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  percentReturnToPlayer?: number;
}
