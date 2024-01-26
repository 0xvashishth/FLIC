/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },webpack: (config, { isServer }) => {
        if (isServer) {
          config.externals.push("skia-canvas");
        }
    
        return config;
      },
}

module.exports = nextConfig
