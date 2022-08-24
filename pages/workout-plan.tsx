import * as Yup from 'yup';

import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { IExercise, ISchedule, IScheduleDay } from '@dgoudie/isometric-types';
import {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';

import AppBarWithAppHeaderLayout from '../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { NextPageWithLayout } from './_app';
import { SnackbarContext } from '../providers/Snackbar/Snackbar';
import WorkoutPlanEditor from '../components/WorkoutPlanEditor/WorkoutPlanEditor';
import activeWorkoutExists from '../utils/active-workout-exists';
import classNames from 'classnames';
import { convertToPlainObject } from '../utils/normalize-bson';
import { getExercises } from '../database/domains/exercise';
import { getSchedule } from '../database/domains/schedule';
import { getUserId } from '../utils/get-user-id';
import styles from './WorkoutPlan.module.scss';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import { useRouter } from 'next/router';

const WorkoutPlanSchema = Yup.array()
  .min(1)
  .required()
  .of(
    Yup.object().shape({
      nickname: Yup.string().required(),
      exerciseIds: Yup.array().min(1).required().of(Yup.string()),
    })
  );

interface WorkoutPlanProps {
  exercises: IExercise[];
  schedule: ISchedule | null;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<WorkoutPlanProps>> {
  const userId = await getUserId(context.req, context.res);
  if (!userId) {
    return { redirect: { destination: '/', permanent: false } };
  }
  if (await activeWorkoutExists(userId)) {
    return { redirect: { destination: '/workout', permanent: false } };
  }
  const [exercises, schedule] = await Promise.all([
    getExercises(userId).then((exercises) => convertToPlainObject(exercises)),
    getSchedule(userId).then((schedule) => convertToPlainObject(schedule)),
  ]);
  return {
    props: { exercises, schedule },
  };
}

const WorkoutPlan: NextPageWithLayout<WorkoutPlanProps> = ({
  exercises,
  schedule,
}: WorkoutPlanProps) => {
  const exerciseMap: Map<string, IExercise> = useMemo(
    () =>
      new Map<string, IExercise>(
        exercises.map(({ _id, ...ex }) => [_id, { _id, ...ex }])
      ),
    [exercises]
  );

  const days = useMemo(() => schedule?.days ?? [], [schedule?.days]);

  const [workoutScheduleDays, setWorkoutScheduleDays] =
    useState<IScheduleDay[]>(days);

  useEffect(() => setWorkoutScheduleDays(days), [days, schedule]);

  const valid = useMemo(() => {
    try {
      WorkoutPlanSchema.validateSync(workoutScheduleDays, {
        strict: true,
      });
      return true;
    } catch (e) {
      return false;
    }
  }, [workoutScheduleDays]);

  const router = useRouter();

  const { openSnackbar } = useContext(SnackbarContext);

  const save = useCallback(async () => {
    await fetch(`/api/schedule`, {
      method: 'PUT',
      body: JSON.stringify({ days: workoutScheduleDays }),
      headers: { 'content-type': 'application/json' },
      credentials: 'same-origin',
    });
    openSnackbar('Schedule saved successfully.');
    router.push('/dashboard');
  }, [openSnackbar, router, workoutScheduleDays]);

  const [isReorderMode, setIsReorderMode] = useState(false);

  const head = useHeadWithTitle('Workout Plan');

  return (
    <div className={styles.wrapper}>
      {head}
      <h1>Workout Plan</h1>
      <div className={styles.root}>
        <WorkoutPlanEditor
          dayReorderModeEnabled={isReorderMode}
          days={workoutScheduleDays}
          exerciseMap={exerciseMap}
          daysChanged={setWorkoutScheduleDays}
        />
        {!!workoutScheduleDays.length && (
          <div className={styles.buttonBar}>
            <button
              onClick={() => setIsReorderMode(!isReorderMode)}
              type='button'
              className={classNames(
                'standard-button outlined',
                isReorderMode && 'highlighted'
              )}
            >
              <i
                className={`fa-solid fa-${isReorderMode ? 'check' : 'sort'}`}
              />
              {isReorderMode ? 'Done Reordering' : 'Reorder Days'}
            </button>
            <button
              disabled={!valid}
              onClick={save}
              type='button'
              className='standard-button primary'
            >
              <i className='fa-solid fa-save' />
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

WorkoutPlan.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>{page}</AppBarWithAppHeaderLayout>
);

export default WorkoutPlan;
