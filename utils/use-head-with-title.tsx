import Head from 'next/head';
import { useMemo } from 'react';

export function useHeadWithTitle(title: string) {
  const titleWithAppName = useMemo(() => `${title} | ISOMETRIC`, [title]);
  return (
    <Head>
      <title>{titleWithAppName}</title>
    </Head>
  );
}
