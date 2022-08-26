import * as Yup from 'yup';

import WorkoutPlanEditor, {
  DayWithExerciseIds,
} from '../components/WorkoutPlanEditor/WorkoutPlanEditor';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import AppBarWithAppHeaderLayout from '../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { Exercise } from '@prisma/client';
import { NextPageWithLayout } from './_app';
import RouteGuard from '../components/RouteGuard/RouteGuard';
import RouteLoader from '../components/RouteLoader/RouteLoader';
import { ScheduleWithFullDetail } from '../types';
import { SnackbarContext } from '../providers/Snackbar/Snackbar';
import classNames from 'classnames';
import styles from './WorkoutPlan.module.scss';
import useFetchWith403Redirect from '../utils/fetch-with-403-redirect';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';

const WorkoutPlanSchema = Yup.array()
  .min(1)
  .required()
  .of(
    Yup.object().shape({
      day: Yup.object().shape({
        nickname: Yup.string().required(),
      }),
      exerciseIds: Yup.array().min(1).required().of(Yup.number()),
    })
  );

const WorkoutPlan: NextPageWithLayout = () => {
  const fetcher = useFetchWith403Redirect();

  const { data: exercises, error: fetchExercisesError } = useSWR<Exercise[]>(
    '/api/exercises',
    fetcher
  );
  const { data: schedule, error: fetchScheduleError } =
    useSWR<ScheduleWithFullDetail | null>('/api/schedule', fetcher);

  const exerciseMap: Map<number, Exercise> = useMemo(
    () =>
      new Map<number, Exercise>(
        exercises?.map(({ id, ...ex }) => [id, { id, ...ex }])
      ),
    [exercises]
  );

  const mapScheduleToDays = useCallback(
    (
      schedule: ScheduleWithFullDetail | null | undefined
    ): DayWithExerciseIds[] => {
      return (
        schedule?.days.map((day) => ({
          day: {
            nickname: day.nickname,
            orderNumber: day.orderNumber,
            schedule: schedule.id,
          },
          exerciseIds: day.exercises.map((exercise) => exercise.exerciseId),
          guid: uuidv4(),
        })) ?? []
      );
    },
    []
  );

  const [days, setDays] = useState(mapScheduleToDays(schedule));

  useEffect(() => {
    setDays(mapScheduleToDays(schedule));
  }, [mapScheduleToDays, schedule]);

  const valid = useMemo(() => {
    try {
      WorkoutPlanSchema.validateSync(days, {
        strict: true,
      });
      return true;
    } catch (e) {
      return false;
    }
  }, [days]);

  const router = useRouter();

  const { openSnackbar } = useContext(SnackbarContext);

  const save = useCallback(async () => {
    const daysWithoutGuid = days.map(({ guid, ...day }) => day);
    await fetch(`/api/schedule`, {
      method: 'PUT',
      body: JSON.stringify(daysWithoutGuid),
      headers: { 'content-type': 'application/json' },
      credentials: 'same-origin',
    });
    openSnackbar('Schedule saved successfully.');
    router.push('/dashboard');
  }, [days, openSnackbar, router]);

  const [isReorderMode, setIsReorderMode] = useState(false);

  const head = useHeadWithTitle('Workout Plan');

  if (typeof exercises === 'undefined' || typeof schedule === 'undefined') {
    return <RouteLoader />;
  }

  if (fetchExercisesError) {
    throw fetchExercisesError;
  }
  if (fetchScheduleError) {
    throw fetchScheduleError;
  }

  return (
    <div className={styles.wrapper}>
      {head}
      <h1>Workout Plan</h1>
      <div className={styles.root}>
        <WorkoutPlanEditor
          scheduleId={schedule!.id}
          dayReorderModeEnabled={isReorderMode}
          days={days}
          exerciseMap={exerciseMap}
          daysChanged={setDays}
        />
        {!!days.length && (
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
  <AppBarWithAppHeaderLayout>
    <RouteGuard>{page}</RouteGuard>
  </AppBarWithAppHeaderLayout>
);

export default WorkoutPlan;
