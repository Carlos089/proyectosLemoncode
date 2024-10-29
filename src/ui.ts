import {
  pedirNuevaCarta,
  getEstadoPlantarse,
  getMensajeEstado,
  getPartidaPuntuacion,
  setPartidaVerQuePasaMode,
  getPartidaVerQuePasaMode,
  resetPartida,
} from './motor';

const elementoEsValido = <T extends HTMLElement>(  // Validación y obtencion de elementos del DOM
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
export const container = elementoEsValido(
  document.getElementById('confetti-container'),
  HTMLDivElement,
  'Div contenedor Confeti',
);

export const initializeButtonVisibility = (): void => { // Inicializo visibilidad de los botones
  reiniciarButton.style.visibility = 'hidden';
  verQuePasaButton.style.visibility = 'hidden';
  plantarseButton.style.visibility = 'hidden';
};

const mostrarConfeti = (numPieces = 100): void => {  // Mostrar confeti
  if (container) {
    container.classList.remove('oculto');   // quito clase 'oculto' para asegurar que contenedor sea visible
    container.innerHTML = '';              // Limpio contenido del contenedor

    for (let i = 0; i < numPieces; i++) {
      const piece = document.createElement('div');  // Creo elemento div para representar una pieza de confeti
      piece.classList.add('confetti-piece');        // Agrego clase 'confetti-piece' para aplicar estilos CSS

      piece.style.left = Math.random() * 100 + '%'; // Establezco posición horizontal de confeti de forma aleatoria

      const hue = Math.floor(Math.random() * 360);  // Color aleatorio usando modelo HSL con tono (hue) alea. entre 0 y 360
      piece.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

      piece.style.animationDuration = 2 + Math.random() * 3 + 's'; // Defino duracion de animacion alea. entre 2 y 5 segundos

      piece.style.animationDelay = Math.random() * 2000 + 'ms'; // Defino retardo aleatorio para el inicio de la animacion


      container.appendChild(piece); // Anado pieza de confeti al contenedor en el DOM

    }
  }
};

const actualizarDisplayPuntuacion = (): void => {  // Actualizo puntuacion en DOM
  puntuacionDiv.textContent = `Puntuación actual: ${getPartidaPuntuacion()}`;
};

const dameUrlCarta = (numeroCarta: number): string => {  // Obtener URL de la carta
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

const pintarUrlCarta = (urlCarta: string): void => {  // Pinto carta en el DOM
  if (cartaImg) cartaImg.src = `src/img/${urlCarta}`;
};

const muestraPuntuacion = (): void => {  // Mostrar puntuacion y mensajes
  const puntuacion = getPartidaPuntuacion();
  const verQuePasaMode = getPartidaVerQuePasaMode();

  if (puntuacion === 7.5) {
    if (verQuePasaMode) {
      mensajeDiv.textContent = `¡Podrías haber ganado! Alcanzaste ${puntuacion} después de plantarte`;
    } else {
      mensajeDiv.textContent = `¡ENHORABUENA! Has alcanzado ${puntuacion} !!`;
      mostrarConfeti();
    }
    deshabilitarBotones();
    verQuePasaButton.style.visibility = 'hidden';
  } else if (puntuacion > 7.5) {
    if (verQuePasaMode) {
      mensajeDiv.textContent = `Te hubieras pasado con ${puntuacion} si hubieras seguido`;
    } else {
      mensajeDiv.textContent = `Puntuación sobrepasada: ${puntuacion} GAME OVER`;
    }
    deshabilitarBotones();
    verQuePasaButton.style.visibility = 'hidden';
  } else if (puntuacion < 7.5) {
    if (verQuePasaMode) {
      mensajeDiv.textContent = `Aún no hubieras llegado con ${puntuacion} de haber seguido`;
      deshabilitarBotones();
      verQuePasaButton.style.visibility = 'hidden';
    } else {
      actualizarDisplayPuntuacion();
    }
  }
};

const deshabilitarBotones = (): void => {
  pedirButton.disabled = true;
  plantarseButton.disabled = true;
  reiniciarButton.style.visibility = 'visible';
  verQuePasaButton.style.visibility = 'visible';
};

const habilitarBotones = (): void => {
  pedirButton.disabled = false;
  plantarseButton.disabled = false;
  plantarseButton.style.visibility = 'hidden';
  reiniciarButton.style.visibility = 'hidden';
  verQuePasaButton.style.visibility = 'hidden';
  verQuePasaButton.disabled = false;
};

const limpiarMensaje = (): void => {
  mensajeDiv.textContent = '';
};

const reiniciarCarta = (): void => {
  cartaImg.src = 'src/img/back.jpg';
};

// Manejo de eventos

export const pedirCarta = (): void => {
  const { numeroCarta } = pedirNuevaCarta();
  const urlCarta = dameUrlCarta(numeroCarta);
  pintarUrlCarta(urlCarta);
  actualizarDisplayPuntuacion();
  muestraPuntuacion();
};

export const verQuePasa = (): void => {
  setPartidaVerQuePasaMode(true);
  verQuePasaButton.disabled = true;
  pedirCarta();
  deshabilitarBotones();
};

export const plantarseClick = (): void => {
  deshabilitarBotones();
  const estado = getEstadoPlantarse();
  const mensaje = getMensajeEstado(estado);
  mensajeDiv.textContent = mensaje;
};

export const reiniciarJuego = (): void => {
  resetPartida();
  limpiarMensaje();
  habilitarBotones();
  reiniciarCarta();
  mostrarConfeti(0);
  actualizarDisplayPuntuacion();
};

pedirButton.addEventListener('click', () => { // Mostrar boton de plantarse cuando se pide una carta
  plantarseButton.style.visibility = 'visible';
});
