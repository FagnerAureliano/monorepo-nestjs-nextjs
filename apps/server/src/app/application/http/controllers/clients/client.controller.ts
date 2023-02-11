import { Body, Controller, Post } from '@nestjs/common';
import { CreateClientUseCase } from '../../../use-cases/clients/create-client-use';

@Controller('/clients')
export class ClientController {
constructor(private createClient: CreateClientUseCase){}

  @Post()
  async create(@Body() body: any): Promise<any> {
    console.log(body);
    
    return this.createClient.execute(body);
  }
}
