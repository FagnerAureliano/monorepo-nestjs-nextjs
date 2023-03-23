import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessagesHelper } from '../../../helpers/message.helper';
import { PrismaService } from '../../database/prisma.client';

@Injectable()
export class DeleteClientUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(id: string) {
    const client = await this.prisma.clients.findFirst({
      where: { id },
    });
    if (!client) throw new NotFoundException(MessagesHelper.CLIENT_NOT_FOUND);

    try {
      return await this.prisma.clients.delete({
        where: {
          id: client.id,
        },
      });
    } catch (error) {
      throw new BadRequestException(`Erro ao tentar deletar. ${error.message}`);
    }
  }
}
