import { Module } from '@nestjs/common'; 
import { PrismaService } from '../database/prisma.client';
import { CreateUserUseCase } from '../use-cases/users/create-user-use-case';
import { UserController } from './users/user.controller';

@Module({ 
  controllers: [UserController],
  providers: [CreateUserUseCase, PrismaService],
})
export class ControllerModule {}