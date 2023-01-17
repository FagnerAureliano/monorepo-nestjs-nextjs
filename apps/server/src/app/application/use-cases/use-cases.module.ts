import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.client';
import { CreateUserUseCase } from './users/create-user-use-case';
import { FindUserUseCase } from './users/find-user-use-case';

@Module({
  providers: [CreateUserUseCase,FindUserUseCase, PrismaService],
  exports: [CreateUserUseCase, FindUserUseCase],
})
export class UseCasesModule {}
