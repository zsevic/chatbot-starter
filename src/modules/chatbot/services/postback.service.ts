import { parse } from 'querystring';
import { Injectable } from '@nestjs/common';
import { MessengerContext, MessengerTypes } from 'bottender';
import { getUserOptions } from 'common/utils';
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
    const userOptions = getUserOptions(context);
    const locale = await this.userService.getLocale(userOptions);

    const { type } = parse(context.event.postback.payload);
    context.resetState();

    switch (type) {
      default:
        return this.resolverService.getDefaultResponse(locale);
    }
  };
}
