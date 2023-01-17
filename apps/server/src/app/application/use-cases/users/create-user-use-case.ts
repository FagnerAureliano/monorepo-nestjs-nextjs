import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { MessagesHelper } from '../../../helpers/message.helper';
import { UserRepository } from '../../repositories/user.repository';

type CreateUserRequest = {
  email: string;
  username?: string;
  name?: string;
  photo?: string | undefined;
  password: string;
};

type CreateUserResponse = any;

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    name,
    username,
    photo,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const alreadyExists = await this.userRepository.findByEmail(email);

    if (alreadyExists) {
      throw new BadRequestException(MessagesHelper.USER_ALREADY_EXISTENT);
    }

    const hashPassword = await hash(password, 10);

    const user = await this.userRepository.create({
      email,
      name,
      username,
      photo,
      password: hashPassword,
    });

    return user;
  }
}
