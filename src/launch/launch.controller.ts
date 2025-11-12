import { Body, Controller, Post } from '@nestjs/common';
import { RedisRpcPort } from 'src/redis/domain/redis-rpc.port';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LaunchpcChannelsEnum } from './enums/launch.rpc-channels';
import { LaunchDto } from './dtos/launch.dto';
import { LobbyDto } from './dtos/lobby.dto';

@Controller('launch')
export class LaunchController {
  constructor(private readonly redisRpcPort: RedisRpcPort) {}

  @Post()
  @ApiOperation({ summary: 'Launch' })
  @ApiResponse({ status: 201, description: 'Launch exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos en la solicitud.' })
  async launch(@Body() createLaunchDto: LaunchDto) {
    const resp = await this.redisRpcPort.send(
      LaunchpcChannelsEnum.LAUNCH,
      createLaunchDto,
    );
    return resp;
  }

  @Post('lobby')
  @ApiOperation({ summary: 'Lobby' })
  @ApiResponse({ status: 201, description: 'Lobby exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos en la solicitud.' })
  async lobby(@Body() lobbyDto: LobbyDto) {
    const resp = await this.redisRpcPort.send(
      LaunchpcChannelsEnum.LOBBY,
      lobbyDto,
    );
    return resp;
  }
}
