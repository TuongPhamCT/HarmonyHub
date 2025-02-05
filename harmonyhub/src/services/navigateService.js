import { sAlbums } from "../components/AlbumsPage/albumStore";
import { sPlaylists } from "../components/AllPlaylistsPage/playlistStore";
import { sSongs } from "../components/AllSongsPage/songStore";

export const navigateToTopAlbums = (nav) => {
    sAlbums.set((v) => v.value.title = "Top");
    sAlbums.set((v) => v.value.titleHighlight = "Albums");
    nav('/albums/top-albums');
}

export const navigateToNewReleaseAlbums = (nav) => {
    sAlbums.set((v) => v.value.title = "New Release");
    sAlbums.set((v) => v.value.titleHighlight = "Albums");
    nav('/albums/new-release-albums');
}

export const navigateToNewReleaseSongs = (nav) => {
    sSongs.set((v) => v.value.title = "New Release");
    sSongs.set((v) => v.value.titleHighlight = "Songs");
    nav('/songs/new-release-songs');
}

export const navigateToAllPlaylists = (nav, title, titleHighlight, path) => {
    sPlaylists.set((v) => v.value.title = title);
    sPlaylists.set((v) => v.value.titleHighlight = titleHighlight);
    nav('/playlists/' + path);
}