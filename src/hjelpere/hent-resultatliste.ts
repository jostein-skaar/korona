import Resultat from './resultat.modell';

function hentResultatliste(): Resultat[] {
  let resultatliste: Resultat[] = [];
  const resultatlisteString = localStorage.getItem('resultatliste');
  if (resultatlisteString) {
    resultatliste = JSON.parse(resultatlisteString) as Resultat[];
    resultatliste.sort((a, b) => b.poeng - a.poeng);
  }
  return resultatliste;
}

export default hentResultatliste;
