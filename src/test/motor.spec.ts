import {
    getEstadoPlantarse,
    dameNumeroCarta,
    obtenerPuntosCarta,
  } from '../motor';
  import { partida } from '../modelo';
  import { vi } from 'vitest';
  
  describe('getEstadoPlantarse', () => {
    it('deberia devolver ENHORABUENA cuando la puntuacion es de 7.5', () => {
      vi.spyOn(partida, 'puntuacion', 'get').mockReturnValue(7.5); // Arrange: espia la propiedad puntuacion dentro de partida
      const resultado = getEstadoPlantarse(); // Act: ejecuta el comportamiento
      expect(resultado).toBe('ENHORABUENA');  // Assert: verifica el resultado
  
    });
  
    it('deberia devolver CASI cuando la puntuacion es entre 6 y menor a 7.5', () => {
      vi.spyOn(partida, 'puntuacion', 'get').mockReturnValue(6);
      const resultado = getEstadoPlantarse();
      expect(resultado).toBe('CASI');
    });
  
    it('debiera devolver CANGUELO cuando puntuacion >= 5 y < 6', () => {
      vi.spyOn(partida, 'puntuacion', 'get').mockReturnValue(5.5);
      const resultado = getEstadoPlantarse();
      expect(resultado).toBe('CANGUELO');
    });
  
    it('debiera devolver CONSERVADOR cuando la puntuacion es < 5', () => {
      vi.spyOn(partida, 'puntuacion', 'get').mockReturnValue(3);
      const resultado = getEstadoPlantarse();
      expect(resultado).toBe('CONSERVADOR');
    });
  });
  
  // APARTADO OPCIONAL
  describe('dameNumeroCarta', () => {
    it('debiera sumarle 2 puntos a cualquier carta > 7 para que sea sota, caballo o rey', () => {
      const resultado = dameNumeroCarta(9);
      expect(resultado).toBe(11);
    });
  
    it('debiera devolver la puntuacion exacta de la propia carta al ser <= 7', () => {
      const resultado = 5;
      expect(resultado).toBe(5);
    });
  });
  
  describe('obtenerPuntosCarta', () => {
    it('debiera devolver 0.5 si puntuacion > 7, valiendo asi sota, caballo o rey 0.5 puntos cualquiera de ellos', () => {
      const resultado = obtenerPuntosCarta(8);
      expect(resultado).toBe(0.5);
    });
  
    it('debiera devolver numero de puntuacion de la propia carta', () => {
      const resultado = obtenerPuntosCarta(4);
      expect(resultado).toBe(4);
    });
  });
  