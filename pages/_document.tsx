import { Head, Html, Main, NextScript } from 'next/document';

import Script from 'next/script';
import themes from '../utils/themes';

export default function Document() {
  const description =
    'ISOMETRIC is a simple app to record your workouts. ISOMETRIC can help you to keep track of important data points such as repetitions, resistance, and time for each set during your workout.';
  return (
    <Html>
      <Head>
        <meta name='description' content={description} />
        <meta property='og:title' content='ISOMETRIC' />
        <meta property='og:site_name' content='ISOMETRIC' />
        <meta property='og:url' content='https://isometric.goudie.dev' />
        <meta property='og:description' content={description} />
        <meta property='og:type' content='website' />
        <meta
          property='og:image'
          content='https://isometric.goudie.dev/images/isometric.png'
        />
        <meta name='twitter:text:title' content='ISOMETRIC' />
        <meta name='twitter:card' content='app' />
        <meta name='twitter:creator' content='@daniel_j_goudie' />
        <meta name='twitter:description' content={description} />
        <meta charSet='utf-8' />
        <link
          rel='icon'
          href='/images/isometric.ico'
          crossOrigin='use-credentials'
        />
        {/* Generated from pwa asset generator */}
        <link
          rel='apple-touch-startup-image'
          href='/icons/apple-splash-2048-2732.jpg'
          media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/icons/apple-splash-1668-2388.jpg'
          media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/icons/apple-splash-1536-2048.jpg'
          media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/icons/apple-splash-1668-2224.jpg'
          media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/icons/apple-splash-1620-2160.jpg'
          media='(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/icons/apple-splash-1284-2778.jpg'
          media='(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/icons/apple-splash-1170-2532.jpg'
          media='(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/icons/apple-splash-1125-2436.jpg'
          media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/icons/apple-splash-1242-2688.jpg'
          media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/icons/apple-splash-828-1792.jpg'
          media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/icons/apple-splash-1242-2208.jpg'
          media='(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/icons/apple-splash-750-1334.jpg'
          media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/icons/apple-splash-640-1136.jpg'
          media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link rel='apple-touch-icon' href='/icons/apple-icon-180.png' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        {/* End Generated from pwa asset generator */}
        <meta name='color-scheme' content='light'></meta>
        <meta name='theme-color' content='#bdcadb' />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: light)'
          content='#bdcadb'
        />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: dark)'
          content='#091024'
        />

        <link
          rel='manifest'
          href='/manifest.webmanifest'
          crossOrigin='use-credentials'
        />
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Mitr:wght@300;400;500;600&family=Permanent+Marker&display=swap'
          rel='stylesheet'
        />
        <Script
          src='https://accounts.google.com/gsi/client'
          strategy='afterInteractive'
        />
        <Script strategy='beforeInteractive' id='define_themes'>{`
          window.isometric = {
            themes: new Map(${JSON.stringify(Array.from(themes))})
          }
      `}</Script>
        <Script strategy='beforeInteractive' src='/scripts/apply_theme.js' />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id='isometric_portal'></div>
      </body>
    </Html>
  );
}
