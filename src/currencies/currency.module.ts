import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { CurrencyController } from './currency.controller';

@Module({
  imports: [LoggerModule, RedisModule],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
