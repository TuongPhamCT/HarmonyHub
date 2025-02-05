import { sSongs } from "../components/AllSongsPage/songStore";


export const handleOnClickAlbum = (nav, albumId) => {
    nav('/albumdetails/' + albumId);
};

export const handleOnClickSong = (songId) => {
    // do something
};

export const handleOnClickArtist = (nav, artistId) => {
    nav('/artist/' + artistId);
};

export const handleOnClickPlaylist = (nav, playlistId) => {
    nav('/playlist/' + playlistId);
};

export const handleOnClickGenre = (nav, genreId, genreTitle) => {
    sSongs.set((v) => v.value.title = genreTitle);
    sSongs.set((v) => v.value.titleHighlight = "");
    nav('/songs/' + genreTitle);
};
