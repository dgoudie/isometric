import {
  ExerciseMuscleGroup,
  ExerciseMuscleGroups,
} from '@dgoudie/isometric-types';

import { NextApiHandler } from 'next';
import { getExercises } from '../../database/domains/exercise';
import { getUserId } from '../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'PUT': {
      const userId = await getUserId(req, res);
      if (!userId) {
        res.status(403).end();
        return;
      }
      res.end();
      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;
