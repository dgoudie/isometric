import classNames from 'classnames';
import styles from './SetCountPicker.module.scss';

export type SetCount = 1 | 2 | 3 | 4 | 5;

interface Props {
    value?: SetCount;
    valueChanged?: (value: SetCount) => void;
    disabled?: boolean;
}

const setCounts: SetCount[] = [1, 2, 3, 4, 5];

export default function SetCountPicker({
    value,
    valueChanged,
    disabled = false,
}: Props) {
    return (
        <div className={styles.root}>
            {setCounts.map((v) => (
                <button
                    type='button'
                    key={v}
                    disabled={disabled}
                    className={classNames(
                        'standard-button',
                        v === value && 'primary'
                    )}
                    onClick={() => !!valueChanged && valueChanged(v)}
                >
                    {v}
                </button>
            ))}
        </div>
    );
}
