import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { signIn, useSession } from 'next-auth/react';
import { useContext, useEffect } from 'react';

import AppHeader from '../components/AppHeader/AppHeader';
import Image from 'next/image';
import Link from 'next/link';
import { NextPageWithLayout } from './_app';
import { SnackbarContext } from '../providers/Snackbar/Snackbar';
import ThreeDotLoader from '../components/ThreeDotLoader/ThreeDotLoader';
import activeWorkoutExists from '../utils/active-workout-exists';
import classNames from 'classnames';
import { getUserId } from '../utils/get-user-id';
import marketingImage1 from '../public/images/marketing_1.png';
import marketingImage2 from '../public/images/marketing_2.png';
import marketingImage3 from '../public/images/marketing_3.png';
import marketingImage4 from '../public/images/marketing_4.png';
import styles from './Landing.module.scss';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import useOneTapSignin from '../utils/use-google-one-tap-signin';
import { useRouter } from 'next/router';

interface SellingPoint {
  iconClass: string;
  title: string;
  content: string;
}

const sellingPoints: SellingPoint[] = [
  {
    iconClass: 'fa-star',
    title: 'Simple',
    content: `Create your day-by-day workout plan by 
    adding exercises, then start. Its that simple.`,
  },
  {
    iconClass: 'fa-wrench',
    title: 'Customizable',
    content: `ISOMETRIC comes with many exercises preconfigured 
      out of the box, but you can add new ones and modify 
      the existing ones however you'd like.`,
  },
  {
    iconClass: 'fa-handshake-simple-slash',
    title: 'Hands-Off',
    content: `ISOMETRIC is designed for experienced gym-goers. 
    The app is not going to tell you what you to, or what 
    adjustments you should make. It's focused on helping you 
    record your workouts and view your progress over time.`,
  },
];

const Landing: NextPageWithLayout = () => {
  const router = useRouter();
  const { openSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (router.query.reason === 'loggedoff')
      openSnackbar('Please sign in to continue...');
    router.replace('/');
  }, [openSnackbar, router]);

  const head = useHeadWithTitle('Welcome');
  useOneTapSignin();
  const { status } = useSession();
  return (
    <div className={styles.root}>
      {head}
      <h1 className={styles.welcome}>Welcome!</h1>
      <p className={styles.intro}>
        ISOMETRIC is a simple app to record your workouts. ISOMETRIC can help
        you to keep track of important data points such as repetitions,
        resistance, and time for each set during your workout.
      </p>
      <div className={styles.buttonWrapper}>
        {status === 'unauthenticated' && (
          <button
            type='button'
            className='standard-button primary'
            onClick={() => signIn()}
          >
            <i className='fa-solid fa-right-to-bracket'></i>
            Sign in
          </button>
        )}
        {status === 'authenticated' && (
          <Link href={'/dashboard'}>
            <a className='standard-button primary'>
              <i className='fa-solid fa-bars-progress'></i>
              Go to Workout Dashboard
            </a>
          </Link>
        )}
        {status === 'loading' && (
          <div className={styles.loading}>
            <ThreeDotLoader />
          </div>
        )}
      </div>
      <div className={classNames(styles.marketingImages, styles.carousel)}>
        <div>
          <Image
            placeholder='blur'
            height={2960}
            width={1440}
            src={marketingImage1}
            alt=''
          />
        </div>
        <div>
          <Image
            placeholder='blur'
            height={2960}
            width={1440}
            src={marketingImage2}
            alt=''
          />
        </div>
        <div>
          <Image
            placeholder='blur'
            height={2960}
            width={1440}
            src={marketingImage3}
            alt=''
          />
        </div>
        <div>
          <Image
            placeholder='blur'
            height={2960}
            width={1440}
            src={marketingImage4}
            alt=''
          />
        </div>
      </div>
      <div className={styles.sectionHeader}>Why ISOMETRIC?</div>
      <div className={classNames(styles.sellingPoints, styles.carousel)}>
        {sellingPoints.map((sellingPoint) => (
          <div key={sellingPoint.title} className={styles.sellingPoint}>
            <div className={styles.sellingPointHeader}>
              <i className={classNames('fa-solid', sellingPoint.iconClass)}></i>
              {sellingPoint.title}
            </div>
            <div className={styles.sellingPointBody}>
              {sellingPoint.content}
            </div>
          </div>
        ))}
      </div>
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
