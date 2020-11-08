import { Injectable, Logger } from '@nestjs/common';
import { State } from 'modules/state/state.dto';
import { StateService } from 'modules/state/state.service';
import { User } from 'modules/user/user.dto';
import { UserService } from 'modules/user/user.service';
import { ResponseService } from './response.service';

@Injectable()
export class ResolverService {
  private readonly logger = new Logger(ResolverService.name);

  constructor(
    private readonly responseService: ResponseService,
    private readonly stateService: StateService,
    private readonly userService: UserService,
  ) {}

  getAboutMeResponse = async (userId: number) => {
    const { locale } = await this.userService.getUser(userId);
    return this.responseService.getAboutMeResponse(locale);
  };

  getCurrentState = async (userId: number): Promise<State> =>
    this.stateService.getCurrentState(userId);

  getDefaultResponse = async (locale: string) =>
    this.responseService.getDefaultResponse(locale);

  registerUser = async (userDto: User) => {
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

  resetState = async (userId: number): Promise<State> =>
    this.stateService.resetState(userId);
}
