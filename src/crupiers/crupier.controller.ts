import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { RedisRpcPort } from 'src/redis/domain/redis-rpc.port';
import { CrupierRpcChannelsEnum } from './enum/crupier.rpc-channels';
import { CreateCrupierDto } from './dto/create-crupier.dto';
import { UpdateCrupierDto } from './dto/update-crupier.dto';

@Controller('crupiers')
export class CrupierController {
  constructor(
    private readonly loggerPort: LoggerPort,
    private readonly redisRpcPort: RedisRpcPort,
  ) {}

  @Post()
  async create(@Body() createCrupierDto: CreateCrupierDto) {
    const resp = await this.redisRpcPort.send(CrupierRpcChannelsEnum.CREATE, {
      data: createCrupierDto,
    });
    return resp;
  }

  @Get()
  async findAll() {
    const resp = await this.redisRpcPort.send(
      CrupierRpcChannelsEnum.FIND_ALL,
      {},
    );
    return resp;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const resp = await this.redisRpcPort.send(
      CrupierRpcChannelsEnum.FIND_BY_ID,
      { id },
    );
    return resp;
  }

  @Patch(':id')
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
  async remove(@Param('id') id: string) {
    const resp = await this.redisRpcPort.send(CrupierRpcChannelsEnum.DELETE, {
      id,
    });
    return resp;
  }
}
