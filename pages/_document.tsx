import { Head, Html, Main, NextScript } from 'next/document';

import Script from 'next/script';
import themes from '../utils/themes';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet='utf-8' />
        <link
          rel='icon'
          href='/images/isometric.ico'
          crossOrigin='use-credentials'
        />
        <link
          rel='apple-touch-icon'
          href='/images/isometric.png'
          crossOrigin='use-credentials'
        />
        <meta name='color-scheme' content='light dark'></meta>
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
