import { AlbumService } from "../../../services/apiCall/album";
import { PlaylistService } from "../../../services/apiCall/playlist";
import { SongService } from "../../../services/apiCall/song";
import { getRandomItemInArray, shuffleArray } from "../../../services/arrayService";
import { sPlaybar } from "../../../store";

export const convertIntToTime = (number, toHours) => {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number % 60);
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
  storePlaybarDataToLocal();
  sPlaybar.value.loadAudioFunction(song);
}

export const handleClearPlaybar = () => {
  sPlaybar.set((v) => {
    v.value.playingSong = null;
    v.value.playlist = [];
    v.value.played = [];
    v.value.playingIndex = 0;
    v.value.repeat = 0;
    v.value.playlistId = null;
    v.value.albumId = null;
    return v;
  });
  sPlaybar.value.clearPlaybarFunction();
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
    if (isPlayingUserPlaylist()) {
      sPlaybar.value.replayPlaybarFunction();
    } else {
      handleNextRandomSong();
    }
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

    // has playlist
    if (isPlayingUserPlaylist) {
      if (currentIndex < currentPlaylist.length - 1) {
        const nextSong = sPlaybar.value.playlist.at(currentIndex + 1);
        handleLoadSongToPlaybar(nextSong);
      } else {
        handleLoadSongToPlaybar(currentPlaylist.at(0));
      }
      return;
    }

    if (currentIndex < currentPlaylist.length - 1) {
      const nextSong = sPlaybar.value.playlist.at(currentIndex + 1);
      handleLoadSongToPlaybar(nextSong);
    } else {
      handleNextRandomSong();
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

export const handleRemoveSong = (song) => {
  let currentPlaylist = sPlaybar.value.playlist;
  let currentIndex = sPlaybar.value.playingIndex;
  const deleteIndex = currentPlaylist.findIndex((v) => v.id === song.id);
  // has song in playlist
  if (deleteIndex >= 0) {
    sPlaybar.set((v) => v.value.played = []);

    currentPlaylist = currentPlaylist.filter((_, index) => index !== deleteIndex);
    if (deleteIndex < currentIndex) {
      currentIndex = currentIndex - 1;
    }

    if (currentIndex >= currentPlaylist.length) {
      currentIndex = currentPlaylist.length - 1;
    }

    if (currentIndex < 0) {
      handleClearPlaybar();
    } else {
      sPlaybar.set((v) => {
        v.value.playlist = currentPlaylist;
        v.value.playingIndex = currentIndex;
        return v;
      });
      handleLoadSongToPlaybar(currentPlaylist.at(currentIndex));
    }
  }
}

const handleNextRandomSong = async () => {
  const currentPlaylist = sPlaybar.value.playlist;

  // get random song to fill the queue
  let newSongs = sPlaybar.value.storedRandomSongs;
  const playedIds = currentPlaylist.map((i) => i.id);
  newSongs = newSongs.filter((i) => playedIds.includes(i.id) === false);

  if (newSongs.length > 0) {
    newSongs = shuffleArray(newSongs);
    handleLoadSongToPlaybar(newSongs.at(0));
  } else {
    sPlaybar.value.stopPlaybarFunction();
  }
}

export const storeRandomSongs = async () => {
  let newSongs = await SongService.getSongs({
    sortBy: "playCount",
    limit: "20",
  }) || [];
  sPlaybar.set((v) => v.value.storedRandomSongs = newSongs);
}

// store to local
export const storePlaybarDataToLocal = () => {
  const playbarData = sPlaybar.value;

  localStorage.setItem("playbar-playingId", playbarData.playingSong.id);
  localStorage.setItem("playbar-playlistIds", JSON.stringify(playbarData.playlist.map((i) => i.id)));
  localStorage.setItem("playbar-albumId", playbarData.albumId);
  localStorage.setItem("playbar-playlistId", playbarData.playlistId);
  // localStorage.setItem("playbar-playedIds", );

}

export const loadPlaybarDataFromLocal = async () => {
  const albumId = localStorage.getItem("playbar-albumId");
  const playlistId = localStorage.getItem("playbar-playlistId");

  if (albumId && albumId !== "null") {
    const albumData = await AlbumService.getAlbumById(albumId);

    if (albumData && albumData.songs.length > 0) {
      const dataSongs = albumData.songs;

      sPlaybar.set((v) => {
        v.value.playlist = dataSongs;
        v.value.albumId = albumId;
        // v.value.played = JSON.parse(localStorage.getItem("playbar-playedIds")) || [];
      });

      const currentId = parseInt(localStorage.getItem("playbar-playingId"));
      const currentSongIndex = dataSongs.findIndex((v) => v.id === currentId);

      if (currentSongIndex >= 0) {
        handleLoadSongToPlaybar(dataSongs.at(currentSongIndex));
      } else {
        localStorage.removeItem("playbar-currentTime");
        handleLoadSongToPlaybar(dataSongs.at(0));
      }
    }

  } else if (playlistId && playlistId !== "null") {
    const dataSongs = await PlaylistService.getPlaylistSongs(playlistId, {
      sortBy: "createdAt",
      order: "asc",
    });

    if (dataSongs.length > 0) {
      sPlaybar.set((v) => {
        v.value.playlist = dataSongs;
        v.value.playlistId = playlistId;
        // v.value.played = JSON.parse(localStorage.getItem("playbar-playedIds")) || [];
      });

      const currentId = parseInt(localStorage.getItem("playbar-playingId"));
      const currentSongIndex = dataSongs.findIndex((v) => v.id === currentId);

      if (currentSongIndex >= 0) {
        handleLoadSongToPlaybar(dataSongs.at(currentSongIndex));
      } else {
        localStorage.removeItem("playbar-currentTime");
        handleLoadSongToPlaybar(dataSongs.at(0));
      }
    }
  } else {
    const playlistIds = JSON.parse(localStorage.getItem("playbar-playlistIds")) || [];
    

    if (playlistIds.length > 0) {
      
      let newPlaylist = [];

      for (const id of playlistIds) {
        let songData = await SongService.getSongById(id);

        if (songData) {
          songData.image =  "/public" + songData.image;
          songData.fileURL = "/public" + songData.fileURL;
          
          if (songData) {
            newPlaylist.push(songData);
          }
        }
      }

      if (newPlaylist.length > 0) {
        sPlaybar.set((v) => {
          v.value.playlist = newPlaylist;
          // v.value.played = localStorage.getItem("playbar-playedIds") || [];
        });
  
        const currentId = parseInt(localStorage.getItem("playbar-playingId"));
        const currentSongIndex = newPlaylist.findIndex((v) => v.id === currentId);
  
        if (currentSongIndex >= 0) {
          handleLoadSongToPlaybarFromLocal(newPlaylist.at(currentSongIndex), currentSongIndex);
        } else {
          //localStorage.removeItem("playbar-currentTime");
          handleLoadSongToPlaybarFromLocal(newPlaylist.at(0), 0);
        }
      }

    } else {
      //localStorage.removeItem("playbar-currentTime");
    }
  }
}

const handleLoadSongToPlaybarFromLocal = (song, index) => {
  sPlaybar.set((v) => {
    v.value.playingSong = song;
    v.value.playingIndex = index;
  });
  handlePrevPlaySong(song);
}
export const clearPlaybarDataFromLocal = () => {
  localStorage.removeItem("playbar-playingId");
  localStorage.removeItem("playbar-playlistIds");
  localStorage.removeItem("playbar-albumId");
  localStorage.removeItem("playbar-playlistId");
  localStorage.removeItem("playbar-playedId");
}