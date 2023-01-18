import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { MessagesHelper } from '../../../helpers/message.helper';
import { validateEmail } from '../../../utils/validate-email.utils';
import { PrismaService } from '../../database/prisma.client';

type CreateUserRequest = {
  email?: string;
  name?: string;
  photo?: string | undefined;
  password: string;
};

type CreateUserResponse = any;

@Injectable()
export class CreateUserUseCase {
  constructor(private prisma: PrismaService) {}

  async execute({
    email,
    name,
    photo,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    if (!validateEmail(email)) {
      throw new BadRequestException(MessagesHelper.INVALID_EMAIL_ADDRESS);
    }

    const alreadyExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (alreadyExists) {
      throw new BadRequestException(MessagesHelper.USER_ALREADY_EXISTS);
    }

    const hashPassword = await hash(password, 10);

    let user: User;
    try {
      user = await this.prisma.user.create({
        data: {
          email,
          name,
          photo,
          password: hashPassword,
        },
      });
      return user;
    } catch (error) {
      throw new BadRequestException(`Erro ao tentar cadastrar. ${error.message}`);
    }
  }
}
