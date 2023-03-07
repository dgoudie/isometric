import { NextApiHandler } from 'next';
import { getUserId } from '../../../utils/get-user-id';

const notification: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const params = new URLSearchParams({
    timeout_in_milliseconds: req.query.timeout_in_milliseconds as string,
  });
  params.append('user_id', userId);
  if (req.method === 'POST') {
    await fetch(
      `${
        process.env.NOTIFICATION_HOST
      }/queue_notification?${params.toString()}`,
      { method: 'POST' }
    );
  } else if (req.method === 'DELETE') {
    await fetch(
      `${
        process.env.NOTIFICATION_HOST
      }/clear_notification?${params.toString()}`,
      { method: 'POST' }
    );
  }
  res.end();
};
export default notification;
