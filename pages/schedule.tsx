import AppBarWithAppHeaderLayout from '../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { NextPageWithLayout } from './_app';
import RouteGuard from '../components/RouteGuard/RouteGuard';
import RouteLoader from '../components/RouteLoader/RouteLoader';
import { ScheduleDayWithExerciseInSchedules } from '../types/ScheduleDay';
import styles from './Schedule.module.scss';
import { useCallback } from 'react';
import useFetchWith403Redirect from '../utils/fetch-with-403-redirect';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const WorkoutPlan: NextPageWithLayout = () => {
  const fetcher = useFetchWith403Redirect();

  const { data: days, error: fetchScheduleError } = useSWR<
    ScheduleDayWithExerciseInSchedules[]
  >('/api/schedule/days', fetcher);

  const head = useHeadWithTitle(`Schedule`);

  const router = useRouter();

  const createDay = useCallback(async () => {
    const newDayId = await fetch(`/api/schedule/day`, { method: 'PUT' }).then(
      (res) => res.text()
    );
    router.replace(`/schedule/${newDayId}`);
  }, [router]);

  if (!days) {
    return <RouteLoader />;
  }

  if (!days.length) {
    return (
      <>
        <h1>Schedule Builder</h1>
        <div className={styles.noDays}>
          {head}
          <span>
            Here, you can build a workout schedule. Start by adding a day, and
            adding some exercises.
          </span>
          <button className={'standard-button primary'} onClick={createDay}>
            <i className='fa-solid fa-plus'></i>
            Add Day
          </button>
        </div>
      </>
    );
  }

  return <></>;
};

WorkoutPlan.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>
    <RouteGuard>{page}</RouteGuard>
  </AppBarWithAppHeaderLayout>
);

export default WorkoutPlan;
