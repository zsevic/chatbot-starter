import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.dto';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async getUser(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new Error("User doesn't exist");

    return user;
  }

  registerUser = async (userDto: User): Promise<User> => {
    const user = await this.findOne(userDto.id);
    if (!user) return this.save(userDto);

    return user;
  };

  async validateUser(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) return;

    return user;
  }
}
