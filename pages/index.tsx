import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import AppHeader from '../components/AppHeader/AppHeader';
import Image from 'next/image';
import { NextPageWithLayout } from './_app';
import classNames from 'classnames';
import styles from '../styles/Landing.module.scss';
import { useHeadWithTitle } from '../utils/use-head-with-title';

interface LandingProps {}

// export function getServerSideProps(
//   context: GetServerSidePropsContext
// ): GetServerSidePropsResult<LandingProps> {
//   return {
//     props: {},
//   };
// }

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

const Landing: NextPageWithLayout<LandingProps> = ({}) => {
  const head = useHeadWithTitle('Welcome');
  return (
    <div className={styles.root}>
      {head}
      <h1 className={styles.welcome}>Welcome!</h1>
      <p className={styles.intro}>
        ISOMETRIC is a simple app to record your workouts. ISOMETRIC can help
        you to keep track of important data points such as repetitions,
        resistance, and time for each set during your workout.
      </p>

      <div className={classNames(styles.marketingImages, styles.carousel)}>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index}>
              <Image
                height={2960}
                width={1440}
                key={index}
                src={`/images/marketing_${index + 1}.png`}
                alt=''
              />
            </div>
          ))}
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
