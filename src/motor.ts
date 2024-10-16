// Generar número aleatorio entre 1 y 10
export const dameNumeroAleatorio = (): number => Math.floor(Math.random() * 10) + 1;

// Ajustar número de la carta en caso de que sea una figura 10, 11 o 12
export const dameNumeroCarta = (numeroAleatorio: number): number =>
  numeroAleatorio > 7 ? numeroAleatorio + 2 : numeroAleatorio;

// Obtener puntos de la carta según su número
export const obtenerPuntosCarta = (numeroCarta: number): number =>
  numeroCarta > 7 ? 0.5 : numeroCarta;

import { puntuacion } from "./modelo";

// Sumar puntos actuales con los nuevos puntos
export const sumarPuntos = (puntos: number): number => {
  return puntuacion + puntos;
};

import { setPuntuacion } from "./modelo";

// Actualizar puntos y mostrar la puntuación en el DOM
export const actualizarPuntos = (puntosNuevos: number): void => {
  setPuntuacion(puntosNuevos);
};

// Pedir nueva carta y devolver tanto carta como puntos
export const pedirCarta = (): { carta: number, puntosSumados: number } => {
  const numeroAleatorio = dameNumeroAleatorio();
  const carta = dameNumeroCarta(numeroAleatorio);
  const puntosCarta = obtenerPuntosCarta(carta);
  const puntosSumados = sumarPuntos(puntosCarta);
  return { carta, puntosSumados };
};
