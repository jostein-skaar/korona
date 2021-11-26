import './style.css';

import Phaser from 'phaser';
import { calculateDimension, DimensionLimits, ScaleMode } from '@jostein-skaar/common-game';
import BestSene from './spill/best-sene';
import IntroSene from './spill/intro-sene';
import PreloadSene from './spill/preload-sene';
import SpillSene from './spill/spill-sene';
import StartinfoSene from './spill/startinfo-sene';
import TapSene from './spill/tap-sene';
import { registerServiceWorker } from './service-worker/workbox-registration';

const hackForIos = Date.now();
const erIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
let omstartVedResizeTimeout: any;
window.onresize = () => {
  if (erIos && Date.now() - hackForIos < 1000) {
    return;
  }

  clearTimeout(omstartVedResizeTimeout);
  omstartVedResizeTimeout = setTimeout(() => {
    window.location.reload();
  }, 200);
};

// Tips rundt retina og Phaser 3
// https://supernapie.com/blog/support-retina-with-phaser-3/

function lagKonfigurasjon(
  bredde: number,
  hoyde: number,
  skaleringsmetodePhaser: Phaser.Scale.ScaleModes,
  pikselratio: number,
  erDebug: boolean
): Phaser.Types.Core.GameConfig {
  const konfigurasjon: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    // type: Phaser.CANVAS,
    scene: [PreloadSene, IntroSene, BestSene, SpillSene, StartinfoSene, TapSene],
    parent: 'spillkonteiner',
    width: bredde * pikselratio,
    height: hoyde * pikselratio,
    dom: {
      createContainer: true,
    },
    backgroundColor: 0xfff6d5,
    autoFocus: true,
    render: {
      // antialias: false, er default, giving a crisper appearance.
      // antialias: true, giving a smooth appearance.
      // roundPixels: true, round pixel values to whole integers? Prevent sub-pixel aliasing.
      // pixelArt: true, gir antialias=false og roundPixels=true
    },

    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: erDebug,
      },
    },

    scale: {
      // Vi har denne som FIT først, for da vil canvas.style.width og .height settes automatisk.
      // Må fjernes etterpå, ellers vil rare ting skje i forbindelse med resize.
      mode: skaleringsmetodePhaser,
      // mode: Phaser.Scale.ScaleModes.NONE,
      // mode: Phaser.Scale.ScaleModes.FIT,
      autoCenter: Phaser.Scale.Center.CENTER_BOTH,
      // autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
      // autoCenter: Phaser.Scale.Center.CENTER_VERTICALLY,
      // expandParent: true

      // width: bredde * window.devicePixelRatio,
      // height: hoyde * window.devicePixelRatio,
      zoom: 1 / pikselratio,
      // autoRound: true,
    },
  };

  return konfigurasjon;
}

let erDebug = true;

if (import.meta.env.PROD) {
  erDebug = false;
}
// erDebug = false;

const begrensninger: DimensionLimits = {
  minsteRatio: 0.4,
  storsteRatio: 0.8,
  minsteBredde: 320,
  storsteBredde: 768,
  minsteHoyde: 800,
  storsteHoyde: 1024,
};

// iPad har faktisk størrelse på 768x1004 (når statuslinja er truket bort).
// Ratio må derfor være over 768/1004=0,76494... for å få full skjerm her. Velger 0,8.
// Når iPad er i Safari er det enda verre: 768x954. 768/954=0,80503... Det får så være.

let pikselratio = window.devicePixelRatio;
if (pikselratio !== 1 && pikselratio !== 2 && pikselratio !== 3) {
  pikselratio = 1;
}
// @ts-ignore
globalThis.pikselratio = pikselratio;

const dimensjonsresultat = calculateDimension(begrensninger, window.innerWidth, window.innerHeight);
const skaleringsmetodePhaser =
  dimensjonsresultat.skaleringsmetode === ScaleMode.Tilpass ? Phaser.Scale.ScaleModes.FIT : Phaser.Scale.ScaleModes.NONE;

const konfigurasjon = lagKonfigurasjon(dimensjonsresultat.bredde, dimensjonsresultat.hoyde, skaleringsmetodePhaser, pikselratio, erDebug);
new Phaser.Game(konfigurasjon);

registerServiceWorker();
