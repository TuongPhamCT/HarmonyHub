import {signify} from "react-signify";

export const sUser = signify ({
    userName: null,
    privilege: [0, 1],
});

export const sPlaybar = signify ({
    playingSong: null,
    isSpeakerOn: true,
    loadAudioFunction: null,
    updatePlaylistFunction: null,
    playlist: [],
    played: [],
    playingIndex: 0,
    repeat: 0,
    playlistId: null,
    albumId: null,
});

export const sMainController = signify ({
    showHeaderBackButton: false,
    showHeaderSearchBar: true,
    showSignUp: false,
    showSignIn: false,
    showSidebar: true,
    canScroll: true,
});