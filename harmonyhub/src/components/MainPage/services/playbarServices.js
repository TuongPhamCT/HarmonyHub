import { getRandomItemInArray } from "../../../services/arrayService";
import { sPlaybar } from "../../../store";

export const convertIntToTime = (number, toHours) => {
  const minutes = Math.floor(number / 60);
  const seconds = number % 60;
  return toHours
    ? (minutes > 60 ? Math.floor(minutes / 60) + "h " : "") + (minutes % 60) + "m"
    : minutes + ":" + seconds.toString().padStart(2, '0');
}

const isPlayingUserPlaylist = () => {
  const playlistId = sPlaybar.value.playlistId;
  const albumId = sPlaybar.value.albumId;

  return albumId !== null || playlistId !== null;
}

export const handlePrevPlaySong = (song) => {
  if (sPlaybar.value.updatePlaylistFunction) {
    sPlaybar.value.updatePlaylistFunction();
  }
  sPlaybar.value.loadAudioFunction(song);
}

export const handleLoadSongToPlaybar = (song) => {
  sPlaybar.set((v) => v.value.playingSong = song);

  let currentPlaylist = sPlaybar.value.playlist;

  // handle playlist
  const foundIndex = currentPlaylist.findIndex((v) => v.id === song.id);
  if (foundIndex >= 0) {
    sPlaybar.set((v) => {
      v.value.playingIndex = foundIndex;
      return v;
    });
  } else {
    if (isPlayingUserPlaylist()) {
      sPlaybar.set((v) => {
        v.value.playlist = [song];
        v.value.playingIndex = 0;
        v.value.playlistId = null;
        v.value.albumId = null;
        return v;
      });
    } else {
      sPlaybar.set((v) => {
        v.value.playingIndex = currentPlaylist.length;
        v.value.playlist = [...currentPlaylist, song]
        return v;
      });
    }
  }   

  handlePrevPlaySong(song);
}

export const handlePlayAllAlbum = (albumId, songs) => {
  sPlaybar.set((v) => {
    v.value.playlist = songs;
    v.value.playingIndex = 0;
    v.value.playlistId = null;
    v.value.albumId = albumId;
    return v;
  });

  handlePrevPlaySong(songs[0]);
}

export const handlePlayAllPlaylist = (playlistId, songs) => {
  sPlaybar.set((v) => {
    v.value.playlist = songs;
    v.value.playingIndex = 0;
    v.value.playlistId = playlistId;
    v.value.albumId = null;
    return v;
  });

  handlePrevPlaySong(songs[0]);
}

export const handleNextButton = async (isShuffling) => {
  const currentPlaylist = sPlaybar.value.playlist;
  let currentIndex = sPlaybar.value.playingIndex;

  if (currentPlaylist.length === 1) {
      handleLoadSongToPlaybar(currentPlaylist[0]);
      return;
  }

  if (isShuffling) {
    const playedPlaylist = sPlaybar.value.played;
    const remainPlaylist = currentPlaylist.filter((_, index) => !playedPlaylist.includes(index));

    if (remainPlaylist.length > 0) {
      const nextSong = getRandomItemInArray(remainPlaylist);
      handleLoadSongToPlaybar(nextSong);
    } else {
      sPlaybar.set((v) => v.value.played = [currentIndex]);
      handleNextButton(isShuffling);
    }
  } else {
    console.log(currentPlaylist);
    if (currentIndex < currentPlaylist.length - 1) {
      const nextSong = sPlaybar.value.playlist.at(currentIndex + 1);
      handleLoadSongToPlaybar(nextSong);
    } else {
      // get random song to fill the queue
    }
  }
}

export const handlePreviousButton = () => {
  const currentPlaylist = sPlaybar.value.playlist;
  let currentIndex = sPlaybar.value.playingIndex;
  if (currentIndex > 0) {
    handleLoadSongToPlaybar(currentPlaylist[currentIndex - 1]);
  }
}

export const handleToggleShuffle = () => {
  sPlaybar.set((v) => v.value.played = []);
}