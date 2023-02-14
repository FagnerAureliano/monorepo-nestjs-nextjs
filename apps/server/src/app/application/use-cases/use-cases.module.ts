import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.client';
import { CreateClientUseCase } from './clients/create-client-use-case';
import { DeleteClientUseCase } from './clients/delete-client-use-case';
import { FindClientUseCase } from './clients/find-client-use-case';
import { ListClientsUseCase } from './clients/list-clients-use-case';
import { UpdateClientUseCase } from './clients/update-client-use-case';
import { HttpStatusCatUseCase } from './external-api-use-case/http-status-cat-use-case';
import { RandomUsersUseCase } from './external-api-use-case/random-users-use-case';
import { CreateUserUseCase } from './users/create-user-use-case';
import { DeleteUserUseCase } from './users/delete-user-use-case';
import { FindUserUseCase } from './users/find-user-use-case';
import { ListUserUseCase } from './users/list-users-use-case';
import { UpdateUserUseCase } from './users/update-user-use-case';

@Module({
  providers: [
    PrismaService,

    CreateUserUseCase,
    FindUserUseCase,
    ListUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,

    CreateClientUseCase,
    DeleteClientUseCase,
    FindClientUseCase,
    ListClientsUseCase,
    UpdateClientUseCase,

    RandomUsersUseCase,
    HttpStatusCatUseCase,
  ],
  exports: [
    CreateUserUseCase,
    FindUserUseCase,
    ListUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,

    CreateClientUseCase,
    DeleteClientUseCase,
    FindClientUseCase,
    ListClientsUseCase,
    UpdateClientUseCase,

    RandomUsersUseCase,
    HttpStatusCatUseCase,
  ],
})
export class UseCasesModule {}
