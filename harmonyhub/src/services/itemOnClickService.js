import { sAlbumDetail } from "../components/AlbumDetailsPage/albumDetailStore";
import { sSongs } from "../components/AllSongsPage/songStore";
import { handleLoadSongToPlaybar } from "../components/MainPage/services/playbarServices";
import { sPlaylistDetail } from "../components/PlaylistDetailPage/playlistDetailStore";
import { SongService } from "./apiCall/song";


export const handleOnClickAlbum = (nav, albumId, owned) => {
    sAlbumDetail.set((v) => {
        v.value.owned = owned || false;
        return v;
    });
    nav('/albumdetails/' + albumId);
};

export const handleOnClickSong = (song) => {
    handleLoadSongToPlaybar(song);
};

export const handleOnClickArtist = (nav, artistId) => {
    nav('/artist/' + artistId);
};

export const handleOnClickPlaylist = (nav, playlistId, title, owned) => {
    sPlaylistDetail.set((v) => {
        v.value.title = title;
        v.value.owned = owned;
        return v;
    });
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
