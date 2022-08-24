import {
  ElementOf,
  ExerciseMuscleGroup,
  IExercise,
  IExerciseExtended,
  literals,
} from '@dgoudie/isometric-types';
import {
  ReadableResource,
  emptyReadableResource,
  fetchFromApi,
  fetchFromApiAsReadableResource,
} from '../../utils/fetch-from-api';
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';

import ExerciseMetadata from '../ExerciseMetadata/ExerciseMetadata';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import Link from 'next/link';
import MuscleGroupPicker from '../MuscleGroupPicker/MuscleGroupPicker';
import MuscleGroupTag from '../MuscleGroupTag/MuscleGroupTag';
import RouteLoader from '../RouteLoader/RouteLoader';
import classNames from 'classnames';
import styles from './ExerciseSearch.module.scss';

export const HistoryOptions = literals(
  'all',
  'not_performed',
  'only_performed'
);

export type HistoryOption = ElementOf<typeof HistoryOptions>;

let initialExercisesResponse = emptyReadableResource();

interface Props {
  search: string | undefined;
  muscleGroup: ExerciseMuscleGroup | undefined;
  history: HistoryOption;
  className?: string;
  searchChanged: (search: string | undefined) => void;
  muscleGroupChanged: (muscleGroup: ExerciseMuscleGroup | undefined) => void;
  historyChanged: (option: HistoryOption) => void;
  onSelect?: (exerciseId: string) => void;
}

export default function ExerciseSearch(props: Props) {
  const [exercisesResponse, setExercisesResponse] = useState(
    initialExercisesResponse
  );

  const searchParams = useMemo(() => {
    const searchParams = new URLSearchParams();
    !!props.search && searchParams.set('search', props.search);
    !!props.muscleGroup && searchParams.set('muscleGroup', props.muscleGroup);
    props.history === 'only_performed' &&
      searchParams.set('onlyPerformed', '1');
    props.history === 'not_performed' &&
      searchParams.set('onlyNotPerformed', '1');
    return searchParams;
  }, [props.muscleGroup, props.search, props.history]);

  const [isPending, startTransaction] = useTransition();

  useEffect(() => {
    startTransaction(() => {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      const newResource = fetchFromApiAsReadableResource<IExerciseExtended[]>(
        `/api/exercises`,
        params
      );
      setExercisesResponse(newResource);
    });
  }, [searchParams]);

  return (
    <Suspense fallback={<RouteLoader />}>
      <ExerciseSearchContent exercisesResponse={exercisesResponse} {...props} />
    </Suspense>
  );
}

interface ExerciseSearchContentProps extends Props {
  exercisesResponse: ReadableResource<IExerciseExtended[]>;
}

