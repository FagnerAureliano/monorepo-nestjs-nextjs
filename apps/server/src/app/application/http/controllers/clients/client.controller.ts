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
  Req,
} from '@nestjs/common';
import { CreateClientUseCase } from '../../../use-cases/clients/create-client-use-case';
import { DeleteClientUseCase } from '../../../use-cases/clients/delete-client-use-case';
import { FindClientUseCase } from '../../../use-cases/clients/find-client-use-case';
import { ListClientsUseCase } from '../../../use-cases/clients/list-clients-use-case';
import {
  ClientProps,
  UpdateClientUseCase,
} from '../../../use-cases/clients/update-client-use-case';

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
  async create(@Body() body: ClientProps) {
    return this.createClient.execute(body);
  }
  @Get()
  async list(@Req() request: Request) {
    return await this.listClient.execute(request);
  }
  @Get(':id')
  async findByID(
    @Param('id', new ParseUUIDPipe()) id: string
  ): Promise<ClientProps> {
    return await this.findClient.findById(id);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.removeClient.execute(id);
  }
  @Patch()
  async update(@Body() body: ClientProps) {
    return await this.updateClient.execute(body);
  }
}
