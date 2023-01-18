import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MessagesHelper } from '../../../helpers/message.helper';
import { validateEmail } from '../../../utils/validate-email.utils';
import { PrismaService } from '../../database/prisma.client';

@Injectable()
export class FindUserUseCase {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    if (!validateEmail(email))
      throw new UnauthorizedException(MessagesHelper.INVALID_EMAIL_ADDRESS);
    try {
      return this.prisma.user.findUniqueOrThrow({
        where: { email },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string) {
    try {
      return this.prisma.user.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
