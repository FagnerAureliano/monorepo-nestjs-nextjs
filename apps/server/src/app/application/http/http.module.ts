import { Module } from '@nestjs/common';  
import { UseCasesModule } from '../use-cases/use-cases.module'; 
import { ClientController } from './controllers/clients/client.controller';
import { HttpStatusCatController } from './controllers/external-api-controller/http-status-cat.controller';
import { RandomUsersController } from './controllers/external-api-controller/random-users.controller';
import { UserController } from './controllers/users/user.controller';

@Module({ 
  imports: [UseCasesModule],
  controllers: [UserController,RandomUsersController, ClientController, HttpStatusCatController], 
})
export class HttpModule {}