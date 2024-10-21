// Función genérica para validar elementos del DOM y asegurarse de que son del tipo esperado
export const elementoEsValido = <T extends HTMLElement>(
  elemento: Element | null,
  tipo: { new (): T },
  descripcion: string,
): T => {
  if (elemento instanceof tipo && elemento !== null && elemento !== undefined) {
    return elemento;
  } else {
    throw new Error(`Error con el elemento: ${descripcion}`);
  }
};

export const reiniciarButton = elementoEsValido(
  document.getElementById('reiniciar'),
  HTMLButtonElement,
  'Boton Reiniciar',
);
export const verQuePasaButton = elementoEsValido(
  document.getElementById('verQuePasa'),
  HTMLButtonElement,
  'Boton Ver Que Pasa',
);
export const puntuacionDiv = elementoEsValido(
  document.getElementById('puntuacion'),
  HTMLDivElement,
  'Div Puntuacion',
);
export const pedirButton = elementoEsValido(
  document.getElementById('pedirCarta'),
  HTMLButtonElement,
  'Boton Pedir Carta',
);
export const cartaImg = elementoEsValido(
  document.getElementById('carta'),
  HTMLImageElement,
  'Imagen Carta',
);
export const mensajeDiv = elementoEsValido(
  document.getElementById('mensaje'),
  HTMLDivElement,
  'Div Mensaje',
);
export const plantarseButton = elementoEsValido(
  document.getElementById('plantarse'),
  HTMLButtonElement,
  'Boton Plantarse',
);

// Inicializar visibilidad de botones oportunos
const initializeButtonVisibility = (): void => {
  reiniciarButton.style.visibility = 'hidden';
  verQuePasaButton.style.visibility = 'hidden';
  plantarseButton.style.visibility = 'hidden';
};
initializeButtonVisibility();

pedirButton.addEventListener('click', () => {
  plantarseButton.style.visibility = 'visible';
});

verQuePasaButton.addEventListener('click', () => {
  verQuePasaButton.disabled = true;
})

import { puntuacion } from './modelo';

// Mostrar puntuación actualizada en el DOM
export const muestraPuntuacion = (): void => {
  if (puntuacion === 7.5) {
    pintarMensajeResultado(`¡Enhorabuena! Has alcanzado 7.5`);
    deshabilitarBotones();
  }
  if (puntuacion > 7.5) {
    pintarMensajeResultado(`Puntuacion sobrepasada: ${puntuacion} GAME OVER`);
    deshabilitarBotones();
  }
};

// Pintar mensaje
const pintarMensajeResultado = (mensaje: string) => {
  puntuacionDiv.innerHTML = mensaje;
};

// Deshabilitar botones al final del juego
export const deshabilitarBotones = (): void => {
  pedirButton.disabled = true;
  plantarseButton.disabled = true;
  reiniciarButton.style.visibility = 'visible';
  verQuePasaButton.style.visibility = 'visible';
};

// Obtener URL de la imagen de la carta según su número
export const dameUrlCarta = (numeroCarta: number): string => {
  switch (numeroCarta) {
    case 1:
      return '1_as-copas.jpg';
    case 2:
      return '2_dos-copas.jpg';
    case 3:
      return '3_tres-copas.jpg';
    case 4:
      return '4_cuatro-copas.jpg';
    case 5:
      return '5_cinco-copas.jpg';
    case 6:
      return '6_seis-copas.jpg';
    case 7:
      return '7_siete-copas.jpg';
    case 10:
      return '10_sota-copas.jpg';
    case 11:
      return '11_caballo-copas.jpg';
    case 12:
      return '12_rey-copas.jpg';
    default:
      return 'back.jpg';
  }
};

// Pintar imagen de la carta en el DOM
export const pintarUrlCarta = (urlCarta: string) => {
  if (cartaImg) cartaImg.src = `src/img/${urlCarta}`;
};

// Sumar puntos actuales con los nuevos puntos
export const actualizarPuntuacionEnDom = (puntosSumados: number): void => {
  mensajeDiv.textContent = puntosSumados.toString();
};

import { pedirCarta } from './motor';

import { manejarNuevaPuntuacion } from './shell';

// Pedir nueva carta y actualizar la UI
export const pedirCartaYActualizarUI = (): void => {
  const { carta, puntosSumados } = pedirCarta(); // Obtengo carta y puntos sumados

  const urlCarta = dameUrlCarta(carta); // Obtengo URL de la carta
  pintarUrlCarta(urlCarta);

  manejarNuevaPuntuacion(puntosSumados);
  muestraPuntuacion();
};

import { getMensajeEstado, Estado } from './modelo';

// Mostrar mensaje según estado del juego
export const mensajePlantarse = (estado: Estado): void => {
  mensajeDiv.textContent = getMensajeEstado(estado);
};

import { getEstadoPlantarse } from './motor';

// Manejar plantarse y mostrar mensaje adecuado
export const plantarseClick = (): void => {
  deshabilitarBotones();
  const estado: Estado = getEstadoPlantarse();
  mensajePlantarse(estado);
};

// Manejar ver que pasa
export const verQuePasa = (): void => {
  const { carta, puntosSumados } = pedirCarta(); // Obtener carta y puntos
  const urlCarta = dameUrlCarta(carta); // Obtener URL de la carta

  pintarUrlCarta(urlCarta); // Pinta carta en DOM
  manejarNuevaPuntuacion(puntosSumados); // Actualiza puntos en estado y el DOM
  deshabilitarBotones();
};

// Habilitar botones al reiniciar el juego
export const habilitarBotones = (): void => {
  pedirButton.disabled = false;
  plantarseButton.disabled = false;
  plantarseButton.style.visibility = 'hidden';
  reiniciarButton.style.visibility = 'hidden';
  verQuePasaButton.style.visibility = 'hidden';
  verQuePasaButton.disabled = false;
};

// Limpiar mensaje del DOM
export const limpiarMensaje = (): void => {
  mensajeDiv.textContent = '';
  puntuacionDiv.textContent = '';
};

// Reiniciar imagen de la carta
export const reiniciarCarta = (): void => {
  cartaImg.src = 'src/img/back.jpg';
};

import { setPuntuacion, crearNuevaPartida } from './modelo';

export const reiniciarJuego = (): void => {
  const nuevaPartida = crearNuevaPartida(); // Inicializa nueva partida
  setPuntuacion(nuevaPartida.puntuacion); // Usa puntuacion de nueva partida
  limpiarMensaje(); // Limpio mensajes de la UI
  muestraPuntuacion(); // Muestro puntuacion en la UI
  habilitarBotones(); // Habilito botones
  reiniciarCarta(); // Reseteo imagen de la carta
};
