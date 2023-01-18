import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MessagesHelper } from '../../../helpers/message.helper';
import { validateEmail } from '../../../utils/validate-email.utils';
import { PrismaService } from '../../database/prisma.client';

@Injectable()
export class FindUserUseCase {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);
    return user;
  }

  async findByEmail(email: string) {
    if (!validateEmail(email))
      throw new UnauthorizedException(MessagesHelper.INVALID_EMAIL_ADDRESS);
    try {
      return this.prisma.user.findUniqueOrThrow({
        where: { email },
      });
    } catch (error) {
      throw new BadRequestException(
        `Erro ao tentar encontrar por e-mail. ${error.message}`
      );
    }
  }
}
