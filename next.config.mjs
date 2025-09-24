// next.config.mjs
const repoName = 'sgdf-crowdfunding';
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProduction ? `/${repoName}` : '',
  assetPrefix: isProduction ? `/${repoName}/` : '',
  trailingSlash: true,
};

export default nextConfig;
