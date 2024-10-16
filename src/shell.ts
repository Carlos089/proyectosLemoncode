import { reiniciarJuego, verQuePasa, plantarseClick, pedirCartaYActualizarUI, actualizarPuntuacionEnDom, reiniciarButton, pedirButton, plantarseButton, verQuePasaButton } from "./ui";

import { actualizarPuntos } from "./motor";

export const manejarNuevaPuntuacion = (puntosNuevos: number) => {
  actualizarPuntos(puntosNuevos); // Actualiza estado de juego
  actualizarPuntuacionEnDom(puntosNuevos); // Muestra puntuacion en DOM
};

document.addEventListener("DOMContentLoaded", () => {
  pedirButton.addEventListener("click", pedirCartaYActualizarUI);
  plantarseButton.addEventListener("click", plantarseClick);
  reiniciarButton.addEventListener("click", reiniciarJuego);
  verQuePasaButton.addEventListener("click", verQuePasa);
});
