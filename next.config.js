const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = require("@ducanh2912/next-pwa").default({
      dest: "public",
    });
    return withPWA(withPlugins(
      [
        withBundleAnalyzer({
          compress: true,
          webpack(config) {
            const prod = process.env.NODE_ENV === 'production';
            const plugins = [...config.plugins];

            return {
              ...config,
              mode: prod ? 'production' : 'development',
              devtool: prod ? 'hidden-source-map' : 'eval-source-map',
              plugins,
            };
          },
        }),
      ],
      {},
    ));
  }
  return nextConfig;
};
