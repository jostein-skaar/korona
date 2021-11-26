/* eslint-disable no-param-reassign */
import Phaser from 'phaser';
import spillressursinfo from './spillressursinfo';
import Spillressursinfo from './spillressursinfo.modell';

class PreloadSene extends Phaser.Scene {
  bredde: number;

  hoyde: number;

  innstillinger: Spillressursinfo;

  constructor() {
    super('preload-sene');
  }

  init(): void {
    this.bredde = this.game.scale.gameSize.width;
    this.hoyde = this.game.scale.gameSize.height;
    console.log('Init preload-sene.');

    this.innstillinger = spillressursinfo(this.bredde, this.hoyde);
  }

  preload(): void {
    // console.table(this.innstillinger);

    this.load.spritesheet(this.innstillinger.ikoner.id, this.innstillinger.ikoner.url, {
      frameWidth: this.innstillinger.ikoner.bredde,
      frameHeight: this.innstillinger.ikoner.hoyde,
      margin: 0,
      spacing: 0,
    });

    this.load.spritesheet(this.innstillinger.knapper.id, this.innstillinger.knapper.url, {
      frameWidth: this.innstillinger.knapper.bredde,
      frameHeight: this.innstillinger.knapper.hoyde,
      margin: 0,
      spacing: 0,
    });

    this.load.spritesheet(this.innstillinger.introHelt.id, this.innstillinger.introHelt.url, {
      frameWidth: this.innstillinger.introHelt.bredde,
      frameHeight: this.innstillinger.introHelt.hoyde,
      margin: 1,
      spacing: 2,
    });

    this.load.spritesheet(this.innstillinger.introFiende.id, this.innstillinger.introFiende.url, {
      frameWidth: this.innstillinger.introFiende.bredde,
      frameHeight: this.innstillinger.introFiende.hoyde,
      margin: 1,
      spacing: 2,
    });

    this.load.spritesheet(this.innstillinger.helt.id, this.innstillinger.helt.url, {
      frameWidth: this.innstillinger.helt.bredde,
      frameHeight: this.innstillinger.helt.hoyde,
      margin: 1,
      spacing: 2,
    });

    this.load.spritesheet(this.innstillinger.fiende.id, this.innstillinger.fiende.url, {
      frameWidth: this.innstillinger.fiende.bredde,
      frameHeight: this.innstillinger.fiende.hoyde,
      margin: 1,
      spacing: 2,
    });

    this.load.image(this.innstillinger.sapekule.id, this.innstillinger.sapekule.url);
  }

  create(): void {
    this.scene.start('intro-sene');
  }
}

export default PreloadSene;
