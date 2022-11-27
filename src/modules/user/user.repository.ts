import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public getUser = async (chatId: string): Promise<User> => {
    const user = await this.userModel.findOne({ chatId });
    if (!user) throw new Error("User doesn't exist");

    return user;
  };

  public registerUser = async (userDto: CreateUserDto): Promise<User> => {
    const user = await this.userModel.findOne({ chatId: userDto.chatId });
    if (!user) {
      const newUser = new this.userModel(userDto);
      return newUser.save();
    }
    return user;
  };

  public validateUser = async (chatId: string): Promise<User> => {
    const user = await this.userModel.findOne({ chatId });
    if (!user) return;

    return user;
  };
}
