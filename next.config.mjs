// next.config.mjs
const repoName = 'sgdf-crowdfunding';
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProduction ? `/${repoName}` : '',
  // assetPrefix retiré car on gère les images manuellement avec getImagePath()
  trailingSlash: true,
};
export default nextConfig;