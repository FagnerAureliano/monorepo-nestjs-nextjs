import { Injectable, NotFoundException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../../database/prisma.client';
import { MessagesHelper } from '../../../helpers/message.helper';
import { UpdateUserRequest } from '../../interfaces/user.interface';

@Injectable()
export class UpdateUserUseCase {
  constructor(private prisma: PrismaService) {}

  async execute({
    id,
    email,
    name,
    photo,
    password,
    newPassword,
  }: UpdateUserRequest) {
    const hasUser = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!hasUser) throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);

    const passwordMacth = await compare(password, hasUser?.password);

    if (!passwordMacth)
      throw new NotFoundException(MessagesHelper.EMAIL_OR_PASSWORD_INVALID);

    let hashPassword: string;

    if (newPassword) {
      hashPassword = await hash(newPassword, 10);
    } else {
      hashPassword = await hash(password, 10);
    }

    try {
      return this.prisma.user.update({
        where: {
          id,
        },
        data: {
          email,
          name,
          photo,
          password: hashPassword,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
