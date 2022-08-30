import React, { useCallback, useState } from 'react';

import ThreeDotLoader from '../ThreeDotLoader/ThreeDotLoader';

export default function LoadingButton({
  children,
  disabled,
  onClick,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  const [isLoading, setIsLoading] = useState(false);

  const onClickWrapped = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onClick && onClick(event);
      setIsLoading(true);
    },
    [onClick]
  );

  return (
    <button
      {...props}
      onClick={onClickWrapped}
      disabled={disabled || isLoading}
    >
      {isLoading ? <ThreeDotLoader /> : children}
    </button>
  );
}
