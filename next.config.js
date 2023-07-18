const withImages = require("next-images");

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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1 year in seconds
          },
        ],
      },
    ];
  },
  webpack(config, options) {
    return config;
  },
};

module.exports = withImages(nextConfig);
