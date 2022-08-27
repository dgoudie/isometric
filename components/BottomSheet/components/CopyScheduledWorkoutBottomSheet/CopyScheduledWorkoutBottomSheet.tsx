import BottomSheet from '../../BottomSheet';
import { ScheduledWorkout } from '@prisma/client';
import styles from './CopyScheduledWorkoutBottomSheet.module.scss';

interface Props {
  days: ScheduledWorkout[];
  onResult: (result: number | undefined) => void;
}

export default function CopyScheduledWorkoutBottomSheet({
  days,
  onResult,
}: Props) {
  return (
    <BottomSheet onResult={onResult} title='Select a Day to Copy'>
      {(onResult) => {
        const dayElements = days.map((day, index) => (
          <CopyScheduledWorkoutBottomSheetButton
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

interface CopyScheduledWorkoutBottomSheetButtonProps {
  index: number;
  scheduledWorkout: ScheduledWorkout;
  onSelected: () => void;
}

function CopyScheduledWorkoutBottomSheetButton({
  index,
  scheduledWorkout,
  onSelected,
}: CopyScheduledWorkoutBottomSheetButtonProps) {
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
