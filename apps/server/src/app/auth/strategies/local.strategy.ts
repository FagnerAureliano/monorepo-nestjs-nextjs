import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { MessagesHelper } from '../../helpers/message.helper';
import { AuthService } from '../services/auth.service';


export class LocalStategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usenameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user)
      throw new UnauthorizedException(MessagesHelper.EMAIL_OR_PASSWORD_INVALID);
    return user;
  }
}
