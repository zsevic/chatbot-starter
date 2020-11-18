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
