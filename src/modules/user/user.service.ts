import { Injectable } from '@nestjs/common';
import { User } from './user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getLocale = async (userId: number): Promise<string> => {
    const user = await this.userRepository.findOne(userId, {
      select: ['locale'],
    });
    if (!user) throw new Error("User doesn't exist");

    return user.locale;
  };

  getUser = async (id: number): Promise<User> =>
    this.userRepository.getUser(id);

  registerUser = async (user: User): Promise<User> =>
    this.userRepository.registerUser(user);

  validateUser = async (id: number): Promise<User> =>
    this.userRepository.validateUser(id);
}
