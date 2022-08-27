import React, { useLayoutEffect } from 'react';

import { createPortal } from 'react-dom';

const DEFAULT_PORTAL_CONTAINER_NAME = '__default__';

export interface PortalProps {
  /**
   * Called when this portal is added to the DOM
   */
  onMount?: () => void;

  /**
   * Optional. Mount this portal at the container specified
   * by this name. The container must be previously registered
   * with `registerPortal`.
   */
  containerName?: string;
}

export default function PortalInner({
  children,
  onMount,
  containerName: _containerName,
}: React.PropsWithChildren<PortalProps>) {
  const hostElement = document.createElement('div');

  // Portaled content should get their own stacking context so they don't interfere
  // with each other in unexpected ways. One should never find themselves tempted
  // to change the zIndex to a value other than "1".
  hostElement.style.position = 'relative';
  hostElement.style.zIndex = '1';
  const elementRef = React.useRef(hostElement);

  useLayoutEffect(() => {
    let containerName = _containerName;
    if (containerName === undefined) {
      containerName = DEFAULT_PORTAL_CONTAINER_NAME;
    }
    const parentElement = document.querySelector('#isometric_portal')!;

    const element = elementRef.current;
    parentElement.appendChild(element);
    onMount?.();

    return () => {
      parentElement.removeChild(element);
    };
  }, [_containerName, elementRef, onMount]);

  return createPortal(children, elementRef.current);
}
