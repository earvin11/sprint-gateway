import { Module } from "@nestjs/common";
import { RedisModule } from '../redis/infraestructure/redis.module';
import { ClientController } from "./client.controller";
import { LoggerModule } from "src/logging/infraestructure/logger.module";

@Module({
    imports: [
        LoggerModule,
        RedisModule
    ],
    controllers: [ClientController]
})
export class ClientModule {}