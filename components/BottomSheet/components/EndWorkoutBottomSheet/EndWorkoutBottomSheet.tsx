import BottomSheet from '../../BottomSheet';
import React from 'react';
import styles from './EndWorkoutBottomSheet.module.scss';

interface Props {
  onResult: (result: 'END' | 'DISCARD' | undefined) => void;
}

export default function EndWorkoutBottomSheet({ onResult }: Props) {
  return (
    <BottomSheet onResult={onResult} title='End Workout'>
      {(onResult) => (
        <div className={styles.root}>
          <button
            type='button'
            className='standard-button primary'
            onClick={() => onResult('END')}
          >
            <i className='fa-solid fa-save'></i>
            Save Workout and End
          </button>
          <button
            type='button'
            className='standard-button'
            onClick={() => onResult('DISCARD')}
          >
            <i className='fa-solid fa-trash'></i>
            Discard Workout
          </button>
        </div>
      )}
    </BottomSheet>
  );
}
