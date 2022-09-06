import Link from 'next/link';
import Portal from '../Portal/Portal';
import React from 'react';
import classNames from 'classnames';
import styles from './FloatingActionButton.module.scss';

type FloatingActionButtonProps = {
  iconName: string;
  text: string;
  as: 'a' | 'button';
  className?: string;
  href?: string;
  onClick?: (event: React.MouseEvent) => void;
};

export default function FloatingActionButton({
  as,
  iconName,
  text,
  className,
  onClick,
  href,
}: FloatingActionButtonProps) {
  if (as === 'a') {
    return (
      <Portal>
        <Link href={href!}>
          <a
            onClick={onClick}
            className={classNames('standard-button', styles.root, className)}
          >
            <i className={`fa-solid fa-${iconName}`}></i>
            {text}
          </a>
        </Link>
      </Portal>
    );
  } else {
    return (
      <Portal>
        <button
          onClick={onClick}
          className={classNames('standard-button', styles.root, className)}
        >
          <i className={`fa-solid fa-${iconName}`}></i>
          {text}
        </button>
      </Portal>
    );
  }
}
