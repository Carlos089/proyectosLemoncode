interface Partida {
  puntuacion: number;
  activa: boolean;
  cartas: number[];
  verQuePasaMode: boolean;
}

export type Estado = 'CONSERVADOR' | 'CANGUELO' | 'CASI' | 'ENHORABUENA';

export let partida: Partida = {
  puntuacion: 0,
  activa: true,
  cartas: [],
  verQuePasaMode: false,
};
