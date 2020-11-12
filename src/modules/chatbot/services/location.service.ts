import { Injectable } from '@nestjs/common';
import { MessengerContext, MessengerTypes } from 'bottender';
import { UserService } from 'modules/user/user.service';
import { ResolverService } from './resolver.service';

@Injectable()
export class LocationService {
  constructor(
    private readonly resolverService: ResolverService,
    private readonly userService: UserService,
  ) {}

  handleLocation = async (
    context: MessengerContext,
  ): Promise<MessengerTypes.TextMessage> => {
    const locale = await this.userService.getLocale({
      [`${context.platform}_id`]: context._session.user.id,
    });

    if (!context.state.current_state) {
      return this.resolverService.getDefaultResponse(locale);
    }

    context.resetState();
    return this.resolverService.getDefaultResponse(locale);
  };
}
