/** @type {import('next').NextConfig} */
const nextConfig = {
  api: {
    bodyParser: {
      sizeLimit: "2mb", // supports large images
    },
  },
  serverActions: {
    bodySizeLimit: "2mb",
  },
};

module.exports = nextConfig;
