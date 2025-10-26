import { CreateCrupierDto } from './create-crupier.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCrupierDto extends PartialType(CreateCrupierDto) {}
