/* eslint-disable no-param-reassign */
import Phaser from 'phaser';
import { fiksForPikselratio } from '../hjelpere/fiks-for-pikselratio';
import hentResultatliste from '../hjelpere/hent-resultatliste';
import spillressursinfo from './spillressursinfo';
import Spillressursinfo from './spillressursinfo.modell';

class BestSene extends Phaser.Scene {
  bredde: number;

  hoyde: number;

  innstillinger: Spillressursinfo;

  constructor() {
    super('best-sene');
  }

  init(): void {
    this.bredde = this.game.scale.gameSize.width;
    this.hoyde = this.game.scale.gameSize.height;

    this.innstillinger = spillressursinfo(this.bredde, this.hoyde);
  }

  create(): void {
    this.physics.add
      .image(this.innstillinger.ikoner.bredde, this.innstillinger.ikoner.hoyde, this.innstillinger.ikoner.id, 0)
      .setInteractive()
      .on('pointerup', () => {
        this.scene.start('intro-sene');
      });

    const fontstorrelse1 = fiksForPikselratio(50);
    this.add
      .text(this.bredde / 2, fiksForPikselratio(80), 'Topp 25', {
        fontFamily: 'Kanit',
        fontSize: `${fontstorrelse1}px`,
        color: '#000000',
      })
      .setOrigin(0.5, 0.5);

    const fontstorrelse2 = fiksForPikselratio(18);
    this.add
      .text(this.bredde / 2, fiksForPikselratio(125), 'på denne enheten', {
        fontFamily: 'Kanit',
        fontSize: `${fontstorrelse2}px`,
        color: '#000000',
      })
      .setOrigin(0.5, 0.5);

    const resultatliste = hentResultatliste();
    const innerHtml = resultatliste.map((resultat) => `<li>${resultat.navn}: ${resultat.poeng}</li>`).join('');

    const resultatOl = this.add.dom(fiksForPikselratio(80), fiksForPikselratio(150), 'ol', `font: ${fiksForPikselratio(18)}px Arial;`);
    resultatOl.node.innerHTML = innerHtml;

    const fontstorrelse4 = fiksForPikselratio(18);
    this.add
      .text(this.bredde / 2, this.hoyde - fiksForPikselratio(50), 'Klikk på pilen oppe for å gå tilbake', {
        fontFamily: 'Kanit',
        fontSize: `${fontstorrelse4}px`,
        color: '#000000',
      })
      .setOrigin(0.5, 0.5);

    const fontstorrelse5 = fiksForPikselratio(14);
    this.add
      .text(this.bredde, 0, 'Versjon {VERSJON}', {
        fontFamily: 'Kanit',
        fontSize: `${fontstorrelse5}px`,
        color: '#000000',
      })
      .setOrigin(1, 0);
  }
}

export default BestSene;
