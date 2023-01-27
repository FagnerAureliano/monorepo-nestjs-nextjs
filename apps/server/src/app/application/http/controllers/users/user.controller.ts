import { Delete, HttpCode, HttpStatus, ParseUUIDPipe, Patch } from '@nestjs/common';
import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; 
import { User } from '@prisma/client';
import { IUser } from '../../../interfaces/user.interface';
import { CreateUserUseCase } from '../../../use-cases/users/create-user-use-case';
import { DeleteUserUseCase } from '../../../use-cases/users/delete-user-use-case';
import { FindUserUseCase } from '../../../use-cases/users/find-user-use-case';
import { ListUserUseCase } from '../../../use-cases/users/list-users-use-case';
import { UpdateUserUseCase } from '../../../use-cases/users/update-user-use-case';

@Controller('users')
// @UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly findUser: FindUserUseCase,
    private readonly listUser: ListUserUseCase,
    private readonly removeUser: DeleteUserUseCase,
    private readonly updateUser: UpdateUserUseCase

  ) {}

  @Post()
  async create(@Body() body: IUser): Promise<IUser> {
    return this.createUser.execute(body);
  }
  @Get()
  async list(): Promise<IUser[]> {
    return this.listUser.execute();
  }
  @Get(':id')
  async findByID(@Param('id', new ParseUUIDPipe()) id: string): Promise<IUser> {
    return this.findUser.findById(id);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.removeUser.execute(id);
  }
  @Patch()
  async update(@Body() body: User): Promise<IUser> {
    return this.updateUser.execute(body);
  }
}
