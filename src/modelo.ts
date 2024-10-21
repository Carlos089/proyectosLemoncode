export let puntuacion: number = 0; // Almaceno puntuacion

/*Funcion setter (NUEVO (creo esta funcion, debido a que no puedo reasignar la variable 
puntuacion a traves de su importacion a otros archivos))*/
export const setPuntuacion = (nuevaPuntuacion: number): void => {
  puntuacion = nuevaPuntuacion;
};

// Tipo para definir los diferentes estados del juego
export type Estado = 'CONSERVADOR' | 'CANGUELO' | 'CASI' | 'ENHORABUENA';

// Obtener mensaje correspondiente a cada estado del juego
export const getMensajeEstado = (estado: Estado): string => {
  switch (estado) {
    case 'CONSERVADOR':
      return `Has sido muy conservador, te has plantado con tan solo ${puntuacion}`;
    case 'CANGUELO':
      return `Te ha entrado el canguelo eh?, te has plantado con ${puntuacion}`;
    case 'CASI':
      return `Casi casi..., te plantaste con ${puntuacion}`;
    case 'ENHORABUENA':
      return `Lo has clavado! Enhorabuena!`;
    default:
      return '';
  }
};

// EXTRA: crear objeto partida y su metodo de ayuda para crear una partida
export const crearNuevaPartida = (): {
  puntuacion: number;
  activa: boolean;
  cartas: number[];
} => {
  return {
    puntuacion: 0,
    activa: true,
    cartas: [], // Inicia sin cartas
  };
};
