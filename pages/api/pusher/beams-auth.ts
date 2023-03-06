import { NextApiHandler } from 'next';
import PushNotifications from '@pusher/push-notifications-server';
import { getUserId } from '../../../utils/get-user-id';

const beamsClient = new PushNotifications({
  instanceId: process.env.PUSHER_BEAMS_INSTANCE_ID!,
  secretKey: process.env.PUSHER_BEAMS_SECRET!,
});

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const userIDInQueryParam = req.query['user_id'];
  if (userId != userIDInQueryParam) {
    res.status(401).send('Inconsistent request');
  } else {
    const beamsToken = beamsClient.generateToken(userId);
    res.send(JSON.stringify(beamsToken));
  }
};

export default handler;
