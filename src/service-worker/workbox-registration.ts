import { Workbox } from 'workbox-window';

export function registerServiceWorker() {
  if (location.protocol !== 'http:' && 'serviceWorker' in navigator) {
    console.log('Korona: About to registering service worker.');
    const wb = new Workbox('/sw.js');
    wb.register();
  }
}
