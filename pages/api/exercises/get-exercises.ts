import Exercise from '../../../mongoose/exercise/model';
import { IExercise } from '../../../mongoose/exercise/interface';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'bson';
import { apiRouteWithUserId } from '../../../utils/with-user-id';

type Data = (IExercise & {
    _id: string | ObjectId;
})[];

const handler = apiRouteWithUserId<Data>(async (req, res, userId) => {
    const exercises = await Exercise.find({ userId }).sort({ name: 1 }).exec();
    res.status(200).json(exercises);
});

export default handler;
