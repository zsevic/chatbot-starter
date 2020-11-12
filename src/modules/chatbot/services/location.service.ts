import { Injectable } from '@nestjs/common';
import { Location } from 'modules/chatbot/chatbot.types';
import { StateService } from 'modules/state/state.service';
import { UserService } from 'modules/user/user.service';
import { ResolverService } from './resolver.service';

@Injectable()
export class LocationService {
  constructor(
    private readonly resolverService: ResolverService,
    private readonly stateService: StateService,
    private readonly userService: UserService,
  ) {}

  handleLocation = async (_: Location, userId: number) => {
    const locale = await this.userService.getLocale(userId);
    const state = await this.resolverService.getCurrentState(userId);

    if (!state || !state.current_state) {
      return this.resolverService.getDefaultResponse(locale);
    }

    await this.stateService.resetState(userId);
    return this.resolverService.getDefaultResponse(locale);
  };
}
