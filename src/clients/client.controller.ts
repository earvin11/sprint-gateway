import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateClientDto } from './dtos/create-client.dto';
import { LoggerPort } from '../logging/domain/logger.port';
import { RedisRpcPort } from 'src/redis/domain/redis-rpc.port';
import { ClientRpcChannelsEnum } from './enums/client.rpc-channels';
import { UpdateClientDto } from './dtos/update-client.dto';

@Controller('clients')
export class ClientController {
    constructor(
        private readonly LoggerPort: LoggerPort,
        private readonly redisRpcPort: RedisRpcPort,
    ) {}

    @Post()
    async create(@Body() createClientDto: CreateClientDto) {
        const resp = await this.redisRpcPort.send(ClientRpcChannelsEnum.CREATE, createClientDto);
        return resp;
    }

    @Get()
    async findAll() {
        const resp = await this.redisRpcPort.send(ClientRpcChannelsEnum.FIND_ALL, {});
        return resp;
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const resp = await this.redisRpcPort.send(ClientRpcChannelsEnum.FIND_BY_ID, { id });
        return resp;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
        const resp = await this.redisRpcPort.send(ClientRpcChannelsEnum.UPDATE, { id, data: updateClientDto });
        return resp;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const resp = await this.redisRpcPort.send(ClientRpcChannelsEnum.DELETE, { id });
        return resp;
    }
}