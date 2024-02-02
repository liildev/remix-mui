/** @type {import('@remix-run/dev').AppConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { flatRoutes } = require("remix-flat-routes");

module.exports = {
  appDirectory: "app",
  browserBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "build",
  devServerPort: 8002,
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  routes: async (defineRoutes) => {
    const routes = flatRoutes("routes", defineRoutes);
    return routes;
  },
};
