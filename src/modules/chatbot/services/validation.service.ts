import { Injectable } from '@nestjs/common';
import { MessengerContext, MessengerTypes } from 'bottender';
import { ResponseService } from './response.service';

@Injectable()
export class ValidationService {
  constructor(private readonly responseService: ResponseService) {}

  validateMessage = (
    context: MessengerContext,
    locale: string,
  ): MessengerTypes.TextMessage => {
    if (!context.state.current_state) {
      return this.responseService.getDefaultResponse(locale);
    }
  };
}
