// Trengs kun dersom vi bruker precacheAndRoute(self.__WB_MANIFEST);
module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{css,js,html,webmanifest,ttf}', 'spillressurser/*'],
  swSrc: 'src/service-worker/workbox-service-worker.js',
  swDest: 'dist/sw.js',
};
