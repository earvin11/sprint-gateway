import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { RedisRpcPort } from 'src/redis/domain/redis-rpc.port';
import { CreateGameDto } from './dtos/create-game.dto';
import { GameRpcChannelsEnum } from './enums/game.rpc-channels';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GetGenericQueryDto } from 'src/shared/dtos/get-generic.dto';

@Controller('games')
export class GameController {
  constructor(private readonly redisRpcPort: RedisRpcPort) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo Game' })
  @ApiResponse({ status: 201, description: 'Game creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos en la solicitud.' })
  async create(@Body() createGameDto: CreateGameDto) {
    const resp = await this.redisRpcPort.send(
      GameRpcChannelsEnum.CREATE,
      createGameDto,
    );
    return resp;
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los games' })
  @ApiResponse({
    status: 200,
    description: 'Lista de games obtenida exitosamente.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: GetGenericQueryDto,
  ) {
    const resp = await this.redisRpcPort.send(GameRpcChannelsEnum.FIND_ALL, {
      page: query.page,
      limit: query.limit,
    });
    return resp;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un Game por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del Game a actualizar',
    type: String,
  })
  @ApiBody({
    type: CreateGameDto,
    description: 'Datos parciales para actualizar el Game',
  })
  @ApiResponse({
    status: 200,
    description: 'Game actualizado exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos en la solicitud.' })
  @ApiResponse({ status: 404, description: 'Game no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async update(@Param('id') id: string, @Body() createGameDto: CreateGameDto) {
    const resp = await this.redisRpcPort.send(GameRpcChannelsEnum.UPDATE, {
      id,
      data: createGameDto,
    });
    return resp;
  }
}
