import { Injectable } from '@nestjs/common';
import { MessengerTypes } from 'bottender';
import { UserService } from 'modules/user/user.service';
import { ResolverService } from './resolver.service';
import { ResponseService } from './response.service';
import { ValidationService } from './validation.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly responseService: ResponseService,
    private readonly resolverService: ResolverService,
    private readonly userService: UserService,
    private readonly validationService: ValidationService,
  ) {}

  handleMessage = async (
    message: any,
    userId: number,
  ): Promise<MessengerTypes.TextMessage> => {
    const state = await this.resolverService.getCurrentState(userId);
    const locale = await this.userService.getLocale(userId);

    const validationResponse = await this.validationService.validateMessage(
      message,
      state,
      locale,
    );
    if (validationResponse) return validationResponse;

    return this.responseService.getDefaultResponse(locale);
  };
}
