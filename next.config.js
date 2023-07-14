/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
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
};

const withImages = require("next-images");
module.exports = withImages({
  webpack(config, options) {
    return config;
  },
});

module.exports = nextConfig;
