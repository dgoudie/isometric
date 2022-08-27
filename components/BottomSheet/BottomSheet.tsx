import React, {
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { CupertinoPane } from 'cupertino-pane';
import FocusLock from 'react-focus-lock';
import Portal from '../Portal/Portal';
import styles from './BottomSheet.module.scss';

type PropsLocked<T> = {
  title?: string;
  locked: true;
  onResult: (result: T) => void;
  children: (onResult: (result: T) => void) => ReactNode;
};

type PropsNotLocked<T> = {
  title?: string;
  locked?: false;
  onResult: (result: T | undefined) => void;
  children: (onResult: (result: T) => void) => ReactNode;
};

const TIMEOUT = 250;

export default function BottomSheet<T>({
  title,
  locked,
  onResult,
  children,
}: PropsLocked<T> | PropsNotLocked<T>) {
  const paneRef = useRef<CupertinoPane>();
  const paneDivRef = useRef<HTMLDivElement>(null);

  const result = useRef<T>();

  const onClosedNoResult = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!locked) {
        result.current = undefined;
        paneRef.current?.preventDismiss(false);
        paneRef.current?.hide();
        paneRef.current?.destroy({ animate: true });
      }
    },
    [locked, paneRef]
  );

  const paneDismissed = useRef<() => void>(() => null);

  useEffect(() => {
    paneDismissed.current = () => {
      onResult(result.current as T);
    };
  }, [onResult]);

  const onClosedWithResult = useCallback(
    (_result: T) => {
      result.current = _result;
      paneRef.current?.preventDismiss(false);
      paneRef.current?.hide();
      paneRef.current?.destroy({ animate: true });
    },
    [paneRef]
  );

  useEffect(() => {
    paneRef.current = new CupertinoPane(paneDivRef.current!, {
      fitHeight: true,
      buttonDestroy: false,
      showDraggable: false,
      bottomClose: true,
      animationDuration: TIMEOUT,
      backdrop: true,
      backdropOpacity: 0.7,
      cssClass: styles.pane,
      dragBy: [`.${styles.sheetHeader}`],
      bottomOffset: 0,
      onDidDismiss: paneDismissed.current,
    });
    paneRef.current.present({ animate: true });
    if (!!locked) {
      paneRef.current.preventDismiss(true);
    }
  }, [locked]);

  return (
    <Portal>
      <div onClick={onClosedNoResult} className={styles.backdrop}>
        <FocusLock>
          <div ref={paneDivRef} onClick={(event) => event.stopPropagation()}>
            {(title || !locked) && (
              <div className={styles.sheetHeader}>
                <div className={styles.sheetHeaderTitle}>{title}</div>
                {!locked && (
                  <button
                    className={styles.sheetHeaderDismiss}
                    type='button'
                    onClick={onClosedNoResult}
                  >
                    <i className='fa-solid fa-xmark'></i>
                  </button>
                )}
              </div>
            )}
            <div>{children(onClosedWithResult)}</div>
          </div>
        </FocusLock>
      </div>
    </Portal>
  );
}
