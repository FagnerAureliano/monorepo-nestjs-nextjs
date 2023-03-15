import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { IUser } from '../../application/interfaces/user.interface';
import { FindUserUseCase } from '../../application/use-cases/users/find-user-use-case';

@Injectable()
export class AuthService {
  constructor(
    private findUserService: FindUserUseCase,
    private jwtService: JwtService
  ) {}

  async login(user: User) {
    user = await this.findUserService.findByEmail(user.email);
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    const data = {
      accessToken: token,
      name: user.name,
      email: user.email,
      role: user.role,
      photo: user.photo,
    };
    
    return data;
  }
  async validateUser(email: string, password: string) {
    let user: IUser;
    try {
      user = await this.findUserService.findByEmail(email);
    } catch (error) {
      return null;
    }
    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }
}
