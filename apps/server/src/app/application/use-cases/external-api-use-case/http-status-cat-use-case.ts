import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HttpStatusCatUseCase {
  async execute(code: number) {
    if (code) {
        console.log('status code: '+code);
        
      try {
        const  data  = await axios.get(`https://http.cat/${code}`);
        console.log(data);
        
        return data;
      } catch (error) {
        throw new BadRequestException(
          `Erro ao tentar buscar. ${error.message}`
        );
      }
    }
    const { data } = await axios.get(`https://http.cat/404`);

        return data.results;
  }
}
