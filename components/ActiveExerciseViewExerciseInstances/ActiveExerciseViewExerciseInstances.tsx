import { useCallback, useEffect, useState, useTransition } from 'react';

import { FinishedWorkoutExerciseWithSets } from '../../types/FinishedWorkout';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import RouteLoader from '../RouteLoader/RouteLoader';
import SetView from '../SetView/SetView';
import { WorkoutInstancesResponse } from '../../database/domains/active_workout';
import styles from './ActiveExerciseViewExerciseInstances.module.scss';
import { useFetchJSON } from '../../utils/fetch-json';
import useSWR from 'swr/immutable';

const format = new Intl.DateTimeFormat('en-US');

interface Props {
  exerciseName: string;
}

export default function ActiveExerciseViewExerciseInstances({
  exerciseName,
}: Props) {
  const [instances, setInstances] = useState<FinishedWorkoutExerciseWithSets[]>(
    []
  );
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(2);

  const fetcher = useFetchJSON();
  const { data, error } = useSWR<WorkoutInstancesResponse>(
    `/api/exercise/instances/${exerciseName}?page=1`,
    fetcher,
    { revalidateIfStale: false }
  );

  const [_pending, startTransition] = useTransition();

  useEffect(() => {
    if (!!data) {
      startTransition(() => {
        setInstances(data.instances);
        setPageCount(data.pageCount);
        setPage(2);
      });
    }
  }, [data]);

  const loadMore = useCallback(async () => {
    const nextPage: WorkoutInstancesResponse = await fetcher(
      `/api/exercise/instances/${exerciseName}?page=${page}`
    );
    setInstances([...instances!, ...nextPage.instances]);
    setPage(page + 1);
  }, [exerciseName, fetcher, instances, page]);

  if (error) throw error;
  if (!data) return <RouteLoader />;
  return (
    <div className={styles.instances}>
      <div className={styles.instancesHeader}>History</div>
      <div className={styles.instancesItemsWrapper}>
        {!!instances.length ? (
          <InfiniteScroll
            className={styles.instancesItems}
            hasMore={page <= pageCount}
            loadMore={loadMore}
            pageStart={1}
            useWindow={false}
          >
            {instances.map((instance, index) => (
              <div className={styles.instancesItemsItem} key={index}>
                <div>
                  {format.format(new Date(instance.finishedWorkout.startedAt))}
                </div>
                <SetView
                  key={index}
                  exerciseType={instance.exerciseType}
                  sets={instance.sets}
                />
              </div>
            ))}
          </InfiniteScroll>
        ) : (
          <div className={styles.noInstances}>
            <i className='fa-solid fa-circle-info'></i>
            <span>You have not performed this exercise before.</span>
          </div>
        )}
      </div>
    </div>
  );
}
