import React, { createContext, useState } from 'react';

import { CSSTransition } from 'react-transition-group';
import Portal from '../../components/Portal/Portal';
import styles from './Snackbar.module.scss';

// Snackbar default values
export const defaultDuration = 3000;
export const defaultInterval = 250;

type OpenSnackbar = (content: string, duration?: number) => void;
type CloseSnackbar = () => void;

export const SnackbarContext = createContext<{
  openSnackbar: OpenSnackbar;
  closeSnackbar: CloseSnackbar;
}>({
  openSnackbar: () => undefined,
  closeSnackbar: () => undefined,
});

export default function SnackbarProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [open, setOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number>();
  const [content, setContent] = useState('');
  const [duration, setDuration] = useState(defaultDuration);

  const triggerSnackbar = (content: string, duration: number) => {
    setContent(content);
    setDuration(duration);
    setOpen(true);
  };

  // Manages all the snackbar's opening process
  const openSnackbar = (content: string, duration = defaultDuration) => {
    // Closes the snackbar if it is already open
    if (open === true) {
      setOpen(false);
      setTimeout(() => {
        triggerSnackbar(content, duration);
      }, defaultInterval);
    } else {
      triggerSnackbar(content, duration);
    }
  };

  // Closes the snackbar just by setting the "open" state to false
  const closeSnackbar = () => {
    setOpen(false);
  };

  // Returns the Provider that must wrap the application
  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {children}

      {/* @ts-ignore */}
      <Portal>
        <CSSTransition
          in={open}
          timeout={250}
          mountOnEnter
          unmountOnExit
          // Sets timeout to close the snackbar
          onEnter={() => {
            clearTimeout(timeoutId);
            setTimeoutId(
              setTimeout(() => setOpen(false), duration) as unknown as number
            );
          }}
          classNames={{
            enter: styles.snackbarEnterAndExitActive,
            enterActive: styles.snackbarEnterActive,
            enterDone: styles.snackbarEnterDone,
            exitActive: styles.snackbarEnterAndExitActive,
          }}
        >
          <div className={styles.snackbar}>
            <div className={styles.snackbarContent}>{content}</div>
            <button onClick={closeSnackbar} className={styles.snackbarClose}>
              <i className='fa-solid fa-close'></i>
            </button>
          </div>
        </CSSTransition>
      </Portal>
    </SnackbarContext.Provider>
  );
}
