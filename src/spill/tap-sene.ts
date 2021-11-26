import Phaser from 'phaser';
import { fiksForPikselratio } from '../hjelpere/fiks-for-pikselratio';
import Resultat from '../hjelpere/resultat.modell';

class TapSene extends Phaser.Scene {
  bredde: number;

  hoyde: number;

  forrigeResultat: Resultat;

  vanskelighetsgrad: number;

  constructor() {
    super({ key: 'tap-sene' });
  }

  init(data: any): void {
    this.bredde = this.game.scale.gameSize.width;
    this.hoyde = this.game.scale.gameSize.height;
    this.forrigeResultat = data.resultat;
    this.vanskelighetsgrad = data.vanskelighetsgrad;
  }

  create(): void {
    const tekst = `Du klarte ${this.forrigeResultat.poeng}\nTrykk for å prøve igjen`;
    this.add
      .text(this.bredde / 2, this.hoyde / 2, tekst, {
        fontFamily: 'Kanit',
        fontSize: `${fiksForPikselratio(25)}px`,
        color: '#000',
        align: 'center',
        backgroundColor: '#c6d4b7',
        padding: { x: 10, y: 10 },
      })
      .setOrigin(0.5, 0.5);

    // const gaTilIntroSeneTimeout = setTimeout(() => {
    //   this.scene.setVisible(false, 'spill-sene');
    //   this.scene.start('intro-sene');
    // }, 30000);

    setTimeout(() => {
      this.input.once('pointerup', () => {
        // clearTimeout(gaTilIntroSeneTimeout);
        this.scene.start('spill-sene', {
          spillernavn: this.forrigeResultat.navn,
          vanskelighetsgrad: this.vanskelighetsgrad,
        });
      });
    }, 500);
  }
}

export default TapSene;
