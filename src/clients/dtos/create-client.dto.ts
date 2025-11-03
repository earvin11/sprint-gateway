import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    description: 'Nombre del cliente',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'Endpoint de autenticación del cliente',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  endpointAuth: string;

  @ApiProperty({
    description: 'Endpoint de rollback del cliente',
    minLength: 3,
  })
  @IsString()
  endpointRollback: string;

  @ApiProperty({
    description: 'Endpoint de apuesta del cliente',
    minLength: 3,
  })
  @IsString()
  endpointBet: string;

  // @ApiProperty({
  //   description: 'Endpoint de consulta de saldo del cliente',
  //   minLength: 3,
  // })
  // @IsString()
  // endpointBalance: string;

  @ApiProperty({
    description: 'Endpoint de consulta de juegos del cliente',
    minLength: 3,
  })
  @IsString()
  endpointWin: string;

  @ApiProperty({
    description: 'Logo del cliente',
    minLength: 3,
  })
  @IsString()
  logo: string;

  @ApiProperty({
    description: 'Logo de carga del cliente',
    minLength: 3,
  })
  @IsString()
  loaderLogo: string;

  @ApiProperty({
    description: 'URL de juegos del cliente',
    minLength: 3,
  })
  @IsString()
  urlGames: string;

  @ApiProperty({
    description: 'Indica si el cliente usa logo personalizado',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  useLogo?: boolean;
}
