import dynamic from 'next/dynamic';

const Portal = dynamic(() => import('./PortalInner'), {
  ssr: false,
});

export default Portal;
