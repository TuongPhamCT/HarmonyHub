import { sSongs } from "../components/AllSongsPage/songStore";
import { handleLoadSongToPlaybar } from "../components/MainPage/services/playbarServices";
import { SongService } from "./apiCall/song";


export const handleOnClickAlbum = (nav, albumId) => {
    nav('/albumdetails/' + albumId);
};

export const handleOnClickSong = (song) => {
    handleLoadSongToPlaybar(song);
};

export const handleOnClickArtist = (nav, artistId) => {
    nav('/artist/' + artistId);
};

export const handleOnClickPlaylist = (nav, playlistId) => {
    nav('/playlist/' + playlistId);
};

export const handleOnClickGenre = async (nav, genreId, genreTitle) => {
    const songData = await SongService.getSongs({
        sortBy: "createdAt",
        order: "desc",
        genreId: genreId,
    }) || [];
    sSongs.set((v) => v.value.songs = songData);
    sSongs.set((v) => v.value.title = genreTitle);
    sSongs.set((v) => v.value.titleHighlight = "");
    nav('/songs/' + genreTitle);
};
