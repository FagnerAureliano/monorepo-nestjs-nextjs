import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from '../../../interfaces/user.interface';
import { CreateUserUseCase } from '../../../use-cases/users/create-user-use-case';
import { FindUserUseCase } from '../../../use-cases/users/find-user-use-case';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly findUser: FindUserUseCase
  ) {}

  @Post()
  async create(@Body() userData: IUser): Promise<IUser> {
    return this.createUser.execute(userData);
  }
  @Get(':id')
  async findByID(@Param('id') id: string): Promise<IUser> { 

    return this.findUser.findById(id);
  }
  
}
