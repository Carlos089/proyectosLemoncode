import { partida, Estado } from './modelo';

const dameNumeroAleatorio = (): number => Math.floor(Math.random() * 10) + 1;

export const dameNumeroCarta = (numeroAleatorio: number): number =>
  numeroAleatorio > 7 ? numeroAleatorio + 2 : numeroAleatorio;

export const obtenerPuntosCarta = (numeroCarta: number): number =>
  numeroCarta > 7 ? 0.5 : numeroCarta;

export const pedirNuevaCarta = (): { numeroCarta: number } => {
  const numeroAleatorio = dameNumeroAleatorio();
  const numeroCarta = dameNumeroCarta(numeroAleatorio);
  const puntosCarta = obtenerPuntosCarta(numeroCarta);
  partida.puntuacion += puntosCarta;
  partida.cartas.push(numeroCarta); // Nuevo metodo: modifico el array original al incluir nuevo elemento
  return { numeroCarta };
};

export const getEstadoPlantarse = (): Estado => {
  if (partida.puntuacion === 7.5) {
    return 'ENHORABUENA';
  }
  if (partida.puntuacion >= 6 && partida.puntuacion < 7.5) {
    return 'CASI';
  }
  if (partida.puntuacion >= 5 && partida.puntuacion < 6) {
    return 'CANGUELO';
  }
  if (partida.puntuacion >= 0 && partida.puntuacion < 5) {
    return 'CONSERVADOR';
  }
  throw new Error('Puntuación fuera de rango');
};

export const getMensajeEstado = (estado: Estado): string => {
  switch (estado) {
    case 'CONSERVADOR':
      return `Has sido muy conservador, te has plantado con tan solo ${partida.puntuacion}`;
    case 'CANGUELO':
      return `Te ha entrado el canguelo, ¿eh? Te has plantado con ${partida.puntuacion}`;
    case 'CASI':
      return `Casi casi... Te plantaste con ${partida.puntuacion}`;
    case 'ENHORABUENA':
      return `¡Lo has clavado! ¡Enhorabuena!`;
    default:
      return '';
  }
};

export const getPartidaPuntuacion = (): number => partida.puntuacion;

export const setPartidaVerQuePasaMode = (value: boolean): void => {
  partida.verQuePasaMode = value; // con set establezco o modifico el valor de la propiedad verQuePasaMode del objeto partida
};

export const getPartidaVerQuePasaMode = (): boolean => partida.verQuePasaMode; /** con get obtengo el valor y 
me permite encapsular el acceso a la propiedad */


export const resetPartida = (): void => {
  partida.puntuacion = 0;
  partida.activa = true;
  partida.cartas = [];
  partida.verQuePasaMode = false;
};
