import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { IUser } from '../../application/interfaces/user.interface';
import { FindUserUseCase } from '../../application/use-cases/users/find-user-use-case';

@Injectable()
export class AuthService {
  constructor(
    private findUserService: FindUserUseCase,
    private jwtService: JwtService
  ) {}

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
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
