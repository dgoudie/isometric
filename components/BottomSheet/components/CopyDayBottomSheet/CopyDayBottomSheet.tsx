import BottomSheet from '../../BottomSheet';
import { DayWithExerciseIds } from '../../../WorkoutPlanEditor/WorkoutPlanEditor';
import { IScheduleDay } from '@dgoudie/isometric-types';
import styles from './CopyDayBottomSheet.module.scss';

interface Props {
  days: DayWithExerciseIds[];
  onResult: (result: number | undefined) => void;
}

export default function CopyDayBottomSheet({ days, onResult }: Props) {
  return (
    <BottomSheet onResult={onResult} title='Select a Day to Copy'>
      {(onResult) => {
        const dayElements = days.map((day, index) => (
          <CopyDayBottomSheetButton
            key={index}
            day={day}
            index={index}
            onSelected={() => onResult(index)}
          />
        ));
        return <div className={styles.root}>{dayElements}</div>;
      }}
    </BottomSheet>
  );
}

interface CopyDayBottomSheetButtonProps {
  index: number;
  day: DayWithExerciseIds;
  onSelected: () => void;
}

function CopyDayBottomSheetButton({
  index,
  day,
  onSelected,
}: CopyDayBottomSheetButtonProps) {
  return (
    <button type='button' onClick={onSelected}>
      <div>
        Day {index + 1} -{' '}
        {!!day.day.nickname ? (
          day.day.nickname
        ) : (
          <span className={styles.noNickname}>No Name</span>
        )}
      </div>
    </button>
  );
}
