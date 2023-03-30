import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../database/prisma.client';
import { MessagesHelper } from '../../../helpers/message.helper';
import { compare, hash } from 'bcrypt';

type UpdateUserRequest = {
  id: string;
  email?: string;
  name?: string;
  photo?: string | undefined;
  password?: string;
  newPassword?: string | undefined;
};

@Injectable()
export class UpdateUserUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(data: UpdateUserRequest) {
    const hasUser = await this.prisma.user.findFirst({
      where: {
        id: data.id,
      },
    });
    if (!hasUser) throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);

    const passwordMacth = await compare(data.password, hasUser?.password);

    if (!passwordMacth)
      throw new NotFoundException(MessagesHelper.EMAIL_OR_PASSWORD_INVALID);

    let hashPassword: string;

    if (data.newPassword) {
      hashPassword = await hash(data.newPassword, 10);
    } else {
      hashPassword = await hash(data.password, 10);
    }

    try {
      return this.prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          ...data,
          password: hashPassword,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
