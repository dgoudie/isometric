import lazy from 'next/dynamic';

export const lazyImportMaterialComponent = (path: string) =>
  lazy(() => import(path), { ssr: false });
