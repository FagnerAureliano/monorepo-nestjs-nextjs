import { Module } from '@nestjs/common'; 
import { RandomUsersUseCase } from '../use-cases/external-api-use-case/random-users-use-case';
import { UseCasesModule } from '../use-cases/use-cases.module'; 
import { ClientController } from './controllers/clients/client.controller';
import { RandomUsersController } from './controllers/external-api-controller/random-users.controller';
import { UserController } from './controllers/users/user.controller';

@Module({ 
  imports: [UseCasesModule],
  controllers: [UserController,RandomUsersController, ClientController], 
})
export class HttpModule {}