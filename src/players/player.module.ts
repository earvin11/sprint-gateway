import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/infraestructure/redis.module';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { PlayerController } from './player.controller';

@Module({
  imports: [LoggerModule, RedisModule],
  controllers: [PlayerController],
})
export class PlayerModule {}
