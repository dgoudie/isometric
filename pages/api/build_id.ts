import { NextApiHandler } from 'next';

const buildId: NextApiHandler = (req, res) => {
  res.status(200).send({ buildId: process.env.VERCEL_GIT_COMMIT_SHA });
};
export default buildId;
