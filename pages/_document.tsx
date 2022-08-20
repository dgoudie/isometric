import { Head, Html, Main, NextScript } from 'next/document';

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
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id='isometric_portal'></div>
      </body>
    </Html>
  );
}
