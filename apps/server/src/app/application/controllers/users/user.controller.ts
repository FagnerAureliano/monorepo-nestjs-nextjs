import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { IUser } from '../../interfaces/user.interface';
import { CreateUserUseCase } from '../../use-cases/users/create-user-use-case';

@Controller('users')
export class UserController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post()
  async create(
    @Body() userData: IUser
  ): Promise<IUser> {
    return this.createUser.execute(userData);
  }
}
