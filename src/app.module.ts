import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RedisModule } from './redis/infraestructure/redis.module';
import { envs } from './config/envs';
import { BullModule } from '@nestjs/bullmq';
import { ClientModule } from './clients/client.module';
import { OperatorModule } from './operators/operator.module';
import { CurrencyModule } from './currencies/currency.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: envs.redisHost,
        port: envs.redisPort,
        password: envs.redisPassword,
      },
    }),
    ClientModule,
    CurrencyModule,
    OperatorModule,
    RedisModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
