import classNames from 'classnames';
import styles from './Loader.module.scss';

interface Props {
    className?: string;
}

export default function Loader({ className }: Props) {
    return <div className={classNames(className, styles.loader)}></div>;
}
