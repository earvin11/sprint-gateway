import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { LaunchController } from './launch.controller';

@Module({
  imports: [RedisModule, LoggerModule],
  controllers: [LaunchController],
})
export class LaunchModule {}
