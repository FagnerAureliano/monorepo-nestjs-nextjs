import { BadRequestException, Injectable } from '@nestjs/common';
import { Clients } from '@prisma/client';
import { hash } from 'bcrypt';
import { MessagesHelper } from '../../../helpers/message.helper';
import { validateEmail } from '../../../utils/validate-email.utils';
import { PrismaService } from '../../database/prisma.client';

type ClientRequest = {
  email: string;
  name: string;
  phone: string;
  cpf: string;
  address?: Address;
};
type Address = {
  street: string;
  number: string;
  city: string;
  zipcode: string;
};
type ClientResponse = {
  email: string;
  name: string;
  phone: string;
  cpf: string;
  address?: Address;
};

@Injectable()
export class CreateClientUseCase {
  constructor(private prisma: PrismaService) {}

  async execute({
    email,
    name,
    phone,
    cpf,
    address: { street, number, city, zipcode },
  }: ClientRequest): Promise<ClientResponse> {
    if (!validateEmail(email)) {
      throw new BadRequestException(MessagesHelper.INVALID_EMAIL_ADDRESS);
    }

    const alreadyExists = await this.prisma.clients.findUnique({
      where: {
        email,
      },
    });

    if (alreadyExists) {
      throw new BadRequestException(MessagesHelper.USER_ALREADY_EXISTS);
    }

    let client: Clients;
    try {
      client = await this.prisma.clients.create({
        data: {
          email,
          name,
          phone,
          cpf,
          address: {
            create: {
              street,
              number,
              city,
              zipcode,
            },
          },
        },
      });
      return client;
    } catch (error) {
      throw new BadRequestException(
        `Erro ao tentar cadastrar. ${error.message}`
      );
    }
  }
}
