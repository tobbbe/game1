export function randomNumber(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}