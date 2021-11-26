import { fiksForPikselratio } from '../hjelpere/fiks-for-pikselratio';
import Spillressursinfo from './spillressursinfo.modell';

function spillressursinfo(bredde: number, hoyde: number): Spillressursinfo {
  const info: Spillressursinfo = {
    introHelt: {
      id: 'intro-sapus',
      url: `/spillressurser/intro-sapus-sprite@${fiksForPikselratio(1)}.png`,
      bredde: fiksForPikselratio(180),
      hoyde: fiksForPikselratio(300),
    },
    introFiende: {
      id: 'intro-korona',
      url: `/spillressurser/intro-korona-sprite@${fiksForPikselratio(1)}.png`,
      bredde: fiksForPikselratio(200),
      hoyde: fiksForPikselratio(200),
    },
    ikoner: {
      id: 'ikoner',
      url: `/spillressurser/ikoner-sprite@${fiksForPikselratio(1)}.png`,
      bredde: fiksForPikselratio(48),
      hoyde: fiksForPikselratio(48),
    },
    helt: {
      id: 'helt',
      url: `/spillressurser/helt-sprite@${fiksForPikselratio(1)}.png`,
      fart: fiksForPikselratio(600),
      bredde: fiksForPikselratio(50),
      hoyde: fiksForPikselratio(55),
      plasseringX: bredde / 2,
      plasseringY: hoyde - fiksForPikselratio(100),
    },
    fiende: {
      id: 'fiende',
      url: `/spillressurser/fiende-sprite@${fiksForPikselratio(1)}.png`,
      fart: fiksForPikselratio(50),
      // fart: fiksForPikselratio(600),
      bredde: fiksForPikselratio(50),
      hoyde: fiksForPikselratio(50),
      intervall: 300,
    },
    sapekule: {
      id: 'sapekule',
      url: `/spillressurser/sapekule-sprite@${fiksForPikselratio(1)}.png`,
      fart: fiksForPikselratio(400),
      bredde: fiksForPikselratio(15),
      hoyde: fiksForPikselratio(20),
      intervall: 100,
    },
    knapper: {
      id: 'knapper',
      url: `/spillressurser/knapper-sprite@${fiksForPikselratio(1)}.png`,
      bredde: fiksForPikselratio(100),
      hoyde: fiksForPikselratio(100),
    },
  };

  return info;
}

export default spillressursinfo;
