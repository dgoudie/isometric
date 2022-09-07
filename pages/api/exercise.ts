import { NextApiHandler } from 'next';
import { PrismaClientValidationError } from '@prisma/client/runtime';
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
  try {
    const result = await saveExercise(userId, id, {
      name,
      primaryMuscleGroup,
      secondaryMuscleGroups,
      exerciseType,
      setCount,
      minimumRecommendedRepetitions,
      maximumRecommendedRepetitions,
      timePerSetInSeconds,
    });
    res.send({
      id: result.id,
      name: result.name,
    });
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      res.status(400).end();
      return;
    } else {
      throw e;
    }
  }
};
export default handler;
