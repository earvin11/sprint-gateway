import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({
    description: 'ID único del usuario (ej. UUID o ID del sistema de auth)',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Nombre de usuario visible en la plataforma',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Identificador del operador al que pertenece el jugador',
  })
  @IsString()
  operator: string;

  @ApiProperty({
    description: 'Código de la moneda asociada al jugador',
  })
  @IsString()
  currency: string;

  @ApiProperty({
    description:
      'Último balance del jugador, como cadena (para precisión decimal)',
  })
  @IsString()
  lastBalance: string;

  @ApiProperty({
    required: false,
    description: 'Estado activo/inactivo del jugador',
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiProperty({
    required: false,
    description: 'Indica si el jugador tiene permisos de administrador',
  })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @ApiProperty({
    required: false,
    description:
      'Indica si el jugador es una persona física (vs. cuenta corporativa)',
  })
  @IsOptional()
  @IsBoolean()
  isPhysic?: boolean;

  @ApiProperty({
    required: false,
    description: 'Indica si el jugador tiene acceso al tablero (board)',
  })
  @IsOptional()
  @IsBoolean()
  board?: boolean;

  @ApiProperty({
    description:
      'Dirección de la billetera/token asociada al jugador (ej. Ethereum address)',
  })
  @IsString()
  tokenWallet: string;

  @ApiProperty({
    description: 'Identificador del White Label asociado al jugador',
  })
  @IsString()
  WL: string;
}
