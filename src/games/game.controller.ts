import { Body, Controller, Post } from '@nestjs/common';
import { RedisRpcPort } from 'src/redis/domain/redis-rpc.port';
import { RouletteRpcChannelsEnum } from './enums/roulette.rpc-channels';
import { WheelRpcChannelsEnum } from './enums/wheel.rpc-channels';

@Controller('games')
export class GameController {
  constructor(private readonly redisRpcPort: RedisRpcPort) {}

  @Post()
  async create(@Body() createGameDto: any) {
    if (createGameDto.type == 'roulette') {
      const resp = await this.redisRpcPort.send(
        RouletteRpcChannelsEnum.CREATE,
        createGameDto,
      );
      return resp;
    }

    if (createGameDto.type == 'wheel') {
      const resp = await this.redisRpcPort.send(WheelRpcChannelsEnum.CREATE, createGameDto);
      return resp;
    }

    return {
      message: 'Type game not valid',
    };
  }
}
