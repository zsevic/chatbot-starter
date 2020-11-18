import { MessengerContext } from 'bottender';
import { UserOptions } from 'modules/user/user.types';

export const getUserOptions = (context: MessengerContext): UserOptions => {
  const {
    platform,
    _session: {
      user: { id: userId },
    },
  } = context;
  return {
    [`${platform}_id`]: userId,
  };
};

export const isEnv = (environment: string): boolean =>
  process.env.NODE_ENV === environment;
