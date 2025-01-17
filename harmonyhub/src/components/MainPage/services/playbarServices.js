
export const convertIntToTime = (number) => {
  const minutes = number / 60;
  const seconds = number % 60;
  return minutes + ":" + seconds.toString().padStart(2, '0');
}