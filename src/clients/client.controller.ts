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
import { CreateClientDto } from './dtos/create-client.dto';
import { LoggerPort } from '../logging/domain/logger.port';
import { RedisRpcPort } from 'src/redis/domain/redis-rpc.port';
import { ClientRpcChannelsEnum } from './enums/client.rpc-channels';
import { UpdateClientDto } from './dtos/update-client.dto';
import { GetGenericQueryDto } from 'src/shared/dtos/get-generic.dto';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly LoggerPort: LoggerPort,
    private readonly redisRpcPort: RedisRpcPort,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiBody({ type: CreateClientDto, description: 'Datos del cliente a crear' })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos en la solicitud.' })
  async create(@Body() createClientDto: CreateClientDto) {
    const resp = await this.redisRpcPort.send(
      ClientRpcChannelsEnum.CREATE,
      createClientDto,
    );
    return resp;
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clients' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clients obtenida exitosamente.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: GetGenericQueryDto,
  ) {
    const resp = await this.redisRpcPort.send(ClientRpcChannelsEnum.FIND_ALL, {
      page: query.page,
      limit: query.limit,
    });
    return resp;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: String })
  @ApiResponse({ status: 200, description: 'Cliente encontrado.' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findById(@Param('id') id: string) {
    const resp = await this.redisRpcPort.send(
      ClientRpcChannelsEnum.FIND_BY_ID,
      { id },
    );
    return resp;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un cliente por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del cliente a actualizar',
    type: String,
  })
  @ApiBody({
    type: UpdateClientDto,
    description: 'Campos parciales para actualizar',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente actualizado exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos en la solicitud.' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    const resp = await this.redisRpcPort.send(ClientRpcChannelsEnum.UPDATE, {
      id,
      data: updateClientDto,
    });
    return resp;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del cliente a eliminar',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async remove(@Param('id') id: string) {
    const resp = await this.redisRpcPort.send(ClientRpcChannelsEnum.DELETE, {
      id,
    });
    return resp;
  }
}
