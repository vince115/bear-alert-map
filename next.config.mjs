/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // ✅ 允許 import SVG 當 React Component
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
