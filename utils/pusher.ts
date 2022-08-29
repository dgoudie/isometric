import Pusher from 'pusher';

let pusherInternal: Pusher | undefined = undefined;

const getPusher = () => {
  if (!pusherInternal) {
    pusherInternal = new Pusher({
      appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      useTLS: true,
    });
  }
  return pusherInternal;
};

export default getPusher;
