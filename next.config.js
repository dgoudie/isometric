/** @type {import('next').NextConfig} */

const withLess = require('next-with-less');

module.exports = withLess({
    reactStrictMode: true,
    lessLoaderOptions: {
        /* ... */
    },
    env: {
        APP_NAME: process.env.npm_package_name,
        MONGODB_DB_NAME: 'ISOMETRIC',
    },
});
