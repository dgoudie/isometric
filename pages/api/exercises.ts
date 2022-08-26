import { ExerciseMuscleGroup } from '@prisma/client';
import { NextApiHandler } from 'next';
import { getExercises } from '../../database/domains/exercise';
import { getUserId } from '../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      let {
        search,
        muscleGroup,
        page,
        ids,
        onlyPerformed: onlyPerformedFromQuery,
        onlyNotPerformed: onlyNotPerformedFromQuery,
      } = req.query;
      const onlyPerformed = !!onlyPerformedFromQuery;
      const onlyNotPerformed = !!onlyNotPerformedFromQuery;
      if (typeof search !== 'undefined') {
        if (typeof search !== 'string') {
          res.status(400).end();
          return;
        }
      }
      if (typeof muscleGroup !== 'undefined') {
        if (
          typeof muscleGroup !== 'string' ||
          !Object.keys(ExerciseMuscleGroup).includes(
            muscleGroup as ExerciseMuscleGroup
          )
        ) {
          res.status(400).end();
          return;
        }
      }
      if (typeof page !== 'undefined') {
        if (typeof page !== 'string' || isNaN(parseInt(page))) {
          res.status(400).end();
          return;
        }
      }
      let idsAsNumbers: number[] | undefined;
      if (typeof ids !== 'undefined') {
        if (typeof ids === 'string') {
          ids = [ids];
        }
        ids = ids as string[];
        if (
          !ids.every((id) => typeof id === 'string' && !isNaN(parseInt(id)))
        ) {
          res.status(400).end();
          return;
        }
        idsAsNumbers = ids.map(parseInt);
      }
      const userId = await getUserId(req, res);
      if (!userId) {
        res.status(403).end();
        return;
      }
      const exercises = await getExercises(
        userId,
        {
          name: { search },
          muscleGroup: muscleGroup as ExerciseMuscleGroup,
          ids: idsAsNumbers,
          onlyNotPerformed,
          onlyPerformed,
        },
        !!page ? parseInt(page) : undefined
      );
      res.send(exercises);
      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;
