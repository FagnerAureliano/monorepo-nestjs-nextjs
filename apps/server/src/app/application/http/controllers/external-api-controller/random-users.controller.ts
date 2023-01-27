import { Controller, Get } from '@nestjs/common';
import { RandomUsers } from '../../../interfaces/random-users';
import { RandomUsersUseCase } from '../../../use-cases/external-api-use-case/random-users-use-case';

@Controller('random-users')
// @UseGuards(AuthGuard('jwt'))
export class RandomUsersController {
  constructor(private randomUser: RandomUsersUseCase) {}

  @Get()
  async list(): Promise<RandomUsers[]> {
    return await this.randomUser.execute();
  }
}
