import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LobbyDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsString()
  operatorId: string;

  @ApiProperty()
  @IsString()
  casinoToken: string;

  @ApiProperty()
  @IsString()
  language: string;

  @ApiProperty()
  @IsString()
  currency: string;
}
