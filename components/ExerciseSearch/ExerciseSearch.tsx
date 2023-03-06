import { ElementOf, literals } from '../../utils/oneof-array';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';

import ExerciseMetadata from '../ExerciseMetadata/ExerciseMetadata';
import { ExerciseMuscleGroup } from '@prisma/client';
import { ExerciseWithPersonalBestAndLastPerformed } from '../../database/domains/exercise';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import Link from 'next/link';
import MuscleGroupPicker from '../MuscleGroupPicker/MuscleGroupPicker';
import MuscleGroupTag from '../MuscleGroupTag/MuscleGroupTag';
import RouteLoader from '../RouteLoader/RouteLoader';
import classNames from 'classnames';
import styles from './ExerciseSearch.module.scss';
import { useFetchJSON } from '../../utils/fetch-json';
import useSWR from 'swr';

export const HistoryOptions = literals(
  'all',
  'not_performed',
  'only_performed'
);

export type HistoryOption = ElementOf<typeof HistoryOptions>;

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

export default function ExerciseSearch({
  search,
  muscleGroup,
  history,
  className,
  searchChanged,
  muscleGroupChanged,
  historyChanged,
  onSelect,
}: Props) {
  const searchParams = useMemo(() => {
    const searchParams = new URLSearchParams({ page: '1' });
    !!search && searchParams.set('search', search);
    !!muscleGroup && searchParams.set('muscleGroup', muscleGroup);
    history === 'only_performed' && searchParams.set('onlyPerformed', '1');
    history === 'not_performed' && searchParams.set('onlyNotPerformed', '1');
    return searchParams;
  }, [muscleGroup, search, history]);

  const itemsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    itemsRef?.current?.scrollTo({ top: 0 });
  }, [searchParams]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const [exercises, setExercises] = useState<
    ExerciseWithPersonalBestAndLastPerformed[]
  >([]);
  const [moreExercises, setMoreExercises] = useState(exercises.length >= 10);
  const [page, setPage] = useState(2);

  const fetcher = useFetchJSON();

  const { data, error } = useSWR<ExerciseWithPersonalBestAndLastPerformed[]>(
    `/api/exercises?${searchParams.toString()}`,
    fetcher
  );

  const nextPageSearchParams = useMemo(() => {
    const nextPageSearchParams = new URLSearchParams(searchParams);
    nextPageSearchParams.set('page', page.toString());
    return nextPageSearchParams;
  }, [searchParams, page]);

  const [_pending, startTransition] = useTransition();

  useEffect(() => {
    if (!!data) {
      startTransition(() => {
        setExercises(data);
        setMoreExercises(data.length === 10);
        setPage(2);
      });
    }
  }, [data]);

  const loadMore = useCallback(async () => {
    const nextPage = await fetcher(
      `/api/exercises?${nextPageSearchParams.toString()}`
    );
    if (nextPage.length < 10) {
      setMoreExercises(false);
    }
    setExercises([...exercises!, ...nextPage]);
    setPage(page + 1);
  }, [exercises, fetcher, nextPageSearchParams, page]);

  if (error) throw error;

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
            onChange={(e) =>
              searchChanged(e.target.value.replace(/\s+/g, ' ').trim())
            }
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
        {!!data ? (
          <InfiniteScroll
            className={styles.itemsInfiniteScroll}
            pageStart={1}
            loadMore={loadMore}
            hasMore={moreExercises}
            useWindow={false}
          >
            {exercises.map((ex) => (
              <ExerciseButton key={ex.name} exercise={ex} onSelect={onSelect} />
            ))}
          </InfiniteScroll>
        ) : (
          <RouteLoader />
        )}
      </div>
    </div>
  );
}

interface ExerciseButtonProps {
  exercise: ExerciseWithPersonalBestAndLastPerformed;
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
    [exercise, muscleGroupTags]
  );

  if (!!onSelect) {
    return (
      <button
        type='button'
        className={classNames('fade-in', styles.item)}
        onClick={() => onSelect(exercise.id)}
      >
        {itemInnards}
      </button>
    );
  } else {
    return (
      (<Link
        href={`/exercises/${exercise.name}`}
        draggable='false'
        className={classNames('fade-in', styles.item)}>

        {itemInnards}

      </Link>)
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
