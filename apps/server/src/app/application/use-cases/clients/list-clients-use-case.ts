import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.client';

@Injectable()
export class ListClientsUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(req) {
    console.log(req.query);

    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.size) || 5;
    const offset = (pageNumber - 1) * pageSize;

    try {
      const [data, total] = await Promise.all([
        this.prisma.clients.findMany({
          skip: offset,
          take: pageSize,
          orderBy: {
            name: 'asc',
          },
          include: {
            address: true,
          },
        }),
        this.prisma.clients.count(),
      ]);

      return { data, total };
    } catch (error) {
      throw new BadRequestException(`Erro ao tentar listar. ${error.message}`);
    }
  }
}
