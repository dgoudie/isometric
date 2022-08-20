import { IncomingMessage } from 'http';

export const getUserId = (req: IncomingMessage) => {
  let userId: string | undefined;
  if (process.env.NODE_ENV === 'development') {
    userId = process.env.USER_ID;
    if (!userId) {
      throw new Error('process.env.USER_ID not populated');
    }
  } else {
    userId = req.headers['x-forwarded-user'] as string;
  }
  return userId;
};
