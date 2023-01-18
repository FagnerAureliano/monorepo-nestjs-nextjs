import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../database/prisma.client';

@Injectable()
export class UpdateUserUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(data: User) {
    try {
      return this.prisma.user.update({
        where: {
          id: data.id,
        },
        data,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
