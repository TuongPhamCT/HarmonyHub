export const convertIntToTime = (number) => {
  const minutes = Math.floor(number / 60);
  const seconds = number % 60;
  return minutes.toString() + ":" + seconds.toString().padStart(2, '0');
}