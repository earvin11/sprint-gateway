import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/infraestructure/redis.module';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { OperatorController } from './operator.controller';

@Module({
  imports: [LoggerModule, RedisModule],
  controllers: [OperatorController],
})
export class OperatorModule {}
