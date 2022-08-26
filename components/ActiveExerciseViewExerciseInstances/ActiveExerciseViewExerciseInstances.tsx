import { FinishedWorkoutExerciseWithSets } from '../../example_type';
import RouteLoader from '../RouteLoader/RouteLoader';
import SetView from '../SetView/SetView';
import styles from './ActiveExerciseViewExerciseInstances.module.scss';
import useFetchWith403Redirect from '../../utils/fetch-with-403-redirect';
import useSWR from 'swr';

const format = new Intl.DateTimeFormat('en-US');

interface Props {
  exerciseName: string;
}

export default function ActiveExerciseViewExerciseInstances({
  exerciseName,
}: Props) {
  const fetcher = useFetchWith403Redirect();
  const { data: instances, error } = useSWR<FinishedWorkoutExerciseWithSets[]>(
    `/api/workout-instances/${exerciseName}`,
    fetcher
  );
  if (error) throw error;
  if (!instances) return <RouteLoader />;
  return (
    <div className={styles.instances}>
      <div className={styles.instancesHeader}>Recent History</div>
      {!!instances.length ? (
        <div className={styles.instancesItems}>
          {instances.map((instance, index) => (
            <div className={styles.instancesItemsItem} key={index}>
              <div>
                {format.format(new Date(instance.finishedWorkout.createdAt))}
              </div>
              <SetView
                key={index}
                exerciseType={instance.exerciseType}
                sets={instance.sets}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noInstances}>
          <i className='fa-solid fa-circle-info'></i>
          <span>You have not performed this exercise before.</span>
        </div>
      )}
    </div>
  );
}
