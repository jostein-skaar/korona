/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
enum Skjermstrategi {
  Staende, // Hvis stående og liten dings, fyll hele skjermen.
  Liggende, // Hvis liggende og liten dings, fyll hele skjermen.
  StaendeEllerLiggende, // Hvis liten skjerm, fyll hele skjermen.
}

export default Skjermstrategi;

/*
Skjermstrategier:
- Tilpasse små skjermer stående
- Tilpasse små skjermer liggende
- Tilpasse alle små skjermer, både liggende og stående
*/
