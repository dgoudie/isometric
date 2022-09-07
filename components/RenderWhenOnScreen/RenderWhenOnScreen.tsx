import React, { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';

type RenderWhenOnScreenProps = {
  className?: string;
};

export default function RenderWhenOnScreen({
  children,
  className,
}: React.PropsWithChildren<RenderWhenOnScreenProps>) {
  const [rendered, setRendered] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      setRendered(true);
    }
  }, [inView]);

  return (
    <div className={className} ref={ref}>
      {rendered ? children : null}
    </div>
  );
}
