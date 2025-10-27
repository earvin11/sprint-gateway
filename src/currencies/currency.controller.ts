import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RedisRpcPort } from 'src/redis/domain/redis-rpc.port';
import { CurrencyRpcChannelsEnum } from './enums/currency.rpc-channels';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly redisRpcPort: RedisRpcPort) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva moneda' })
  @ApiBody({
    type: CreateCurrencyDto,
    description: 'Datos de la moneda a crear',
  })
  @ApiResponse({ status: 201, description: 'Moneda creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos en la solicitud.' })
  async create(@Body() createCurrencyDto: CreateCurrencyDto) {
    const resp = await this.redisRpcPort.send(CurrencyRpcChannelsEnum.CREATE, {
      data: createCurrencyDto,
    });
    return resp;
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las monedas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de monedas obtenida exitosamente.',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findAll() {
    const resp = await this.redisRpcPort.send(
      CurrencyRpcChannelsEnum.FIND_ALL,
      {},
    );
    return resp;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una moneda por ID' })
  @ApiParam({ name: 'id', description: 'ID de la moneda', type: String })
  @ApiResponse({ status: 200, description: 'Moneda encontrada.' })
  @ApiResponse({ status: 404, description: 'Moneda no encontrada.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findById(@Param('id') id: string) {
    const resp = await this.redisRpcPort.send(
      CurrencyRpcChannelsEnum.FIND_BY_ID,
      { id },
    );
    return resp;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente una moneda por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la moneda a actualizar',
    type: String,
  })
  @ApiBody({
    type: UpdateCurrencyDto,
    description: 'Campos parciales para actualizar',
  })
  @ApiResponse({ status: 200, description: 'Moneda actualizada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos en la solicitud.' })
  @ApiResponse({ status: 404, description: 'Moneda no encontrada.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ) {
    const resp = await this.redisRpcPort.send(CurrencyRpcChannelsEnum.UPDATE, {
      id,
      data: updateCurrencyDto,
    });
    return resp;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una moneda por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la moneda a eliminar',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Moneda eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Moneda no encontrada.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async remove(@Param('id') id: string) {
    const resp = await this.redisRpcPort.send(CurrencyRpcChannelsEnum.DELETE, {
      id,
    });
    return resp;
  }
}
