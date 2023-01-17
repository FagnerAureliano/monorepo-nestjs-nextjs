import { Module } from '@nestjs/common'; 
import { UseCasesModule } from '../use-cases/use-cases.module'; 
import { UserController } from './controllers/users/user.controller';

@Module({ 
  imports: [UseCasesModule],
  controllers: [UserController], 
})
export class HttpModule {}