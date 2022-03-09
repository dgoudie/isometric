/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    env: {
        APP_NAME: process.env.npm_package_name,
        MONGODB_DB_NAME: 'ISOMETRIC',
    },
};
