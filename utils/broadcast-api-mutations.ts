import getPusher from './pusher';

export default function broadcastApiMutations(userId: string, apis: string[]) {
  getPusher()
    .sendToUser(userId, 'mutate_api', {
      apis,
    })
    .catch((error) =>
      console.error(`An error occurred broadcasting API mutations`, error)
    );
}
