const handler = async () => {
  return fetch(`${process.env.NOTIFICATION_HOST}/vapid_public_key`);
};

export const config = {
  runtime: 'edge',
};

export default handler;
