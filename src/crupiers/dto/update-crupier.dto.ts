import { CreateCrupierDto } from './create-crupier.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateCrupierDto extends PartialType(CreateCrupierDto) {}
