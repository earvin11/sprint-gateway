import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { LoggerPort } from '../logging/domain/logger.port';
import { RedisRpcPort } from 'src/redis/domain/redis-rpc.port';
import { PlayerRpcChannelsEnum } from './enums/player.rpc-channels';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { GetGenericQueryDto } from 'src/shared/dtos/get-generic.dto';

@Controller('players')
export class PlayerController {
  constructor(
    private readonly LoggerPort: LoggerPort,
    private readonly redisRpcPort: RedisRpcPort,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo player' })
  @ApiResponse({ status: 201, description: 'Player creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos en la solicitud.' })
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    const resp = await this.redisRpcPort.send(
      PlayerRpcChannelsEnum.CREATE,
      createPlayerDto,
    );
    return resp;
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los players' })
  @ApiResponse({
    status: 200,
    description: 'Lista de players obtenida exitosamente.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: GetGenericQueryDto,
  ) {
    const resp = await this.redisRpcPort.send(PlayerRpcChannelsEnum.FIND_ALL, {
      page: query.page,
      limit: query.limit,
    });
    return resp;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un player por ID' })
  @ApiParam({ name: 'id', description: 'ID del player', type: String })
  @ApiResponse({ status: 200, description: 'Player encontrado.' })
  @ApiResponse({ status: 404, description: 'Player no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findById(@Param('id') id: string) {
    const resp = await this.redisRpcPort.send(
      PlayerRpcChannelsEnum.FIND_BY_ID,
      { id },
    );
    return resp;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un player por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del player a actualizar',
    type: String,
  })
  @ApiBody({
    type: CreatePlayerDto,
    description: 'Datos parciales para actualizar el player',
  })
  @ApiResponse({
    status: 200,
    description: 'Player actualizado exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos en la solicitud.' })
  @ApiResponse({ status: 404, description: 'Player no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async update(
    @Param('id') id: string,
    @Body() updatePlayerDto: CreatePlayerDto,
  ) {
    const resp = await this.redisRpcPort.send(PlayerRpcChannelsEnum.UPDATE, {
      id,
      data: updatePlayerDto,
    });
    return resp;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un player por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del player a eliminar',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Player eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Player no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async remove(@Param('id') id: string) {
    const resp = await this.redisRpcPort.send(PlayerRpcChannelsEnum.DELETE, {
      id,
    });
    return resp;
  }
}
