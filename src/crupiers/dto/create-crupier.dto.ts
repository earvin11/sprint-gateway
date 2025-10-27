import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCrupierDto {
  @ApiProperty({
    description: 'Nombre del crupier',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  name: string;
}
