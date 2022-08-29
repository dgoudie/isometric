import AppBarWithAppHeaderLayout from '../../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import Link from 'next/link';
import { NextPageWithLayout } from '../_app';
import RouteGuard from '../../components/RouteGuard/RouteGuard';
import RouteLoader from '../../components/RouteLoader/RouteLoader';
import { ScheduledWorkoutWithExerciseInSchedulesWithExercise } from '../../types/ScheduledWorkout';
import classNames from 'classnames';
import styles from './ScheduleWorkout.module.scss';
import useFetchWith403Redirect from '../../utils/fetch-with-403-redirect';
import { useHeadWithTitle } from '../../utils/use-head-with-title';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const ScheduleWorkout: NextPageWithLayout = () => {
  const router = useRouter();

  const scheduledWorkoutId = router.query.id as string;

  const fetcher = useFetchWith403Redirect();

  const { data, error } =
    useSWR<ScheduledWorkoutWithExerciseInSchedulesWithExercise>(
      router.isReady ? `/api/schedule/workout/${scheduledWorkoutId}` : null,
      fetcher
    );

  const head = useHeadWithTitle(`Edit Schedule`);

  if (!data)
    return (
      <>
        {head}
        <RouteLoader />
      </>
    );

  return (
    <div className={styles.root}>
      {head}
      <>
        <h1>
          Edit Schedule <i className='fa-solid fa-chevron-right'></i> Day{' '}
          {data.orderNumber + 1}
        </h1>
        <div className={styles.exercises}></div>
        <div className={classNames(styles.actions, 'fade-in')}>
          <div className={styles.autoSaveTip}>
            <i className='fa-solid fa-circle-info'></i>
            Changes saved automatically
          </div>
          <Link href={`/schedule`}>
            <a className='standard-button primary slim'>
              <i className='fa-solid fa-check'></i>
              Done
            </a>
          </Link>
        </div>
      </>
    </div>
  );
};

ScheduleWorkout.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>
    <RouteGuard>{page}</RouteGuard>
  </AppBarWithAppHeaderLayout>
);

export default ScheduleWorkout;
