import axios from "../../config/axios.js"

export class PlaylistService {
    static getMyPlaylists = async () => {
        try {
            const { data } = await axios.get('/my-playlists')
            return data
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
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    static updatePlaylist = async (id, {
        title,
        isPublic
    }) => {
        try {
            const { data } = await axios.patch(`/playlist/${id}`, {
                title,
                isPublic
            })
        } catch (error) {
            console.log(error)
        }
    }

    static deletePlaylist = async (id) => {
        try {
            const { data } = await axios.delete(`/playlist/${id}`)
            return data
        } catch (error) {
            console.log(error)
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
                songId
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
        try {
            const { data } = await axios.get(`/playlist/${id}/songs`, {
                params: {
                    page,
                    limit,
                    sortBy,
                    order,
                }
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }
}