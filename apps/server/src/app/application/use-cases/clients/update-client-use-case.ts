import { Injectable } from '@nestjs/common';
import { Clients } from '@prisma/client';
import { PrismaService } from '../../database/prisma.client';

@Injectable()
export class UpdateClientUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(data: Clients) {
    try {
      return this.prisma.clients.update({
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
