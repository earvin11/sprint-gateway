import { Module } from '@nestjs/common';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { LoggerModule } from '../logging/infraestructure/logger.module';

@Module({
  imports: [LoggerModule, RedisModule],
  controllers: [],
})
export class CrupierModule {}
