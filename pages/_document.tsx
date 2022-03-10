import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <meta name='color-scheme' content='light dark'></meta>
                <meta
                    name='theme-color'
                    media='(prefers-color-scheme: light)'
                    content='white'
                />
                <meta
                    name='theme-color'
                    media='(prefers-color-scheme: dark)'
                    content='#22252c'
                />
                <link rel='manifest' href='/manifest.webmanifest' />
                <link rel='apple-touch-icon' href='/images/isometric-sq.png' />
                <link rel='icon' href='/images/isometric.ico' />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin='anonymous'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Syne+Mono&family=Work+Sans:wght@300;400;500;600&display=swap'
                    rel='stylesheet'
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
