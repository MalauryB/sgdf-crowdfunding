// next.config.mjs
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const repoName = 'sgdf-crowdfunding';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isGitHubPages ? `/${repoName}` : '',
  assetPrefix: isGitHubPages ? `/${repoName}/` : '',
  trailingSlash: true,
};

export default nextConfig;
