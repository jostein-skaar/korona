/* eslint-disable */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { precacheAndRoute } = workbox.precaching;
const { pageCache, imageCache, staticResourceCache, offlineFallback } = workbox.recipes;

// Hentet fra:
// https://developers.google.com/web/tools/workbox/modules/workbox-recipes

// Include offline.html in the manifest
precacheAndRoute([{"revision":"c51c75bb6a20b52a18c192ec4b723534","url":"assets/index.dc64dbc1.js"},{"revision":"994f77a50a446127fc4c9203d5dac4fa","url":"assets/index.eb181a13.css"},{"revision":"183359f0df6741eb48e1ded6f7db8516","url":"assets/vendor.666cb11d.js"},{"revision":"b935eb6769e902b3b0086459a7c55a05","url":"fonter/Kanit-Regular.ttf"},{"revision":"9dee8e830738eb57f246fe697b05a99e","url":"index.html"},{"revision":"a6c48faf99ba73e215c58c4a0e1b40f5","url":"manifest.webmanifest"},{"revision":"6602c2def035d4f3353e47f1fba15f74","url":"offline.html"},{"revision":"439ce1552c38b8795fe190914daf19f1","url":"spillressurser/fiende-sprite@1.png"},{"revision":"cfcb08bd0c1b872d099b51d1e3c0974f","url":"spillressurser/fiende-sprite@2.png"},{"revision":"04ed9c03e3bd9892e2a6c3db7bb588b3","url":"spillressurser/fiende-sprite@3.png"},{"revision":"87b60ed54f15715e75042f7874aaa37a","url":"spillressurser/helt-sprite@1.png"},{"revision":"cb90c65f990860319c3d83999d52624d","url":"spillressurser/helt-sprite@2.png"},{"revision":"cffa9f56d64e08777d7da092d99c4cd5","url":"spillressurser/helt-sprite@3.png"},{"revision":"073ba944c4ac53da7aa1f7863bf79a81","url":"spillressurser/ikoner-sprite@1.png"},{"revision":"2bf889b0e0786ec6cf38a8f1cd3b4ec2","url":"spillressurser/ikoner-sprite@2.png"},{"revision":"85537b152100a42a9728f8d398ab8e27","url":"spillressurser/ikoner-sprite@3.png"},{"revision":"272e2cf59c9dc0532bc4c591067358d4","url":"spillressurser/intro-korona-sprite@1.png"},{"revision":"7ca00a0b4695fcbb46eca7f77d86a112","url":"spillressurser/intro-korona-sprite@2.png"},{"revision":"60cbbc8ca6bd45b01c2e12d84a15da44","url":"spillressurser/intro-korona-sprite@3.png"},{"revision":"84649d3940b2c352ea487705ef3c7b4b","url":"spillressurser/intro-sapus-sprite@1.png"},{"revision":"965233576ee8d27454a76eea5c8fe214","url":"spillressurser/intro-sapus-sprite@2.png"},{"revision":"9dfb4b64436b74d2f968ae65d176c2ed","url":"spillressurser/intro-sapus-sprite@3.png"},{"revision":"5c7f6782ef86afce685db770a3dab774","url":"spillressurser/knapper-sprite@1.png"},{"revision":"8236c8e05431d1205a3ab69efc9da3aa","url":"spillressurser/knapper-sprite@2.png"},{"revision":"34c86f60bf8d1bf16922671d9cfa6fe9","url":"spillressurser/knapper-sprite@3.png"},{"revision":"29652b35e622b9fdb257759f231187cc","url":"spillressurser/sapekule-sprite@1.png"},{"revision":"415b3d737a2ed17788a1b14e85d6e62b","url":"spillressurser/sapekule-sprite@2.png"},{"revision":"1a5bedf9970f595994b1a81dfac13198","url":"spillressurser/sapekule-sprite@3.png"}]);

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
