import { sAlbums } from "../components/AlbumsPage/albumStore";
import { sPlaylists } from "../components/AllPlaylistsPage/playlistStore";
import { sSongs } from "../components/AllSongsPage/songStore";

export const navigateToTopAlbums = (nav, albums) => {
    sAlbums.set((v) => {
        v.value.title = "Top";
        v.value.titleHighlight = "Albums";
        v.value.albums = albums || [];
        return v;
    });
    nav('/albums/top-albums');
}

export const navigateToNewReleaseAlbums = (nav, albums) => {
    sAlbums.set((v) => {
        v.value.title = "New Release";
        v.value.titleHighlight = "Albums";
        v.value.albums = albums || [];
    });
    nav('/albums/new-release-albums');
}

export const navigateToAllAlbums = (nav, title, titleHighlight, path, albums) => {
    sAlbums.set((v) => {
        v.value.title = title;
        v.value.titleHighlight = titleHighlight;
        v.value.albums = albums || [];
    });
    
    nav('/albums/' + path);
}

export const navigateToNewReleaseSongs = (nav, songs) => {
    sSongs.set((v) => {
        v.value.title = "New Release";
        v.value.titleHighlight = "Songs";
        v.value.songs = songs || [];
    });
    nav('/songs/new-release-songs');
}

export const navigateToAllSongs = (nav, title, titleHighlight, path, songs) => {
    sSongs.set((v) => {
        v.value.title = title;
        v.value.titleHighlight = titleHighlight;
        v.value.songs = songs || [];
    });
    nav('/songs/' + path);
}

export const navigateToAllPlaylists = (nav, title, titleHighlight, path, playlists) => {
    sPlaylists.set((v) => {
        v.value.title = title;
        v.value.titleHighlight = titleHighlight;
        v.value.playlists = playlists || [];
    });
    nav('/playlists/' + path);
}