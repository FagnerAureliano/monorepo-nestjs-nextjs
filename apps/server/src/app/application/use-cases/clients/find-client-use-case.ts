import { Injectable, NotFoundException } from '@nestjs/common';
import { MessagesHelper } from '../../../helpers/message.helper';
import { PrismaService } from '../../database/prisma.client';

@Injectable()
export class FindClientUseCase {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const client = await this.prisma.clients.findUnique({
      where: { id },
    });
    if (!client) throw new NotFoundException(MessagesHelper.CLIENT_NOT_FOUND);
    return client;
  }
}
