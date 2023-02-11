import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.client';
import { CreateClientUseCase } from './clients/create-client-use';
import { HttpStatusCatUseCase } from './external-api-use-case/http-status-cat-use-case';
import { RandomUsersUseCase } from './external-api-use-case/random-users-use-case';
import { CreateUserUseCase } from './users/create-user-use-case';
import { DeleteUserUseCase } from './users/delete-user-use-case';
import { FindUserUseCase } from './users/find-user-use-case';
import { ListUserUseCase } from './users/list-users-use-case';
import { UpdateUserUseCase } from './users/update-user-use-case';

@Module({
  providers: [
    CreateUserUseCase,
    FindUserUseCase,
    ListUserUseCase,
    DeleteUserUseCase,
    CreateClientUseCase,
    PrismaService,
    UpdateUserUseCase,
    RandomUsersUseCase,
    HttpStatusCatUseCase
  ],
  exports: [
    CreateUserUseCase,
    FindUserUseCase,
    ListUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    CreateClientUseCase,
    RandomUsersUseCase,
    HttpStatusCatUseCase
  ],
})
export class UseCasesModule {}
