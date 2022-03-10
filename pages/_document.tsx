import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
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
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
