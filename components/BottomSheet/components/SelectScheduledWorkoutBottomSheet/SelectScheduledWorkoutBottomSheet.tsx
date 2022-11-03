import BottomSheet from '../../BottomSheet';
import { ScheduledWorkout } from '@prisma/client';
import styles from './SelectScheduledWorkoutBottomSheet.module.scss';

interface Props {
  days: ScheduledWorkout[];
  onResult: (result: number | undefined) => void;
}

export default function SelectScheduledWorkoutBottomSheet({
  days,
  onResult,
}: Props) {
  return (
    <BottomSheet onResult={onResult} title='Select a Day'>
      {(onResult) => {
        const dayElements = days.map((day, index) => (
          <SelectScheduledWorkoutBottomSheetButton
            key={index}
            scheduledWorkout={day}
            index={index}
            onSelected={() => onResult(index)}
          />
        ));
        return <div className={styles.root}>{dayElements}</div>;
      }}
    </BottomSheet>
  );
}

interface SelectScheduledWorkoutBottomSheetButtonProps {
  index: number;
  scheduledWorkout: ScheduledWorkout;
  onSelected: () => void;
}

function SelectScheduledWorkoutBottomSheetButton({
  index,
  scheduledWorkout,
  onSelected,
}: SelectScheduledWorkoutBottomSheetButtonProps) {
  return (
    <button type='button' onClick={onSelected}>
      <div>
        Day {index + 1} -{' '}
        {!!scheduledWorkout.nickname ? (
          scheduledWorkout.nickname
        ) : (
          <span className={styles.noNickname}>No Name</span>
        )}
      </div>
    </button>
  );
}
