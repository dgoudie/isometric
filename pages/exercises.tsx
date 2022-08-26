import ExerciseSearch, {
  HistoryOption,
  HistoryOptions,
} from '../components/ExerciseSearch/ExerciseSearch';
import { useEffect, useMemo, useState } from 'react';

import AppBarWithAppHeaderLayout from '../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { ExerciseMuscleGroup } from '@prisma/client';
import { NextPageWithLayout } from './_app';
import RouteGuard from '../components/RouteGuard/RouteGuard';
import styles from './Exercises.module.scss';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import { useRouter } from 'next/router';

const Exercises: NextPageWithLayout = () => {
  const { query } = useRouter();

  const { q, muscleGroup, history } = query;
  const [muscleGroupDecoded, setMuscleGroupDecoded] = useState(
    !!muscleGroup ? (muscleGroup as ExerciseMuscleGroup) : undefined
  );
  const [historyDecoded, setHistoryDecoded] = useState(
    !!history ? (history as HistoryOption) : 'all'
  );

  const [searchTerm, setSearchTerm] = useState(q?.toString() ?? undefined);

  const head = useHeadWithTitle('Exercises');

  return (
    <div className={styles.root}>
      {head}
      <ExerciseSearch
        className={styles.exerciseSearch}
        search={searchTerm}
        searchChanged={setSearchTerm}
        muscleGroup={muscleGroupDecoded}
        muscleGroupChanged={setMuscleGroupDecoded}
        history={historyDecoded}
        historyChanged={setHistoryDecoded}
      />
    </div>
  );
};

Exercises.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>
    <RouteGuard>{page}</RouteGuard>
  </AppBarWithAppHeaderLayout>
);

export default Exercises;
