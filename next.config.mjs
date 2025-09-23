// next.config.mjs
const isCI = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isCI ? '/sgdf-crowdfunding' : '',
  assetPrefix: isCI ? '/sgdf-crowdfunding/' : '',
  // trailingSlash: true,
};

export default nextConfig;
