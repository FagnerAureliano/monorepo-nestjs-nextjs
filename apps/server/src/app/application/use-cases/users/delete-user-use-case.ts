import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessagesHelper } from '../../../helpers/message.helper';
import { PrismaService } from '../../database/prisma.client';

@Injectable()
export class DeleteUserUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);

    try {
      this.prisma.user.delete({
        where: { id },
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Usuário excluído com sucesso',
      };
    } catch (error) {
      throw new BadRequestException(`Erro ao tentar deletar. ${error.message}`);
    }
  }
}
