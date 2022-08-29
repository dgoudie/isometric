import getPusher from './pusher';

export default async function broadcastApiMutations(
  userId: string,
  apis: string[]
) {
  try {
    return await getPusher().sendToUser(userId, 'mutate_api', {
      apis,
    });
  } catch (error) {
    return console.error(`An error occurred broadcasting API mutations`, error);
  }
}
