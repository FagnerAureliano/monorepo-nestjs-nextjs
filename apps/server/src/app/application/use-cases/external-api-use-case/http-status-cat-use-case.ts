import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { bufferToBase64 } from '../../../utils/buffer-to-base64.utils';

@Injectable()
export class HttpStatusCatUseCase {
  async execute(code: number) {
    try {
      const response = await axios.get(`https://http.cat/${code}`, {
        responseType: 'arraybuffer',
      });

      return bufferToBase64(response);
    } catch (error) {
      const response = await axios.get(`https://http.cat/404`, {
        responseType: 'arraybuffer',
      });

      return bufferToBase64(response);
    }
  }
}
