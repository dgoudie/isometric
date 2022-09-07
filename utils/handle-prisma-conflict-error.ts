import { NextApiResponse } from 'next';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';

export function handlePrismaConflictError(error: any, res: NextApiResponse) {
  if (error instanceof PrismaClientUnknownRequestError) {
    if (error.message.includes('E40001')) {
      res.status(409).end();
      return true;
    }
  }
  return false;
}
