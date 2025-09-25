// next.config.mjs
const repoName = 'sgdf-crowdfunding';
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProduction ? `/${repoName}` : '',
  // assetPrefix ne fonctionne que pour les assets Next.js, pas pour public/
  trailingSlash: true,
};
export default nextConfig;