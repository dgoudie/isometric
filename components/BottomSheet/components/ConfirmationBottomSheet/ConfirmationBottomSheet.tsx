import BottomSheet from '../../BottomSheet';
import React from 'react';
import styles from './ConfirmationBottomSheet.module.scss';

interface Props {
  prompt: string;
  onResult: (result: boolean) => void;
  confirmButtonText?: string;
  denyButtonText?: string;
}

export default function ConfirmationBottomSheet({
  prompt,
  onResult,
  confirmButtonText = 'Yes',
  denyButtonText = 'No',
}: Props) {
  return (
    <BottomSheet onResult={onResult} locked>
      {(onResult) => (
        <div className={styles.root}>
          <pre>{prompt}</pre>
          <button
            type='button'
            className='standard-button primary'
            onClick={() => onResult(true)}
          >
            <i className='fa-solid fa-check'></i>
            {confirmButtonText}
          </button>
          <button
            type='button'
            className='standard-button'
            onClick={() => onResult(false)}
          >
            <i className='fa-solid fa-xmark'></i>
            {denyButtonText}
          </button>
        </div>
      )}
    </BottomSheet>
  );
}
