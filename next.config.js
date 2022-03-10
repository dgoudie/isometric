/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

module.exports = withPWA({
    reactStrictMode: true,
    optimizeFonts: false,
    env: {
        APP_NAME: process.env.npm_package_name,
        MONGODB_DB_NAME: 'ISOMETRIC',
    },
    pwa: {
        dest: 'public',
        disable: process.env.NODE_ENV === 'development',
    },
});
