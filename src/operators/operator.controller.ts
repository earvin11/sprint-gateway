import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { LoggerPort } from '../logging/domain/logger.port';
import { RedisRpcPort } from 'src/redis/domain/redis-rpc.port';
import {
  OperatorGameRpcChannelsEnum,
  OperatorLimitsRpcChannelsEnum,
  OperatorRpcChannelsEnum,
} from './enums/operator.rpc-channels';
import { CreateOperatorDto } from './dtos/create-operator.dto';
import { UpdateOperatorDto } from './dtos/update-operator.dto';
import { CreateOperatorGameDto } from './dtos/create-operator-game.dto';
import { GetOperatorGamesQueryDto } from './dtos/get-operator-game.dto';
import { CreateOperatorLimitsDto } from './dtos/create-operator-limit.dto';

@Controller('operators')
export class OperatorController {
  constructor(
    private readonly LoggerPort: LoggerPort,
    private readonly redisRpcPort: RedisRpcPort,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo operador' })
  @ApiResponse({ status: 201, description: 'Operador creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos en la solicitud.' })
  async create(@Body() createOperatorDto: CreateOperatorDto) {
    const resp = await this.redisRpcPort.send(
      OperatorRpcChannelsEnum.CREATE,
      createOperatorDto,
    );
    return resp;
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los operadores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de operadores obtenida exitosamente.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findAll() {
    const resp = await this.redisRpcPort.send(
      OperatorRpcChannelsEnum.FIND_ALL,
      {},
    );
    return resp;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un operador por ID' })
  @ApiParam({ name: 'id', description: 'ID del operador', type: String })
  @ApiResponse({ status: 200, description: 'Operador encontrado.' })
  @ApiResponse({ status: 404, description: 'Operador no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findById(@Param('id') id: string) {
    const resp = await this.redisRpcPort.send(
      OperatorRpcChannelsEnum.FIND_BY_ID,
      { id },
    );
    return resp;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un operador por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del operador a actualizar',
    type: String,
  })
  @ApiBody({
    type: UpdateOperatorDto,
    description: 'Datos parciales para actualizar el operador',
  })
  @ApiResponse({
    status: 200,
    description: 'Operador actualizado exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos en la solicitud.' })
  @ApiResponse({ status: 404, description: 'Operador no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async update(
    @Param('id') id: string,
    @Body() updateOperatorDto: UpdateOperatorDto,
  ) {
    const resp = await this.redisRpcPort.send(OperatorRpcChannelsEnum.UPDATE, {
      id,
      data: updateOperatorDto,
    });
    return resp;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un operador por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del operador a eliminar',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Operador eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Operador no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async remove(@Param('id') id: string) {
    const resp = await this.redisRpcPort.send(OperatorRpcChannelsEnum.DELETE, {
      id,
    });
    return resp;
  }

  @Get(':id/games')
  async getGamesAssigned(
    @Param('id') id: string,
    @Query() query: GetOperatorGamesQueryDto,
  ) {
    const { typeGame, limit, offset } = query;
    console.log({ typeGame, limit, offset });
    const resp = await this.redisRpcPort.send(
      OperatorGameRpcChannelsEnum.FIND_BY_OPERATOR,
      { operator: id, typeGame, limit, offset },
    );
    return resp;
  }

  @Post(':id/games')
  async assignGame(
    @Param('id') id: string,
    @Body() data: CreateOperatorGameDto,
  ) {
    const resp = await this.redisRpcPort.send(
      OperatorGameRpcChannelsEnum.CREATE,
      { operator: id, ...data },
    );
    return resp;
  }

  @Patch(':id/games')
  async changeAssignedGame(
    @Param('id') id: string,
    @Body() data: CreateOperatorGameDto,
  ) {
    const resp = await this.redisRpcPort.send(
      OperatorGameRpcChannelsEnum.ASSIGN_GAME,
      { operator: id, ...data },
    );
    return resp;
  }

  @Get(':id/limits')
  async getLimitsAssigned(
    @Param('id') id: string,
    @Query() query: GetOperatorGamesQueryDto,
  ) {
    const { limit, offset } = query;
    const resp = await this.redisRpcPort.send(
      OperatorLimitsRpcChannelsEnum.FIND_BY_OPERATOR,
      { operator: id, limit, offset },
    );
    return resp;
  }

  @Post(':id/limits')
  async createLimit(
    @Param('id') id: string,
    @Body() data: CreateOperatorLimitsDto,
  ) {
    const resp = await this.redisRpcPort.send(
      OperatorLimitsRpcChannelsEnum.CREATE,
      { ...data, operator: id },
    );
    return resp;
  }

  @Patch(':id/limits')
  async getLimits(
    @Param('id') id: string,
    @Body() data: CreateOperatorLimitsDto,
  ) {
    const resp = await this.redisRpcPort.send(
      OperatorLimitsRpcChannelsEnum.UPDATE_BY_OPERATOR_CURRENCY,
      { ...data, operator: id },
    );
    return resp;
  }
}
