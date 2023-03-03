import { Injectable } from '@nestjs/common';
import { Clients } from '@prisma/client';
import { PrismaService } from '../../database/prisma.client';

export type ClientProps = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  address: {
    zipcode: string;
    city: string;
    street: string;
    number: string;
  };
};

@Injectable()
export class UpdateClientUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(data: ClientProps) {
    console.log("**************" + JSON.stringify(data));
    const { id, name, email, cpf, phone, address } = data;
    const client = await this.prisma.clients.findUnique({
      where: { id },
      include: { address: true },
    });
    try {
      const updatedClient = await this.prisma.clients.update({
        where: { id },
        data: {
          name: name || client.name,
          email: email || client.email,
          cpf: cpf || client.cpf,
          phone: phone || client.phone,
          address: {
            update: {
              street: address.street || client.address.street,
              number: address.number || client.address.number,
              city: address.city || client.address.city,
              zipcode: address.zipcode || client.address.zipcode,
            },
          },
        },
      });

      return updatedClient;
    } catch (error) {
      throw new Error(error);
    }
  }
}
