const withImages = require("next-images");
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // formats: ["image/avif", "image/webp"],
    domains: ["chanhong.site", "api.chanhong.site", "localhost"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        protocol: "https",
        hostname: "my-club-bucket.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },

  webpack(config, options) {
    return config;
  },
  // debug: process.env.NODE_ENV === "development",
  // i18n,
  // reloadOnPrerender: process.env.NODE_ENV === "development",
};

module.exports = withImages(nextConfig);
