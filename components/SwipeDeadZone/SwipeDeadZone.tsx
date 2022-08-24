import React, { useEffect, useRef } from 'react';

const ontouchstart = (e: TouchEvent) => e.preventDefault();

interface Props {
  className?: string;
}

export default function SwipeDeadZone({ className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = ref.current;
    current?.addEventListener('touchstart', ontouchstart);

    return () => {
      current?.removeEventListener('touchstart', ontouchstart);
    };
  }, [ref]);

  return <div ref={ref} className={className} />;
}
