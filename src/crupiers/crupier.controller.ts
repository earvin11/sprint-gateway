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
import { LoggerPort } from 'src/logging/domain/logger.port';
import { RedisRpcPort } from 'src/redis/domain/redis-rpc.port';
import { CrupierRpcChannelsEnum } from './enum/crupier.rpc-channels';
import { CreateCrupierDto } from './dto/create-crupier.dto';
import { UpdateCrupierDto } from './dto/update-crupier.dto';
import { GetGenericQueryDto } from 'src/shared/dtos/get-generic.dto';

@Controller('crupiers')
export class CrupierController {
  constructor(
    private readonly loggerPort: LoggerPort,
    private readonly redisRpcPort: RedisRpcPort,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo crupier' })
  @ApiBody({ type: CreateCrupierDto, description: 'Datos del crupier a crear' })
  @ApiResponse({ status: 201, description: 'Crupier creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos en la solicitud.' })
  async create(@Body() createCrupierDto: CreateCrupierDto) {
    const resp = await this.redisRpcPort.send(CrupierRpcChannelsEnum.CREATE, {
      data: createCrupierDto,
    });
    return resp;
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los crupiers' })
  @ApiResponse({
    status: 200,
    description: 'Lista de crupiers obtenida exitosamente.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: GetGenericQueryDto,
  ) {
    const resp = await this.redisRpcPort.send(CrupierRpcChannelsEnum.FIND_ALL, {
      page: query.page,
      limit: query.limit,
    });
    return resp;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un crupier por ID' })
  @ApiParam({ name: 'id', description: 'ID del crupier', type: String })
  @ApiResponse({ status: 200, description: 'Crupier encontrado.' })
  @ApiResponse({ status: 404, description: 'Crupier no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findById(@Param('id') id: string) {
    const resp = await this.redisRpcPort.send(
      CrupierRpcChannelsEnum.FIND_BY_ID,
      { id },
    );
    return resp;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un crupier por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del crupier a actualizar',
    type: String,
  })
  @ApiBody({
    type: UpdateCrupierDto,
    description: 'Campos parciales para actualizar',
  })
  @ApiResponse({
    status: 200,
    description: 'Crupier actualizado exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos en la solicitud.' })
  @ApiResponse({ status: 404, description: 'Crupier no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async update(
    @Param('id') id: string,
    @Body() updateCrupierDto: UpdateCrupierDto,
  ) {
    const resp = await this.redisRpcPort.send(CrupierRpcChannelsEnum.UPDATE, {
      id,
      data: updateCrupierDto,
    });
    return resp;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un crupier por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del crupier a eliminar',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Crupier eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Crupier no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async remove(@Param('id') id: string) {
    const resp = await this.redisRpcPort.send(CrupierRpcChannelsEnum.DELETE, {
      id,
    });
    return resp;
  }
}
