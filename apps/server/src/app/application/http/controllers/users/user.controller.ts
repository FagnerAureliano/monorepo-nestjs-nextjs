import {
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import {
  UpdateUserRequest,
  UserRequest,
} from '../../../interfaces/user.interface';
import { CreateUserUseCase } from '../../../use-cases/users/create-user-use-case';
import { DeleteUserUseCase } from '../../../use-cases/users/delete-user-use-case';
import { FindUserUseCase } from '../../../use-cases/users/find-user-use-case';
import { ListUserUseCase } from '../../../use-cases/users/list-users-use-case';
import { UpdateUserUseCase } from '../../../use-cases/users/update-user-use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly findUser: FindUserUseCase,
    private readonly listUser: ListUserUseCase,
    private readonly removeUser: DeleteUserUseCase,
    private readonly updateUser: UpdateUserUseCase
  ) {}

  @Post()
  async create(@Body() body: UserRequest): Promise<UserRequest> {
    return this.createUser.execute(body);
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async list(): Promise<UserRequest[]> {
    return this.listUser.execute();
  }
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findByID(
    @Param('id', new ParseUUIDPipe()) id: string
  ): Promise<UserRequest> {
    return this.findUser.findById(id);
  }
  @Get('/email/:email')
  @UseGuards(AuthGuard('jwt'))
  async findByEmail(
    @Param('email') email: string
  ): Promise<UserRequest> {
    return this.findUser.findByEmail(email);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.removeUser.execute(id);
  }
  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() body: User): Promise<UpdateUserRequest> {
    return this.updateUser.execute(body);
  }
}
