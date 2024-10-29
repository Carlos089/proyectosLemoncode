import {
  initializeButtonVisibility,
  pedirButton,
  plantarseButton,
  reiniciarButton,
  verQuePasaButton,
  pedirCarta,
  plantarseClick,
  reiniciarJuego,
  verQuePasa,
} from './ui';

document.addEventListener('DOMContentLoaded', () => {
  initializeButtonVisibility();

  pedirButton.addEventListener('click', pedirCarta);
  plantarseButton.addEventListener('click', plantarseClick);
  reiniciarButton.addEventListener('click', reiniciarJuego);
  verQuePasaButton.addEventListener('click', verQuePasa);
});
