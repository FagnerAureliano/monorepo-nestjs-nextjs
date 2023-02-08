import { Controller, Get, Param } from '@nestjs/common';
import { HttpStatusCatUseCase } from '../../../use-cases/external-api-use-case/http-status-cat-use-case';

@Controller('http-status-cat')
// @UseGuards(AuthGuard('jwt'))
export class HttpStatusCatController {
  constructor(private httpStatusCat: HttpStatusCatUseCase) {}

  @Get(':code')
  async findByCode(@Param('code') code: number): Promise<string> {
    return await this.httpStatusCat.execute(code);
  }
}
