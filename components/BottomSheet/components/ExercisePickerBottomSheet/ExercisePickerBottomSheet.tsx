import ExerciseSearch, {
  HistoryOption,
} from '../../../ExerciseSearch/ExerciseSearch';

import BottomSheet from '../../BottomSheet';
import { ExerciseMuscleGroup } from '@prisma/client';
import styles from './ExercisePickerBottomSheet.module.scss';
import { useState } from 'react';

interface Props {
  search?: string;
  muscleGroup?: ExerciseMuscleGroup;
  history?: HistoryOption;
  onResult: (result: number | undefined) => void;
}

export default function ExercisePickerBottomSheet({
  onResult,
  search: initialSearch,
  muscleGroup: initialMuscleGroup,
  history: initialHistory = 'all',
}: Props) {
  const [search, setSearch] = useState<string | undefined>(initialSearch);
  const [muscleGroup, setMuscleGroup] = useState<
    ExerciseMuscleGroup | undefined
  >(initialMuscleGroup);
  const [history, setHistory] = useState<HistoryOption>(initialHistory);

  return (
    <BottomSheet onResult={onResult} title='Select an Exercise'>
      {(onResult) => (
        <div className={styles.root}>
          <ExerciseSearch
            className={styles.exerciseSearch}
            search={search}
            searchChanged={setSearch}
            muscleGroup={muscleGroup}
            muscleGroupChanged={setMuscleGroup}
            history={history}
            historyChanged={setHistory}
            onSelect={onResult}
          />
        </div>
      )}
    </BottomSheet>
  );
}
