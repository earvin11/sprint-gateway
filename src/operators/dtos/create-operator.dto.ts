// import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOperatorDto {
  // @ApiProperty()
  @IsString()
  name: string;

  // @ApiProperty()
  @IsString()
  client: string;

  // @ApiProperty()
  @IsNumber()
  @IsPositive()
  minBet: number;

  // @ApiProperty()
  @IsNumber()
  @IsPositive()
  maxBet: number;

  // @ApiProperty()
  @IsString()
  endpointAuth: string;

  // @ApiProperty()
  @IsString()
  endpointBet: string;

  // @ApiProperty()
  @IsString()
  endpointWin: string;

  // @ApiProperty()
  @IsString()
  endpointRollback: string;

  // @ApiProperty()
  @IsString()
  casinoToken: string;
}
