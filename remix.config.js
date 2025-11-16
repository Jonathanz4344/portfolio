/** @type {import('@remix-run/dev').AppConfig} */
const config = {
  ignoredRouteFiles: ['**/.*'],
  assetsBuildDirectory: 'public/build',
  serverBuildPath: 'build/server/index.js',
  serverModuleFormat: 'cjs',
};

export default config;
