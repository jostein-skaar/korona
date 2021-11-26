import hentResultatliste from './hent-resultatliste';
import Resultat from './resultat.modell';

function lagreResultatliste(nyttResultat: Resultat): void {
  const resultatliste = hentResultatliste();
  resultatliste.push(nyttResultat);
  resultatliste.sort((a, b) => b.poeng - a.poeng);
  const nyResultatliste = resultatliste.slice(0, 25);
  localStorage.setItem('resultatliste', JSON.stringify(nyResultatliste));
}

export default lagreResultatliste;
