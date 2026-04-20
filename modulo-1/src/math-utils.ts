/**
 * Calculates the mean of an array of numbers.
 * Returns null if the array is empty.
 */

export function calcularMedia(array: number[]): number | null {
  if (array.length === 0) return null;
 
  const suma = array.reduce((acc, num) => acc + num, 0);
  return suma / array.length;
}
 
/**
 * Calculates the median of an array of numbers.
 * Returns null if the array is empty.
 */
export function calcularMediana(array: number[]): number | null {
  if (array.length === 0) return null;
 
  const ordenado = [...array].sort((a, b) => a - b);
  const mitad = Math.floor(ordenado.length / 2);
 
  // If even number of elements, average the two middle values
  if (ordenado.length % 2 === 0) {
    return (ordenado[mitad - 1] + ordenado[mitad]) / 2;
  }
 
  // If odd, return the middle value
  return ordenado[mitad];
}
 
/**
 * Filters out outliers from an array of numbers.
 * Any value further than `limite` standard deviations from the mean is removed.
 * Returns null if the array is empty or the mean cannot be calculated.
 */
export function filtrarAtipicos(array: number[], limite: number): number[] | null {
  if (array.length === 0) return null;
 
  const media = calcularMedia(array) as number;
 
  const desviacionEstandar = Math.sqrt(
    array.reduce((acc, num) => acc + Math.pow(num - media, 2), 0) / array.length
  );
 
  return array.filter(
    (num) => Math.abs(num - media) <= limite * desviacionEstandar
  );
}