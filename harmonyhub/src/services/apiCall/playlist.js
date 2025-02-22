import { showAlert, showErrorMessage } from "../../components/MainPage/services/showAlertService.js";
import axios from "../../config/axios.js"

export class PlaylistService {
    static getPlaylists = async ({
        page,
        limit,
        sortBy,
        order,
        search,
    }) => {
        if (!page) page = 1;
        if (!limit) limit = 100;
        if (!sortBy) sortBy = "name";
        if (!order) order = "asc";
        if (!search) search = "";
        try {
            const { data } = await axios.get(`/playlists`, {
                page,
                limit,
                sortBy,
                order,
                search,
            });
            return data.playlists;
        } catch (error) {
            console.log(error);
        }
    }

    static getPlaylistsContainSong = async (id) => {
        try {
            const { data } = await axios.get(`/song/${id}/playlists`);
            return data.playlists;
        } catch (error) {
            console.log(error)
        }
    }

    static getMyPlaylists = async () => {
        try {
            const { data } = await axios.get('/my-playlists')
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    static getPlaylistById = async (id) => {
        try {
            const { data } = await axios.get('/my-playlists')
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    static createPlaylist = async ({
        title,
        isPublic
    }) => {
        try {
            const { data } = await axios.post('/playlist', {
                title,
                isPublic
            })
            showAlert("Add playlist successfully");
            return data;
        } catch (error) {
            console.log(error);
            
        }
    }

    static updatePlaylist = async (id, {
        title,
        isPublic
    }) => {
        try {
            console.log(title);
            const { data } = await axios.patch(`/playlist/${id}`, {
                title,
                isPublic
            })
            showAlert("Update playlist successfully");
            return data;
        } catch (error) {
            console.log(error);
            showErrorMessage();
        }
    }

    static deletePlaylist = async (id) => {
        try {
            const { data } = await axios.delete(`/playlist/${id}`)
            showAlert("Delete playlist successfully");
            return data;
        } catch (error) {
            console.log(error);
            showErrorMessage();
        }
    }

    static addSongToPlaylist = async (playlistId, songId) => {
        try {
            const { data } = await axios.post(`/playlist/${playlistId}/song/${songId}`)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    static removeSongFromPlaylist = async (playlistId, songId) => {
        try {
            const { data } = await axios.delete(`/playlist/${playlistId}/song`, {
                data: {songId}
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    static getPlaylistSongs = async (id, {
        page,
        limit,
        sortBy,
        order,
    }) => {
        if (!page) page = 1
        if (!limit) limit = 10
        if (!sortBy) sortBy = 'name'
        if (!order) order = 'asc'

        try {
            const { data } = await axios.get(`/playlist/${id}/songs`, {
                params: {
                    page,
                    limit,
                    sortBy,
                    order,
                }
            })
            return data.songs;
        } catch (error) {
            console.log(error)
        }
    }
}