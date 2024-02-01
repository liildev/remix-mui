/** @type {import('@remix-run/dev').AppConfig} */
const { flatRoutes } = require("remix-flat-routes");

// import "swiper/swiper.min.css";
// import "swiper/css/navigation";
module.exports = {
  appDirectory: 'app',
  browserBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  devServerPort: 8002,
  serverModuleFormat: 'cjs',
  serverDependenciesToBundle: [
    /^@adobe\/react-spectrum/,
    /^@react-spectrum/,
    /^@spectrum-icons/,
  ],
  routes: async (defineRoutes) => {
    const routes = flatRoutes("routes", defineRoutes);
    return routes;
  }
};
