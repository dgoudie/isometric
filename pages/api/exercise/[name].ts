import {
  ExerciseGraphListType,
  getExerciseGraphData,
} from '../../../database/utils/exercise-graph';
import {
  ExerciseWithPersonalBestAndLastPerformed,
  getExerciseByName,
} from '../../../database/domains/exercise';

import { NextApiHandler } from 'next';
import { getUserId } from '../../../utils/get-user-id';
import prisma from '../../../database/prisma';

export type ExerciseWithGraphData = ExerciseWithPersonalBestAndLastPerformed & {
  graphData: ExerciseGraphListType[];
};

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const { name } = req.query;
      if (typeof name !== 'string') {
        res.status(400).end();
        return;
      }
      const userId = await getUserId(req, res);
      if (!userId) {
        res.status(403).end();
        return;
      }
      const exercise = await getExerciseByName(userId, name);
      if (!exercise) {
        res.status(404).end();
        return;
      }
      const graphData = await getExerciseGraphData(userId, exercise.id, prisma);
      const exerciseWithGraphData: ExerciseWithGraphData = {
        ...exercise,
        graphData,
      };
      res.send(exerciseWithGraphData);
      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;
