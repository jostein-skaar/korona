/* eslint-disable no-param-reassign */
import Phaser from 'phaser';
import { fiksForPikselratio } from '../hjelpere/fiks-for-pikselratio';
import lagreResultatliste from '../hjelpere/lagre-resultatliste';
import Resultat from '../hjelpere/resultat.modell';
import spillressursinfo from './spillressursinfo';
import Spillressursinfo from './spillressursinfo.modell';

class SpillSene extends Phaser.Scene {
  bredde: number;

  hoyde: number;

  helt: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  fiendegruppe: Phaser.Physics.Arcade.Group;

  sapekulegruppe: Phaser.Physics.Arcade.Group;

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  poeng: number;

  fiendeTeller: number;

  antallFienderINiva = 25;

  antallPerRad: number;

  fartVanskelighetsgrad2: number;

  spillernavn: string;

  vanskelighetsgrad: number;

  poengtekst: Phaser.GameObjects.Text;

  nivaFerdigTekst: Phaser.GameObjects.Text;

  ikonTilbake: Phaser.GameObjects.Image;

  innstillinger: Spillressursinfo;

  // pekerposisjonX: number;

  pekerposisjonFerdigKlikka: Phaser.Types.Math.Vector2Like;

  constructor() {
    super('spill-sene');
  }

  init(data: any): void {
    // console.log('data:', data);
    this.bredde = this.game.scale.gameSize.width;
    this.hoyde = this.game.scale.gameSize.height;

    this.spillernavn = data.spillernavn;
    this.innstillinger = spillressursinfo(this.bredde, this.hoyde);

    this.vanskelighetsgrad = data.vanskelighetsgrad;

    this.antallPerRad = Math.floor(this.bredde / this.innstillinger.fiende.bredde);
    this.fartVanskelighetsgrad2 = this.beregnFartBasertPaBredde();

    if (data.visInfo) {
      this.visStartinfo();
    }

    console.log(this.vanskelighetsgrad);

    // if (this.vanskelighetsgrad === 2) {
    //   this.antallFienderINiva = 10;
    // }

    console.table({ bredde: this.bredde, hoyde: this.hoyde });

    this.poeng = 0;
    this.fiendeTeller = 0;
  }

