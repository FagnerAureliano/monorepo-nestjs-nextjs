import { Module } from '@nestjs/common';
import { HttpModule } from './application/http/http.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
