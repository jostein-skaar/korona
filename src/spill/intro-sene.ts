/* eslint-disable no-param-reassign */
import Phaser from 'phaser';
import { fiksForPikselratio } from '../hjelpere/fiks-for-pikselratio';
import spillressursinfo from './spillressursinfo';
import Spillressursinfo from './spillressursinfo.modell';

class IntroSene extends Phaser.Scene {
  spillernavn: string = localStorage.getItem('spillernavn') ?? '';

  bredde: number;

  hoyde: number;

  innstillinger: Spillressursinfo;

  constructor() {
    super('intro-sene');
  }

  init(): void {
    this.bredde = this.game.scale.gameSize.width;
    this.hoyde = this.game.scale.gameSize.height;

    this.innstillinger = spillressursinfo(this.bredde, this.hoyde);
  }

  create(): void {
    this.innputt();

    this.logoOgTekst();

    this.lagetAv();

    this.knapper();
  }

  private logoOgTekst() {
    const logoBredde = fiksForPikselratio(600);
    const logoHoyde = this.innstillinger.introHelt.hoyde;
    const logoMargin = fiksForPikselratio(10);

    const magiskDiffMellomBreddeOgLogoKonteiner =
      logoBredde > this.bredde - logoMargin * 2 ? logoMargin * 2 : (this.bredde - logoBredde) / 2;

    // Plasser helt litt til venstre for skjermen.
    const helt = this.physics.add.sprite(
      -this.innstillinger.introHelt.bredde / 2 - magiskDiffMellomBreddeOgLogoKonteiner,
      logoHoyde / 2,
      this.innstillinger.introHelt.id
    );

    // Plasser fiende litt til høyre for skjermen.
    const fiende = this.physics.add.sprite(
      logoBredde + this.innstillinger.introFiende.bredde / 2 + magiskDiffMellomBreddeOgLogoKonteiner,
      logoHoyde / 2,
      this.innstillinger.introFiende.id
    );

    const fontstorrelse1 = fiksForPikselratio(60);
    const fontstorrelse2 = fiksForPikselratio(50);

    const tekstHelt = this.add.text(fiksForPikselratio(15), fiksForPikselratio(0), 'Såpus', {
      fontFamily: 'Kanit',
      fontSize: `${fontstorrelse1}px`,
      fontStyle: '700',
      color: '#fef122',
      stroke: '#000000',
      strokeThickness: fiksForPikselratio(3),
    });
    const tekstVs = this.add.text(fiksForPikselratio(46), fiksForPikselratio(53), 'mot', {
      fontFamily: 'Kanit',
      fontSize: `${fontstorrelse2}px`,
      fontStyle: '700',
      color: '#000000',
    });
    const tekstFiende = this.add.text(fiksForPikselratio(0), fiksForPikselratio(80), 'Korona', {
      fontFamily: 'Kanit',
      fontSize: `${fontstorrelse1}px`,
      fontStyle: '700',
      color: '#ff5858',
      stroke: '#000000',
      strokeThickness: fiksForPikselratio(3),
    });

    const tekstKonteiner = this.add.container(0, 0, [tekstHelt, tekstVs, tekstFiende]).setAlpha(0);
    tekstKonteiner.setSize(tekstFiende.width, tekstHelt.height + tekstVs.height + tekstFiende.height);
    // console.log(tekstKonteiner.width, tekstKonteiner.height);
    tekstKonteiner.setPosition(
      logoBredde / 2 - tekstKonteiner.width / 2,
      logoHoyde / 2 - tekstKonteiner.height / 2 + fiksForPikselratio(25)
    );

    const logoKonteiner = this.add.container(0, 0, [helt, fiende, tekstKonteiner]);
    logoKonteiner.setSize(logoBredde, logoHoyde);

    if (logoBredde > this.bredde - logoMargin * 2) {
      const skalering = (this.bredde - logoMargin * 2) / logoBredde;
      logoKonteiner.setScale(skalering);
      // console.log('Skalerte logoKonteiner:', skalering);
    }

    logoKonteiner.setX(this.bredde / 2 - logoKonteiner.displayWidth / 2);
    logoKonteiner.setY(fiksForPikselratio(50));

    this.tweens.add({
      targets: helt,
      x: this.innstillinger.introHelt.bredde / 2,
      ease: 'Power1',
      duration: 1500,
    });

    this.tweens.add({
      targets: fiende,
      x: logoBredde - this.innstillinger.introFiende.bredde / 2,
      ease: 'Power1',
      duration: 1500,
    });

    this.tweens.add({
      targets: tekstKonteiner,
      alpha: 1,
      ease: 'Power0',
      delay: 0,
      duration: 1000,
    });

    helt.anims.create({
      key: 'blunk',
      frames: this.anims.generateFrameNumbers(this.innstillinger.introHelt.id, { frames: [1, 0] }),
      frameRate: 7,
      repeat: 1,
    });

    fiende.anims.create({
      key: 'blunk',
      frames: this.anims.generateFrameNumbers(this.innstillinger.introFiende.id, { frames: [1, 0] }),
      frameRate: 7,
      repeat: 1,
    });

    setTimeout(() => {
      if (!helt.anims) {
        // Vi har visst forlatt senen allerede.
        return;
      }
      helt.anims.play('blunk', true);
      this.time.addEvent({
        callback: () => {
          helt.anims.play('blunk', true);
        },
        callbackScope: this,
        delay: 5000,
        loop: true,
      });
    }, 1000);

    setTimeout(() => {
      if (!fiende.anims) {
        // Vi har visst forlatt senen allerede.
        return;
      }
      fiende.anims.play('blunk', true);
      this.time.addEvent({
        callback: () => {
          fiende.anims.play('blunk', true);
        },
        callbackScope: this,
        delay: 5000,
        loop: true,
      });
    }, 3500);
  }

