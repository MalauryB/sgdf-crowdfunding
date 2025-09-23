// next.config.js
const isCI = process.env.GITHUB_ACTIONS === 'true';

module.exports = {
  output: 'export',                 // génère ./out
  images: { unoptimized: true },    // requis sur Pages
  basePath: isCI ? '/sgdf-crowdfunding' : '',
  assetPrefix: isCI ? '/sgdf-crowdfunding/' : '',
  // trailingSlash: true,            // optionnel, aide contre certains 404
};
