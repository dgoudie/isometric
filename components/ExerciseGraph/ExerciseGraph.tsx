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
import React, { useCallback, useMemo, useState } from 'react';
import { addYears, format, isBefore, secondsToMinutes } from 'date-fns';

import { ExerciseType } from '@prisma/client';
import { FinishedWorkoutExerciseWithSets } from '../../example_type';
import { PersonalBestSet } from '../../database/utils/personal-best';
import ThreeDotLoader from '../ThreeDotLoader/ThreeDotLoader';
import styles from './ExerciseGraph.module.scss';
import { useFetchJSONWith403Redirect } from '../../utils/fetch-with-403-redirect';
import useSWR from 'swr';

type ExerciseGraphProps = {
  exerciseType: ExerciseType;
  exerciseName: string;
  personalBest: PersonalBestSet | null;
};

export default function ExerciseGraph({
  exerciseType,
  exerciseName,
  personalBest,
}: ExerciseGraphProps) {
  const [page, setPage] = useState(1);
  const fetcher = useFetchJSONWith403Redirect();
  const { data: instances, error } = useSWR<FinishedWorkoutExerciseWithSets[]>(
    `/api/exercise/instances/${exerciseName}?page=${page}&order=desc`,
    fetcher
  );

  const XAxisTickFormatter = useCallback((isoString: string | Date) => {
    const date = new Date(isoString);
    const isMoreThanOneYearOld = isBefore(addYears(new Date(), 1), date);
    if (isMoreThanOneYearOld) {
      return format(new Date(date), 'M/d/yy');
    } else {
      return format(new Date(date), 'M/d');
    }
  }, []);

  const YAxisTickFormatter = useCallback(
    (value: number) => {
      switch (exerciseType) {
        case 'timed':
          return `${secondsToMinutes(value)}m`;
        default:
          return value.toString();
      }
    },
    [exerciseType]
  );

  const tooltipFormatter = useCallback(
    (value: number) => {
      switch (exerciseType) {
        case 'weighted': {
          return [`${value} lbs`, 'Resistance (Best Set)'];
        }
        case 'assisted': {
          return [`${value} lbs`, 'Assistance (Best Set)'];
        }
        case 'timed': {
          return [`${secondsToMinutes(value)}min`, 'Total Time'];
        }
        case 'rep_based': {
          return [value, 'Total Reps'];
        }
      }
    },
    [exerciseType]
  );

  const personalBestValue = useMemo(() => {
    if (!personalBest) {
      return null;
    }
    switch (exerciseType) {
      case 'rep_based': {
        return personalBest.repetitions;
      }
      case 'timed': {
        return personalBest.timeInSeconds;
      }
      default: {
        return personalBest.resistanceInPounds;
      }
    }
  }, [exerciseType, personalBest]);

  const data = useMemo(() => {
    if (!instances) {
      return null;
    }
    if (!instances.length) {
      return [];
    }
    const reversedInstances = instances.slice().reverse();
    switch (exerciseType) {
      case 'rep_based': {
        return reversedInstances.map(({ finishedWorkout, sets }) => ({
          performedAt: finishedWorkout.startedAt,
          performance: sets.reduce((sum, set) => sum + set.repetitions!, 0),
        }));
      }
      case 'timed': {
        return reversedInstances.map(({ finishedWorkout, sets }) => ({
          performedAt: finishedWorkout.startedAt,
          performance: sets.reduce((sum, set) => sum + set.timeInSeconds!, 0),
        }));
      }
      case 'weighted': {
        return reversedInstances.map(({ finishedWorkout, sets }) => ({
          performedAt: finishedWorkout.startedAt,
          performance: sets.sort(
            (s1, s2) => s2.resistanceInPounds! - s1.resistanceInPounds!
          )[0].resistanceInPounds,
        }));
      }
      case 'assisted': {
        return reversedInstances.map(({ finishedWorkout, sets }) => ({
          performedAt: finishedWorkout.startedAt,
          performance: sets.sort(
            (s1, s2) => s1.resistanceInPounds! - s2.resistanceInPounds!
          )[0].resistanceInPounds,
        }));
      }
    }
  }, [exerciseType, instances]);

  if (error) throw error;

  if (!data) {
    return <ThreeDotLoader className={styles.loadingOrNone} />;
  }

  if (!data.length) {
    return (
      <div className={styles.loadingOrNone}>
        You haven&apos;t yet performed this exercise.
      </div>
    );
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart data={data} margin={{ top: 16 }}>
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
          tickFormatter={XAxisTickFormatter}
          allowDataOverflow={true}
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
          dataKey={'performance'}
          domain={['auto', 'auto']}
          tickFormatter={YAxisTickFormatter}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--background-alt-2)',
            border: 'none',
            borderRadius: 8,
            padding: 8,
          }}
          formatter={tooltipFormatter}
          labelFormatter={(value) => format(new Date(value), 'M/d/yy')}
        />
        <Line
          type='monotone'
          dataKey={'performance'}
          stroke='var(--pop-color)'
          strokeWidth={3}
          dot={false}
          activeDot={{ strokeWidth: 0, r: 4 }}
          animationDuration={1500}
          //@ts-ignore
          animationEasing='cubic-bezier(0.0, 0.0, 0.2, 1)'
        />
        {!!personalBestValue && personalBest && (
          <ReferenceLine
            y={personalBestValue}
            stroke='var(--accent-color)'
            strokeDasharray='3 3'
          >
            <Label
              fill='var(--color)'
              position={'top'}
              fontWeight={200}
              fontSize={14}
            >
              {`Personal Best (${XAxisTickFormatter(
                personalBest.performedAt!
              )})`}
            </Label>
          </ReferenceLine>
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
