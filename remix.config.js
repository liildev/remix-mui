/** @type {import('@remix-run/dev').AppConfig} */
const { flatRoutes } = require("remix-flat-routes");

module.exports = {
  appDirectory: 'app',
  browserBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  devServerPort: 8002,
  serverModuleFormat: 'cjs',
  routes: async (defineRoutes) => {
    const routes = flatRoutes("routes", defineRoutes);
    return routes;
  }
};
