import { NextApiHandler } from 'next';
import Pusher from '../../../utils/pusher';
import { getUserId } from '../../../utils/get-user-id';

const pusher = Pusher;
const handler: NextApiHandler = async (req, res) => {
  console.log('here');
  const socketId = req.body.socket_id;
  if (!socketId) {
    res.status(400).send(undefined);
    return;
  }
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const authResponse = pusher.authenticateUser(socketId, {
    id: userId,
  });
  res.send(authResponse);
};

export default handler;
