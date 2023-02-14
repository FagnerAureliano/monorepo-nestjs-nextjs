import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.client';

@Injectable()
export class ListClientsUseCase {
  constructor(private prisma: PrismaService) {}

  async execute() {
    try {
      return this.prisma.clients.findMany();
    } catch (error) {
      throw new BadRequestException(`Erro ao tentar listar. ${error.message}`);
    }
  }
}
