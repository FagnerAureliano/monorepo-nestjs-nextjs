import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RandomUsersUseCase {
  constructor() {}

  async execute() {
    try {
      const { data } = await axios.get(
        'https://randomuser.me/api/?results=10&inc=name,email,login,dob,picture,location'
      );

      return data.results;
    } catch (error) {
      throw new BadRequestException(`Erro ao tentar listar. ${error.message}`);
    }
  }
}