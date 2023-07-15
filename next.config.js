// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     // formats: ["image/avif", "image/webp"],
//     domains: ["chanhong.site", "api.chanhong.site", "localhost"],
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         protocol: "https",
//         hostname: "my-club-bucket.s3.ap-northeast-2.amazonaws.com",
//       },
//     ],
//   },
// };

// const withImages = require("next-images");
// module.exports = withImages({
//   webpack(config, options) {
//     return config;
//   },
// });

// module.exports = nextConfig;

const withImages = require("next-images");

module.exports = {
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
        //ttf, woff, woff2, eot등 여러 확장자일 경우 다음과 같이 추가 가능
        source: "/.(woff|woff2|ttf|eot)$/i",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Origin, X-Requested-With, Content-Type, Accept",
          },
          {
            key: "Content-Type",
            value: "application/font-woff",
          },
          {
            key: "Content-Type",
            value: "application/font-ttf",
          },
          {
            key: "Content-Type",
            value: "application/octet-stream",
          },
        ],
      },
    ];
  },
};

module.exports = withImages(module.exports);
