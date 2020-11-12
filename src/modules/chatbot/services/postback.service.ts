import { parse } from 'querystring';
import { Injectable } from '@nestjs/common';
import { MessengerContext, MessengerTypes } from 'bottender';
import { POSTBACK_TYPE } from 'modules/chatbot/chatbot.constants';
import { UserService } from 'modules/user/user.service';
import { ResolverService } from './resolver.service';

@Injectable()
export class PostbackService {
  constructor(
    private readonly resolverService: ResolverService,
    private readonly userService: UserService,
  ) {}

  handlePostback = async (
    context: MessengerContext,
  ): Promise<MessengerTypes.TextMessage> => {
    const locale = await this.userService.getLocale({
      [`${context.platform}_id`]: context._session.user.id,
    });

    const { type } = parse(context.event.postback.payload);
    context.resetState();

    switch (type) {
      case POSTBACK_TYPE:
        return this.resolverService.getDefaultResponse(locale);
      default:
        return;
    }
  };
}
