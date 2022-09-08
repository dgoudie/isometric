import ExerciseSearch, {
  HistoryOption,
  HistoryOptions,
} from '../components/ExerciseSearch/ExerciseSearch';
import { useCallback, useMemo } from 'react';

import AppBarWithAppHeaderLayout from '../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { ExerciseMuscleGroup } from '@prisma/client';
import { NextPageWithLayout } from './_app';
import styles from './Exercises.module.scss';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import { useRouter } from 'next/router';
import useUrlSearchParamsFromQuery from '../utils/use-url-search-params-from-query';

const Exercises: NextPageWithLayout = () => {
  const { query, replace } = useRouter();

  const urlSearchParams = useUrlSearchParamsFromQuery(query);

  const exerciseMuscleGroups = useMemo(
    () => new Set<string>(Object.values(ExerciseMuscleGroup)),
    []
  );
  const historyOptions = useMemo(() => new Set<string>(HistoryOptions), []);

  const history = useMemo(() => {
    const history = urlSearchParams.get('history');
    if (!!history && historyOptions.has(history)) {
      return history as HistoryOption;
    }
    return 'all';
  }, [historyOptions, urlSearchParams]);

  const muscleGroup = useMemo(() => {
    const muscleGroup = urlSearchParams.get('muscleGroup');
    if (!!muscleGroup && exerciseMuscleGroups.has(muscleGroup)) {
      return muscleGroup as ExerciseMuscleGroup;
    }
    return undefined;
  }, [exerciseMuscleGroups, urlSearchParams]);

  const head = useHeadWithTitle('Exercises');

  const navigate = useCallback(
    (key: string, newValue: string | undefined | null) => {
      const params = new URLSearchParams(urlSearchParams);
      if (!!newValue) {
        params.set(key, newValue);
      } else {
        params.delete(key);
      }
      replace(`/exercises?${params.toString()}`);
    },
    [replace, urlSearchParams]
  );

  return (
    <div className={styles.root}>
      {head}
      <ExerciseSearch
        className={styles.exerciseSearch}
        search={urlSearchParams.get('q') ?? undefined}
        searchChanged={(searchTerm) => {
          navigate('q', searchTerm);
        }}
        muscleGroup={muscleGroup}
        muscleGroupChanged={(muscleGroup) => {
          navigate('muscleGroup', muscleGroup);
        }}
        history={history}
        historyChanged={(history) => {
          navigate('history', history);
        }}
      />
    </div>
  );
};

Exercises.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>{page}</AppBarWithAppHeaderLayout>
);

export default Exercises;
