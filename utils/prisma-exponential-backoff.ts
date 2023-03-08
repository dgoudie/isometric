import { Prisma } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';

export default async function withExponentialBackoffRetry<T>(
  queryProvider: () => Prisma.PrismaPromise<T>,
  maxRetries = 3
): Promise<T> {
  let counter = 0;
  let error: Error | undefined;
  while (true) {
    counter += 1;
    if (counter === maxRetries) {
      throw error;
    }
    try {
      const query = queryProvider();
      const result = await query;
      return result;
    } catch (e) {
      if (
        e instanceof PrismaClientUnknownRequestError &&
        e.message.includes('E40001')
      ) {
        console.warn(`Retrying transaction... (E40001)`);
        error = e;
        const sleepMs = 2 * counter * 100 + Math.floor(Math.random() * 100) + 1;
        await new Promise((r) => setTimeout(r, sleepMs));
      } else {
        throw e;
      }
    }
  }
}