function ExerciseSearchContent({
  exercisesResponse,
  className,
  search,
  muscleGroup,
  searchChanged,
  muscleGroupChanged,
  history,
  historyChanged,
  onSelect,
}: ExerciseSearchContentProps) {
  const itemsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const [exercises, setExercises] = useState(exercisesResponse.read());
  const [moreExercises, setMoreExercises] = useState(exercises.length >= 10);
  const [page, setPage] = useState(2);

  useEffect(() => {
    const exs = exercisesResponse.read();
    setExercises(exs);
    setMoreExercises(exs.length >= 10);
    setPage(2);
    itemsRef?.current?.scrollTo({ top: 0 });
  }, [exercisesResponse]);

  const searchParams = useMemo(() => {
    const searchParams = new URLSearchParams();
    !!search && searchParams.set('search', search);
    !!muscleGroup && searchParams.set('muscleGroup', muscleGroup);
    history === 'only_performed' && searchParams.set('onlyPerformed', '1');
    history === 'not_performed' && searchParams.set('onlyNotPerformed', '1');
    return searchParams;
  }, [muscleGroup, search, history]);

  const loadMore = useCallback(async () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    const nextPage = await fetchFromApi<IExerciseExtended[]>(
      `/api/exercises`,
      params
    );
    if (!nextPage.length) {
      setMoreExercises(false);
    } else {
      setExercises([...exercises, ...nextPage]);
    }
    setPage(page + 1);
  }, [searchParams, exercises, setExercises, setMoreExercises, page]);

  const items = useMemo(
    () =>
      exercises.map((ex) => (
        <ExerciseButton key={ex.name} exercise={ex} onSelect={onSelect} />
      )),
    [exercises, onSelect]
  );
  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.filters}>
        <div className={styles.filtersInput}>
          <i className='fa-solid fa-search'></i>
          <input
            ref={inputRef}
            autoCapitalize='none'
            autoCorrect='off'
            autoComplete='off'
            defaultValue={search}
            type={'text'}
            placeholder='Enter a search term...'
            onChange={(e) => searchChanged(e.target.value)}
          />
          <div className={styles.filtersInputClear}>
            {search && (
              <button
                type='button'
                onClick={() => {
                  searchChanged('');
                  inputRef.current!.value = '';
                  inputRef.current!.focus();
                }}
              >
                <i className='fa-solid fa-close'></i>
              </button>
            )}
          </div>
        </div>
        <div className={styles.filtersOthers}>
          <label>Muscle Group:</label>
          <MuscleGroupPicker
            value={muscleGroup}
            valueChanged={muscleGroupChanged}
          />
          <label>History:</label>
          <HistoryPicker value={history} valueChanged={historyChanged} />
        </div>
      </div>
      <div className={styles.items} ref={itemsRef}>
        <InfiniteScroll
          //@ts-ignore
          className={styles.itemsInfiniteScroll}
          pageStart={1}
          loadMore={loadMore}
          hasMore={moreExercises}
          useWindow={false}
        >
          {items}
        </InfiniteScroll>
      </div>
    </div>
  );
}

interface ExerciseButtonProps {
  exercise: IExerciseExtended;
  onSelect?: (exerciseId: string) => void;
}

const ExerciseButton = ({ exercise, onSelect }: ExerciseButtonProps) => {
  const muscleGroupTags = useMemo(
    () =>
      [
        exercise.primaryMuscleGroup,
        ...(exercise.secondaryMuscleGroups ?? []),
      ].map((group) => (
        <MuscleGroupTag
          className={styles.itemMusclesItem}
          key={`${exercise.name}_${group}`}
          muscleGroup={group}
        />
      )),
    [exercise]
  );

  const itemInnards = useMemo(
    () => (
      <>
        <div className={styles.itemTitle}>{exercise.name}</div>
        <div className={styles.itemMuscles}>{muscleGroupTags}</div>
        <ExerciseMetadata exercise={exercise} />
      </>
    ),
    [exercise.name, muscleGroupTags]
  );

  if (!!onSelect) {
    return (
      <button
        type='button'
        className={classNames('fade-in', styles.item)}
        onClick={() => onSelect(exercise._id)}
      >
        {itemInnards}
      </button>
    );
  } else {
    return (
      <Link href={`/exercises/${exercise.name}`}>
        <a draggable='false' className={classNames('fade-in', styles.item)}>
          {itemInnards}
        </a>
      </Link>
    );
  }
};
interface HistoryPickerProps {
  value: HistoryOption;
  valueChanged: (value: HistoryOption) => void;
}

function HistoryPicker({ value, valueChanged }: HistoryPickerProps) {
  return (
    <select
      className={styles.historyPicker}
      value={value}
      onChange={(e) => valueChanged(e.target.value as HistoryOption)}
    >
      {(['all', 'not_performed', 'only_performed'] as HistoryOption[]).map(
        (option) => (
          <option key={option} value={option}>
            {getHistoryPickerTextValue(option)}
          </option>
        )
      )}
    </select>
  );
}

function getHistoryPickerTextValue(option: HistoryOption) {
  switch (option) {
    case 'all':
      return 'Show All';
    case 'not_performed':
      return 'Show Never Performed';
    case 'only_performed':
      return 'Show Previously Performed';
  }
}
