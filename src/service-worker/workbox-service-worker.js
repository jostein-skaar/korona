/* eslint-disable */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { precacheAndRoute } = workbox.precaching;
const { pageCache, imageCache, staticResourceCache, offlineFallback } = workbox.recipes;

// Hentet fra:
// https://developers.google.com/web/tools/workbox/modules/workbox-recipes

// Include offline.html in the manifest
precacheAndRoute(self.__WB_MANIFEST);

pageCache();

staticResourceCache();

imageCache();

offlineFallback();

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('SW: Mottok melding om SKIP_WAITING.');
    self.skipWaiting();
  }
});
