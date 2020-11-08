import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { StateRepository } from 'modules/state/state.repository';
import { User } from './user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly stateRepository: StateRepository,
    private readonly userRepository: UserRepository,
  ) {}

  getLocale = async (userId: number): Promise<string> => {
    const user = await this.userRepository.findOne(userId, {
      select: ['locale'],
    });
    if (!user) throw new Error("User doesn't exist");

    return user.locale;
  };

  getUser = async (id: number): Promise<User> =>
    this.userRepository.getUser(id);

  @Transactional()
  async registerUser(user: User): Promise<void> {
    await this.userRepository.registerUser(user);
    await this.stateRepository.initializeState(user.id);
  }

  validateUser = async (id: number): Promise<User> =>
    this.userRepository.validateUser(id);
}
