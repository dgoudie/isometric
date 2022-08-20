import { ExerciseType } from '@dgoudie/isometric-types';
import classNames from 'classnames';
import styles from './ExerciseTypePicker.module.scss';

interface Props {
  value: ExerciseType;
  valueChanged: (value: ExerciseType) => void;
  disabled?: boolean;
}

export default function ExerciseTypePicker({
  value,
  valueChanged,
  disabled = false,
}: Props) {
  return (
    <div className={styles.root}>
      <button
        disabled={disabled}
        onClick={() => valueChanged('weighted')}
        type='button'
        className={classNames(
          styles.item,
          'standard-button',
          value === 'weighted' && 'primary'
        )}
      >
        <div className={styles.itemHeader}>Weighted</div>
      </button>
      <button
        disabled={disabled}
        onClick={() => valueChanged('assisted')}
        type='button'
        className={classNames(
          styles.item,
          'standard-button',
          value === 'assisted' && 'primary'
        )}
      >
        <div className={styles.itemHeader}>Assisted</div>
      </button>
      <button
        disabled={disabled}
        onClick={() => valueChanged('rep_based')}
        type='button'
        className={classNames(
          styles.item,
          'standard-button',
          value === 'rep_based' && 'primary'
        )}
      >
        <div className={styles.itemHeader}>Repetition-Only</div>
      </button>
      <button
        disabled={disabled}
        onClick={() => valueChanged('timed')}
        type='button'
        className={classNames(
          styles.item,
          'standard-button',
          value === 'timed' && 'primary'
        )}
      >
        <div className={styles.itemHeader}>Timed</div>
      </button>
    </div>
  );
}
