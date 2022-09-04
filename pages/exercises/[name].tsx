import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { addYears, format, isBefore } from 'date-fns';
import { useContext, useEffect, useMemo } from 'react';

import AppBarWithAppHeaderLayout from '../../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { ExerciseWithGraphData } from '../api/exercise/[name]';
import { NextPageWithLayout } from '../_app';
import RouteGuard from '../../components/RouteGuard/RouteGuard';
import RouteLoader from '../../components/RouteLoader/RouteLoader';
import { SnackbarContext } from '../../providers/Snackbar/Snackbar';
import styles from './Exercise.module.scss';
import { useFetchJSONWith403Redirect } from '../../utils/fetch-with-403-redirect';
import { useHeadWithTitle } from '../../utils/use-head-with-title';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const Exercise: NextPageWithLayout = () => {
  const router = useRouter();

  const exerciseName = router.query.name as string;

  const fetcher = useFetchJSONWith403Redirect();

  const { openSnackbar } = useContext(SnackbarContext);

  const { data, error } = useSWR<ExerciseWithGraphData>(
    router.isReady ? `/api/exercise/${exerciseName}` : null,
    fetcher
  );

  useEffect(() => {
    if (error?.status === 404) {
      openSnackbar(`This exercise no longer exists.`);
      router.replace('/exercises');
    }
  }, [error, openSnackbar, router]);

  const chartData = useMemo(() => {
    if (!data?.graphData.length) {
      return null;
    }
    return data.graphData;
  }, [data]);

  const head = useHeadWithTitle(exerciseName ?? 'Exercise Details');

  if (!data)
    return (
      <>
        {head}
        <RouteLoader />
      </>
    );

  const dateFormatter = (isoString: string | Date) => {
    const date = new Date(isoString);
    const isMoreThanOneYearOld = isBefore(addYears(new Date(), 1), date);
    if (isMoreThanOneYearOld) {
      return format(new Date(date), 'M/d/yy');
    } else {
      return format(new Date(date), 'M/d');
    }
  };

  return (
    <>
      <div className={styles.root}>
        {head}
        <>
          <h1>{exerciseName}</h1>
          {!!chartData && (
            <div className={styles.chart}>
              <div className={styles.chartHeader}>History</div>
              <div className={styles.rechart}>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={chartData} margin={{ top: 16 }}>
                    <CartesianGrid horizontal={false} vertical={false} />
                    <XAxis
                      tick={{
                        fill: 'var(--color-secondary)',
                      }}
                      tickLine={{
                        stroke: 'var(--color-secondary)',
                      }}
                      axisLine={{
                        stroke: 'var(--color-secondary)',
                      }}
                      dataKey='performedAt'
                      tickFormatter={dateFormatter}
                    />
                    <YAxis
                      tick={{
                        fill: 'var(--color-secondary)',
                      }}
                      tickLine={{
                        stroke: 'var(--color-secondary)',
                      }}
                      axisLine={{
                        stroke: 'var(--color-secondary)',
                      }}
                      name='Pounds'
                      domain={['dataMin - 10', 'dataMax + 10']}
                    />
                    <Tooltip cursor={false} />
                    <Line
                      type='monotone'
                      dataKey='resistanceInPounds'
                      stroke='var(--pop-color)'
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ stroke: 'red', strokeWidth: 0, r: 4 }}
                      animationDuration={1000}
                    />
                    <ReferenceLine
                      y={data.personalBest?.resistanceInPounds!}
                      stroke='var(--accent-color)'
                      strokeDasharray='3 3'
                    >
                      <Label
                        fill='var(--color)'
                        position={'top'}
                        fontWeight={200}
                        fontSize={14}
                      >
                        {`Personal Best (${dateFormatter(
                          data.personalBest?.performedAt!
                        )})`}
                      </Label>
                    </ReferenceLine>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
};

Exercise.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>
    <RouteGuard>{page}</RouteGuard>
  </AppBarWithAppHeaderLayout>
);

export default Exercise;
