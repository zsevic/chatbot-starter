import { Injectable } from '@nestjs/common';
import { StateService } from 'modules/state/state.service';
import { UserService } from 'modules/user/user.service';
import { ResolverService } from './resolver.service';

@Injectable()
export class AttachmentService {
  constructor(
    private readonly resolverService: ResolverService,
    private readonly stateService: StateService,
    private readonly userService: UserService,
  ) {}

  handleAttachment = async (message: any, userId: number) => {
    const { type } = message.attachments[0];
    const locale = await this.userService.getLocale(userId);

    const state = await this.resolverService.getCurrentState(userId);
    if (!state || !state.current_state || type !== 'location') {
      return this.resolverService.getDefaultResponse(locale);
    }

    await this.stateService.resetState(userId);
    return this.resolverService.getDefaultResponse(locale);
  };
}
