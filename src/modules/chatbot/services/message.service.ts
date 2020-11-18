import { Injectable } from '@nestjs/common';
import { MessengerContext, MessengerTypes } from 'bottender';
import { getUserOptions } from 'modules/chatbot/chatbot.utils';
import { UserService } from 'modules/user/user.service';
import { ResponseService } from './response.service';
import { ValidationService } from './validation.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly responseService: ResponseService,
    private readonly userService: UserService,
    private readonly validationService: ValidationService,
  ) {}

  handleMessage = async (
    context: MessengerContext,
  ): Promise<MessengerTypes.TextMessage> => {
    const userOptions = getUserOptions(context);
    const locale = await this.userService.getLocale(userOptions);

    const validationResponse = await this.validationService.validateMessage(
      context,
      locale,
    );
    if (validationResponse) return validationResponse;

    return this.responseService.getDefaultResponse(locale);
  };
}
