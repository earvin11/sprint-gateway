import { Module } from '@nestjs/common';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { LoggerModule } from '../logging/infraestructure/logger.module';
import { CrupierController } from './crupier.controller';

@Module({
  imports: [LoggerModule, RedisModule],
  controllers: [CrupierController],
})
export class CrupierModule {}
