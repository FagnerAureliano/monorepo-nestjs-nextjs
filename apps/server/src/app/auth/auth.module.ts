import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '../application/http/http.module'; 
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    HttpModule,
    JwtModule.register({ privateKey: process.env.JWT_SECRET_KEY, signOptions: { expiresIn: '3600' } }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
