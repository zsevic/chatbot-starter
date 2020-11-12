import { Injectable, Logger } from '@nestjs/common';
import { MessengerTypes } from 'bottender';
import { ButtonTemplate } from 'modules/chatbot/chatbot.types';
import { User } from 'modules/user/user.dto';
import { UserService } from 'modules/user/user.service';
import { ResponseService } from './response.service';

@Injectable()
export class ResolverService {
  private readonly logger = new Logger(ResolverService.name);

  constructor(
    private readonly responseService: ResponseService,
    private readonly userService: UserService,
  ) {}

  getAboutMeResponse = async (userId: number): Promise<string> => {
    const { locale } = await this.userService.getUser(userId);
    return this.responseService.getAboutMeResponse(locale);
  };

  getDefaultResponse = (locale: string): MessengerTypes.TextMessage =>
    this.responseService.getDefaultResponse(locale);

  registerUser = async (
    userDto: User,
  ): Promise<MessengerTypes.TextMessage | ButtonTemplate> => {
    try {
      await this.userService.registerUser(userDto);
      return this.responseService.getRegisterUserSuccessResponse(
        userDto.locale,
      );
    } catch (err) {
      this.logger.error(err);
      return this.responseService.getRegisterUserFailureResponse(
        userDto.locale,
      );
    }
  };
}
