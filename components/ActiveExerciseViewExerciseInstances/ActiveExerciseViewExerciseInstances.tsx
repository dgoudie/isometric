import {
  ReadableResource,
  emptyReadableResource,
  fetchFromApiAsReadableResource,
} from '../../utils/fetch-from-api';
import { Suspense, useEffect, useMemo, useState, useTransition } from 'react';

import { IWorkoutExercise } from '@dgoudie/isometric-types';
import RouteLoader from '../RouteLoader/RouteLoader';
import SetView from '../SetView/SetView';
import exercise from '../../database/models/exercise';
import styles from './ActiveExerciseViewExerciseInstances.module.scss';

const format = new Intl.DateTimeFormat('en-US');

let initialInstancesResponse = emptyReadableResource();

interface Props {
  exerciseName: string;
}

export default function ActiveExerciseViewExerciseInstances({
  exerciseName,
}: Props) {
  const [instancesResource, setInstancesResource] = useState<
    ReadableResource<IWorkoutExercise[]>
  >(initialInstancesResponse);

  const [_isPending, startTransaction] = useTransition();

  useEffect(() => {
    startTransaction(() => {
      const updatedInstancesResource = fetchFromApiAsReadableResource<
        IWorkoutExercise[]
      >(`/api/workout-instances/${exerciseName}`);
      setInstancesResource(updatedInstancesResource);
    });
  }, [exerciseName]);
  return (
    <Suspense fallback={<RouteLoader />}>
      <Instances instancesResource={instancesResource} />
    </Suspense>
  );
}

interface InstancesProps {
  instancesResource: ReadableResource<IWorkoutExercise[]>;
}

function Instances({ instancesResource }: InstancesProps) {
  const instances = useMemo(
    () => instancesResource.read(),
    [instancesResource]
  );
  return (
    <div className={styles.instances}>
      <div className={styles.instancesHeader}>Recent History</div>
      {!!instances.length ? (
        <div className={styles.instancesItems}>
          {instances.map((instance, index) => (
            <div className={styles.instancesItemsItem} key={index}>
              <div>{format.format(new Date(instance.performedAt))}</div>
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
