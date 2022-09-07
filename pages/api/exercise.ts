import { Exercise } from '@prisma/client';
import { NextApiHandler } from 'next';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import broadcastApiMutations from '../../utils/broadcast-api-mutations';
import { getUserId } from '../../utils/get-user-id';
import { saveExercise } from '../../database/domains/exercise';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const {
    id,
    name,
    primaryMuscleGroup,
    secondaryMuscleGroups,
    exerciseType,
    setCount,
    minimumRecommendedRepetitions,
    maximumRecommendedRepetitions,
    timePerSetInSeconds,
  } = req.body;
  let result: Exercise;
  try {
    result = await saveExercise(userId, id, {
      name,
      primaryMuscleGroup,
      secondaryMuscleGroups,
      exerciseType,
      setCount,
      minimumRecommendedRepetitions,
      maximumRecommendedRepetitions,
      timePerSetInSeconds,
    });
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      res.status(400).end();
      return;
    } else {
      throw e;
    }
  }
  await broadcastApiMutations(userId, [
    '/api/exercises',
    `/api/exercises/${encodeURIComponent(name)}`,
    `/api/exercises/${encodeURIComponent(result.name)}`,
  ]);
  res.send({
    id: result.id,
    name: result.name,
  });
};
export default handler;
