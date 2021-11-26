import Phaser from 'phaser';
import { fiksForPikselratio } from '../hjelpere/fiks-for-pikselratio';

class StartinfoSene extends Phaser.Scene {
  bredde: number;

  hoyde: number;

  spillernavn: string;

  vanskelighetsgrad: number;

  constructor() {
    super({ key: 'startinfo-sene' });
  }

  init(data: any): void {
    this.bredde = this.game.scale.gameSize.width;
    this.hoyde = this.game.scale.gameSize.height;
    this.spillernavn = data.spillernavn;
    this.vanskelighetsgrad = data.vanskelighetsgrad;
  }

  create(): void {
    const tekst = `Er du klar?\nDet blir vanskeligere etter hvert.\nTrykk for å starte!`;
    this.add
      .text(this.bredde / 2, this.hoyde / 2, tekst, {
        fontFamily: 'Kanit',
        fontSize: `${fiksForPikselratio(20)}px`,
        color: '#000',
        align: 'center',
        backgroundColor: '#c6d4b7',
        padding: { x: 10, y: 10 },
      })
      .setOrigin(0.5, 0.5);

    setTimeout(() => {
      this.input.once('pointerup', () => {
        this.scene.start('spill-sene', { spillernavn: this.spillernavn, vanskelighetsgrad: this.vanskelighetsgrad });
      });
    }, 100);
  }
}

export default StartinfoSene;
