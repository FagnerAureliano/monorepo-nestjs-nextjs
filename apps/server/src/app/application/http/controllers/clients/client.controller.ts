import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Clients } from '@prisma/client';
import { CreateClientUseCase } from '../../../use-cases/clients/create-client-use-case';
import { DeleteClientUseCase } from '../../../use-cases/clients/delete-client-use-case';
import { FindClientUseCase } from '../../../use-cases/clients/find-client-use-case';
import { ListClientsUseCase } from '../../../use-cases/clients/list-clients-use-case';
import { UpdateClientUseCase } from '../../../use-cases/clients/update-client-use-case';

@Controller('/clients')
export class ClientController {
  constructor(
    private readonly createClient: CreateClientUseCase,
    private readonly removeClient: DeleteClientUseCase,
    private readonly findClient: FindClientUseCase,
    private readonly listClient: ListClientsUseCase,
    private readonly updateClient: UpdateClientUseCase
  ) {}

  @Post()
  async create(@Body() body: Clients) {
    return this.createClient.execute(body);
  }
  @Get()
  async list(): Promise<Clients[]> {
    return this.listClient.execute();
  }
  @Get(':id')
  async findByID(
    @Param('id', new ParseUUIDPipe()) id: string
  ): Promise<Clients> {
    return this.findClient.findById(id);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.removeClient.execute(id);
  }
  @Patch()
  async update(@Body() body: Clients): Promise<Clients> {
    return this.updateClient.execute(body);
  }
}