  private innputt() {
    // TODO: Flytt til innstillinger?
    const innputtSpillernavn = this.add.dom(
      this.bredde / 2,
      this.hoyde / 2,
      'input',
      `width: 80%; max-width: ${fiksForPikselratio(350)}px; font: ${fiksForPikselratio(30)}px Kanit;`
    );
    innputtSpillernavn.node.setAttribute('placeholder', 'Hva heter du?');
    innputtSpillernavn.node.setAttribute('maxlength', '16');
    innputtSpillernavn.node.setAttribute('onfocus', 'this.placeholder = ""');
    innputtSpillernavn.node.setAttribute('onblur', 'this.placeholder = "Hva heter du?"');
    innputtSpillernavn.node.setAttribute('value', this.spillernavn);
    innputtSpillernavn.node.addEventListener('input', (e: any) => {
      console.log('Spillernavn er endret', e, e.target.value);
      this.spillernavn = e.target.value;
      localStorage.setItem('spillernavn', this.spillernavn);
    });
  }

  private knapper() {
    const breddeEnKnapp = this.innstillinger.knapper.bredde;
    const hoydeEnKnapp = this.innstillinger.knapper.hoyde;
    const margin = fiksForPikselratio(10);

    const knapp0 = this.physics.add
      .image(0, 0, this.innstillinger.knapper.id, 0)
      .setOrigin(0, 0)
      .setInteractive()
      .on('pointerup', () => {
        this.startNyttSpill(1);
      });

    const knapp1 = this.physics.add
      .image((breddeEnKnapp + margin) * 1, 0, this.innstillinger.knapper.id, 1)
      .setOrigin(0, 0)
      .setInteractive()
      .on('pointerup', () => {
        this.startNyttSpill(2);
      });
    const knapp2 = this.physics.add
      .image((breddeEnKnapp + margin) * 2, 0, this.innstillinger.knapper.id, 2)
      .setOrigin(0, 0)
      .setInteractive()
      .on('pointerup', () => {
        this.scene.start('best-sene');
      });

    const breddeKonteiner = breddeEnKnapp * 3 + margin * 2;
    const hoydeKonteiner = hoydeEnKnapp;
    let skalering = 1;
    if (breddeKonteiner > this.bredde - margin * 2) {
      skalering = (this.bredde - margin * 2) / breddeKonteiner;
      console.log('Skalerte konteiner:', skalering);
    }

    const xKonteiner = (this.bredde - breddeKonteiner * skalering) / 2;
    const yKonteiner = this.hoyde / 2 + fiksForPikselratio(100);
    this.add.container(xKonteiner, yKonteiner, [knapp0, knapp1, knapp2]).setSize(breddeKonteiner, hoydeKonteiner).setScale(skalering);
  }

  private lagetAv() {
    const fontstorrelse4 = fiksForPikselratio(18);
    this.add
      .text(this.bredde / 2, this.hoyde - fiksForPikselratio(50), 'Laget av Aron, Else og Jostein', {
        fontFamily: 'Kanit',
        fontSize: `${fontstorrelse4}px`,
        color: '#000000',
      })
      .setOrigin(0.5, 0.5);
  }

  private startNyttSpill(vanskelighetsgrad: number) {
    this.scene.sleep();
    const visInfo = vanskelighetsgrad === 1;
    this.scene.start('spill-sene', { spillernavn: this.spillernavn || 'Anonym', visInfo, vanskelighetsgrad });
  }
}

export default IntroSene;
