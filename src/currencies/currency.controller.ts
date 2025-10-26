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

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly redisRpcPort: RedisRpcPort) {}

  @Post()
  async create(@Body() createCurrencyDto: CreateCurrencyDto) {
    const resp = await this.redisRpcPort.send(CurrencyRpcChannelsEnum.CREATE, {
      data: createCurrencyDto,
    });
    return resp;
  }

  @Get()
  async findAll() {
    const resp = await this.redisRpcPort.send(
      CurrencyRpcChannelsEnum.FIND_ALL,
      {},
    );
    return resp;
  }

  @Get(':id')
  async findById(@Param(':id') id: string) {
    const resp = await this.redisRpcPort.send(
      CurrencyRpcChannelsEnum.FIND_BY_ID,
      { id },
    );
    return resp;
  }

  @Patch(':id')
  async update(
    @Param(':id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ) {
    const resp = await this.redisRpcPort.send(CurrencyRpcChannelsEnum.UPDATE, {
      id,
      data: updateCurrencyDto,
    });
    return resp;
  }

  @Delete(':id')
  async remove(@Param(':id') id: string) {
    const resp = await this.redisRpcPort.send(CurrencyRpcChannelsEnum.DELETE, {
      id,
    });
    return resp;
  }
}
