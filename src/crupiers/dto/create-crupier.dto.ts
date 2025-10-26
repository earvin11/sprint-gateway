import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCrupierDto {
  @IsString()
  @MinLength(3)
  name: string;
}
