import { Module } from '@nestjs/common'; 
import { UseCasesModule } from '../use-cases/use-cases.module'; 
import { ClientController } from './controllers/clients/client.controller';
import { UserController } from './controllers/users/user.controller';

@Module({ 
  imports: [UseCasesModule],
  controllers: [UserController, ClientController], 
})
export class HttpModule {}