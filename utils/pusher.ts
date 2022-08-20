import _Pusher from 'pusher';

let pusherInternal: _Pusher | undefined = undefined;

const Pusher =
  pusherInternal ||
  new _Pusher({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    useTLS: true,
  });

export default Pusher;
