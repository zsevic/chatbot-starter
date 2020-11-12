import { Injectable, Logger } from '@nestjs/common';
import { MessengerContext, MessengerTypes } from 'bottender';
import { ButtonTemplate } from 'modules/chatbot/chatbot.types';
import { CreateUserDto } from 'modules/user/create-user.dto';
import { UserService } from 'modules/user/user.service';
import { ResponseService } from './response.service';

@Injectable()
export class ResolverService {
  private readonly logger = new Logger(ResolverService.name);

  constructor(
    private readonly responseService: ResponseService,
    private readonly userService: UserService,
  ) {}

  getAboutMeResponse = async (context: MessengerContext): Promise<string> => {
    const locale = await this.userService.getLocale({
      [`${context.platform}_id`]: context._session.user.id,
    });
    return this.responseService.getAboutMeResponse(locale);
  };

  getDefaultResponse = (locale: string): MessengerTypes.TextMessage =>
    this.responseService.getDefaultResponse(locale);

  registerUser = async (
    userDto: CreateUserDto,
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
