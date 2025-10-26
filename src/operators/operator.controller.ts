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
import { LoggerPort } from '../logging/domain/logger.port';
import { RedisRpcPort } from 'src/redis/domain/redis-rpc.port';
import { OperatorRpcChannelsEnum } from './enums/operator.rpc-channels';
import { CreateOperatorDto } from './dtos/create-operator.dto';
import { UpdateOperatorDto } from './dtos/update-operator.dto';

@Controller('operators')
export class OperatorController {
  constructor(
    private readonly LoggerPort: LoggerPort,
    private readonly redisRpcPort: RedisRpcPort,
  ) {}

  @Post()
  async create(@Body() createOperatorDto: CreateOperatorDto) {
    const resp = await this.redisRpcPort.send(
      OperatorRpcChannelsEnum.CREATE,
      createOperatorDto,
    );
    return resp;
  }

  @Get()
  async findAll() {
    const resp = await this.redisRpcPort.send(
      OperatorRpcChannelsEnum.FIND_ALL,
      {},
    );
    return resp;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const resp = await this.redisRpcPort.send(
      OperatorRpcChannelsEnum.FIND_BY_ID,
      { id },
    );
    return resp;
  }

  @Patch(':id')
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
  async remove(@Param('id') id: string) {
    const resp = await this.redisRpcPort.send(OperatorRpcChannelsEnum.DELETE, {
      id,
    });
    return resp;
  }
}