  preload(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create(): void {
    this.helt = this.physics.add
      // @ts-ignore
      .sprite(this.innstillinger.helt.plasseringX, this.innstillinger.helt.plasseringY, this.innstillinger.helt.id)
      .setCollideWorldBounds(true);

    // Endre størrelsen på treffområdet for helten.
    this.helt.setBodySize(this.helt.width * 0.7, this.helt.height * 0.7);

    this.ikonTilbake = this.physics.add
      .image(this.innstillinger.ikoner.bredde, this.innstillinger.ikoner.hoyde, this.innstillinger.ikoner.id, 0)
      .setDepth(1)
      .setInteractive()
      .on('pointerup', () => {
        this.scene.start('intro-sene');
      });

    this.sapekulegruppe = this.physics.add.group();
    this.fiendegruppe = this.physics.add.group();

    this.physics.add.collider(
      this.sapekulegruppe,
      this.fiendegruppe,
      // @ts-ignore
      (sapekule: Phaser.Physics.Arcade.Image, fiende: Phaser.Physics.Arcade.Image) => {
        const ekstraSynlighetsmargin = fiksForPikselratio(10);
        if (fiende.y < -(this.innstillinger.fiende.hoyde / 2) + ekstraSynlighetsmargin) {
          return;
        }
        // console.table({ fiendex: fiende.x, fiendey: fiende.y, sapekulex: sapekule.x, sapekuley: sapekule.y });
        // Noen ganger treffer den to fiender ca samtidig. Da skal kun en av dem forsvinne.
        if (!sapekule.visible) {
          return;
        }
        fiende.disableBody(true, true);
        sapekule.disableBody(true, true);
        this.poeng += 1;
        this.poengtekst.setText(this.hentPoengtekst());
      }
    );

    // @ts-ignore
    this.physics.add.collider(this.helt, this.fiendegruppe, (helt: Phaser.Physics.Arcade.Image, fiende: Phaser.Physics.Arcade.Image) => {
      const ekstraSynlighetsmargin = fiksForPikselratio(10);
      if (fiende.y < -(this.innstillinger.fiende.hoyde / 2) + ekstraSynlighetsmargin) {
        return;
      }
      helt.setTint(0xff0000);
      this.tap();
    });

    this.poengtekst = this.add
      .text(fiksForPikselratio(15), this.hoyde - fiksForPikselratio(70), this.hentPoengtekst(), {
        fontFamily: 'Kanit',
        fontSize: `${fiksForPikselratio(20)}px`,
        color: '#000',
      })
      .setDepth(1);

    this.time.addEvent({
      callback: this.skyt,
      callbackScope: this,
      delay: this.innstillinger.sapekule.intervall,
      loop: true,
    });

    if (this.vanskelighetsgrad === 1) {
      this.time.addEvent({
        callback: this.nyFiende,
        callbackScope: this,
        delay: this.innstillinger.fiende.intervall,
        loop: true,
      });
    } else if (this.vanskelighetsgrad === 2) {
      const pauseMellomFienderad = this.innstillinger.fiende.hoyde / this.fartVanskelighetsgrad2;
      this.time.addEvent({
        callback: this.nyFiendeRad,
        callbackScope: this,
        delay: pauseMellomFienderad * 1000,
        loop: true,
      });
    }
  }

  update(): void {
    if (this.input.activePointer.isDown) {
      const { x, y } = this.input.activePointer;
      if (!this.ikonTilbake.getBounds().contains(x, y)) {
        this.helt.setPosition(x, y - fiksForPikselratio(50));
      }
    } else {
      this.handterTastatur();
    }

    // @ts-ignore
    this.sapekulegruppe.children.iterate((sapekule: Phaser.Physics.Arcade.Image) => {
      if (sapekule.y < 0) {
        sapekule.disableBody(true, true);
      }
    });

    // @ts-ignore
    this.fiendegruppe.children.iterate((fiende: Phaser.Physics.Arcade.Sprite) => {
      if (fiende.y > this.hoyde) {
        this.tap();
      }
    });
  }

  private handterTastatur() {
    let retningX = 0;
    let retningY = 0;
    if (this.cursors.left.isDown) {
      retningX = -1;
    } else if (this.cursors.right.isDown) {
      retningX = 1;
    } else {
      retningX = 0;
    }
    if (this.cursors.up.isDown) {
      retningY = -1;
    } else if (this.cursors.down.isDown) {
      retningY = 1;
    } else {
      retningY = 0;
    }
    let fartX = retningX * this.innstillinger.helt.fart;
    let fartY = retningY * this.innstillinger.helt.fart;
    if (retningX && retningY) {
      // Pytagoras med like a og b. Begrense farten når vi går på skrå.
      fartX /= Math.sqrt(2);
      fartY /= Math.sqrt(2);
    }
    this.helt.setVelocity(fartX, fartY);
  }

  private skyt() {
    let sapekule: Phaser.Physics.Arcade.Image = this.sapekulegruppe.getFirstDead();

    const { x, y } = this.helt;
    const yTuppen = y - this.helt.height / 2;

    if (sapekule) {
      sapekule.enableBody(true, x, yTuppen, true, true);
    } else {
      sapekule = this.sapekulegruppe.create(x, yTuppen, 'sapekule');
      sapekule.setDepth(-1);
    }

    sapekule.setImmovable(true).setVelocityY(-this.innstillinger.sapekule.fart);
  }

  private nyFiende() {
    let fiende: Phaser.Physics.Arcade.Image = this.fiendegruppe.getFirstDead();

    const x = Phaser.Math.Between(0 + this.innstillinger.fiende.bredde, this.bredde - this.innstillinger.fiende.bredde);
    const y = -this.innstillinger.fiende.hoyde / 2;

    if (fiende) {
      fiende.enableBody(true, x, y, true, true);
    } else {
      fiende = this.fiendegruppe.create(x, y, this.innstillinger.fiende.id);
    }

    fiende.setImmovable(true).setVelocityY(this.beregnFartBasertPaAntallFiender());

    this.fiendeTeller += 1;
  }

  private nyFiendeRad() {
    const luftTilOvers = this.bredde % this.innstillinger.fiende.bredde;
    for (let index = 0; index < this.antallPerRad; index += 1) {
      const x = luftTilOvers / 2 + this.innstillinger.fiende.bredde / 2 + this.innstillinger.fiende.bredde * index;
      const y = -this.innstillinger.fiende.hoyde / 2;
      let fiende: Phaser.Physics.Arcade.Image = this.fiendegruppe.getFirstDead();
      if (fiende) {
        fiende.enableBody(true, x, y, true, true);
        // fiende.setFrame(Phaser.Math.Between(0, 1));
      } else {
        fiende = this.fiendegruppe.create(x, y, this.innstillinger.fiende.id);
      }

      fiende.setImmovable(true).setVelocityY(this.fartVanskelighetsgrad2);
      this.fiendeTeller += 1;
    }
  }

  private beregnFartBasertPaAntallFiender(): number {
    const niva = Math.floor(this.fiendeTeller / this.antallFienderINiva) + 1;
    const fart = this.innstillinger.fiende.fart * niva;
    // console.log({ fart, niva });
    return fart;
  }

  private beregnFartBasertPaBredde(): number {
    const finFartVed15Stykk = fiksForPikselratio(30);

    const forhold = 15 / this.antallPerRad;
    const fart = finFartVed15Stykk * forhold;

    console.log('fart', fart);
    return fart;
  }

  private hentPoengtekst(): string {
    const tekst = `Koronaer: ${this.poeng}`;
    return tekst;
  }

  private tap() {
    this.scene.pause();
    this.cameras.main.setBackgroundColor(0xbababa);
    this.cameras.main.setAlpha(0.5);

    console.log('this.hentPoengtekst', this.hentPoengtekst());
    console.log('this.poeng', this.poeng);
    const resultat: Resultat = { navn: this.spillernavn, poeng: this.poeng };
    console.log('resultat', resultat);
    if (this.poeng > 0) {
      lagreResultatliste(resultat);
    }

    this.scene.launch('tap-sene', { resultat, vanskelighetsgrad: this.vanskelighetsgrad });

    console.log('Ferdig i tap().');
    // this.nullstillSpill();
  }

  private visStartinfo() {
    this.scene.pause();
    this.scene.launch('startinfo-sene', { spillernavn: this.spillernavn, vanskelighetsgrad: this.vanskelighetsgrad });
  }
}

export default SpillSene;
