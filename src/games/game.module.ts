import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { GameController } from './game.controller';

@Module({
  imports: [RedisModule, LoggerModule],
  controllers: [GameController],
})
export class GameModule {}
