import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class ClientController {
  @Post()
  async create(@Body() userData: any): Promise<any> {
    return null;
  }
}
