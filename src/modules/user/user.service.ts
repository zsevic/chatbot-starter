import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.schema';
import { UserOptions } from './user.types';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getLocale = async (options: UserOptions): Promise<string> =>
    this.userRepository.getLocale(options);

  getUser = async (options: UserOptions): Promise<User> =>
    this.userRepository.getUser(options);

  registerUser = async (
    userDto: CreateUserDto,
    userOptions: UserOptions,
  ): Promise<User> => this.userRepository.registerUser(userDto, userOptions);

  validateUser = async (options: UserOptions): Promise<User> =>
    this.userRepository.validateUser(options);
}
