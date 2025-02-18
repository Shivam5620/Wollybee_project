/** @type {import('next').NextConfig} */
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  reactStrictMode: true,
  transpilePackages: [],
  env: {
    NEXT_NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    BACKEND_URL: process.env.BACKEND_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: process.env.ASSET_HOST_NAME,
      },
    ],
  },
};
