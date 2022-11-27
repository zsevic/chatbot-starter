import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public getUser = async (chatId: string): Promise<User> =>
    this.userRepository.getUser(chatId);

  public registerUser = async (userDto: CreateUserDto): Promise<User> =>
    this.userRepository.registerUser(userDto);

  public validateUser = async (chatId: string): Promise<User> =>
    this.userRepository.validateUser(chatId);
}
