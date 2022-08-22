import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import AppHeader from '../components/AppHeader/AppHeader';
import { NextPageWithLayout } from './_app';
import styles from '../styles/Landing.module.scss';
import { useHeadWithTitle } from '../utils/use-head-with-title';

interface LandingProps {}

export function getServerSideProps(
  context: GetServerSidePropsContext
): GetServerSidePropsResult<LandingProps> {
  return {
    props: {},
  };
}

const Landing: NextPageWithLayout<LandingProps> = ({}) => {
  const head = useHeadWithTitle('Welcome');
  return (
    <div className={styles.root}>
      {head}
      <h1>Welcome!</h1>
      <p>ISOMETRIC is a simple app to record your workouts. </p>
    </div>
  );
};

Landing.getLayout = (page) => (
  <>
    <AppHeader />
    {page}
  </>
);

export default Landing;
