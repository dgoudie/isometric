import React, { useState } from 'react';

import classNames from 'classnames';
import styles from './ErrorView.module.scss';

type ErrorViewProps = {
  error: Error;
};

export default function ErrorView({ error }: ErrorViewProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.root}>
      <i className='fa-solid fa-triangle-exclamation'></i>
      <h2>An error has occurred</h2>
      <button
        type='button'
        className='standard-button primary'
        onClick={() => location.reload()}
      >
        <i className='fa-solid fa-rotate'></i>
        Reload Page
      </button>
      <details
        onToggle={(event) => setOpen((event.target as HTMLDetailsElement).open)}
      >
        <summary
          className={classNames(
            'standard-button outlined',
            open && 'highlighted'
          )}
        >
          <i
            className={classNames(
              'fa-solid',
              open ? 'fa-chevron-down' : 'fa-chevron-right'
            )}
          ></i>
          {open ? 'Hide' : 'Show'} Details
        </summary>
        <div className={styles.body}>
          <label>Message</label>
          <pre>{error.message}</pre>
          <label>Stack Trace</label>
          <pre>{error.stack}</pre>
        </div>
      </details>
    </div>
  );
}
