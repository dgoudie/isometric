import React, { useCallback, useState } from 'react';

import ThreeDotLoader from '../ThreeDotLoader/ThreeDotLoader';

type LoadingButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { loadingText?: string };

export default function LoadingButton({
  loadingText,
  children,
  disabled,
  onClick,
  ...props
}: LoadingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onClickWrapped = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onClick && onClick(event);
      setTimeout(() => setIsLoading(true));
    },
    [onClick]
  );

  return (
    <button
      {...props}
      onClick={onClickWrapped}
      disabled={disabled || isLoading}
    >
      {isLoading ? <ThreeDotLoader text={loadingText} /> : children}
    </button>
  );
}
