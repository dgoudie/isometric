import { NextApiHandler } from 'next';
import Pusher from '../../../utils/pusher';
import nextAuthOptions from '../../../utils/next-auth-options';
import { unstable_getServerSession } from 'next-auth';

const pusher = Pusher;
const handler: NextApiHandler = async (req, res) => {
  console.log('here');
  const socketId = req.body.socket_id;
  if (!socketId) {
    res.status(400).send(undefined);
    return;
  }
  const session = await unstable_getServerSession(req, res, nextAuthOptions);
  if (!session) {
    res.status(403).end();
    return;
  }
  const authResponse = pusher.authenticateUser(socketId, {
    id: session.user!.email!,
  });
  res.send(authResponse);
};

export default handler;
