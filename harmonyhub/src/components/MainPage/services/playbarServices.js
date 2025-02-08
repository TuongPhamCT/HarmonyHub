import { sPlaybar } from "../../../store";

export const convertIntToTime = (number, toHours) => {
  const minutes = Math.floor(number / 60);
  const seconds = number % 60;
  return toHours
    ? (minutes > 60 ? Math.floor(minutes / 60) + "h " : "") + (minutes % 60) + "m"
    : minutes + ":" + seconds.toString().padStart(2, '0');
}

export const handleLoadSongToPlaybar = (songId) => {
  sPlaybar.value.loadAudioFunction(songId);
}