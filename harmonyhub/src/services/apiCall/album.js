import axios from '../../config/axios.js'

export class AlbumService {
    static getAlbums = async ({
        page,
        limit,
    }) => {
        try {
            const { data } = await axios.get('/albums', {
                params: {
                    page,
                    limit,
                }
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    static createAlbum = async ({
        title,
        releaseDate,
        description,
        image,
    }) => {
        try {
            const { data } = await axios.post('/album', {
                title,
                releaseDate,
                description,
                image,
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    static getAlbumById = async (id) => {
        try {
            const { data } = await axios.get(`/album/${id}`)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    static getMyAlbums = async ({
        page,
        limit,
        sortBy,
        order,
        search
    }) => {
        try {
            const { data } = await axios.get('/my-albums', {
                params: {
                    page,
                    limit,
                    sortBy,
                    order,
                    search
                }
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    static deleteAlbum = async (id) => {
        try {
            const { data } = await axios.delete(`/album/${id}`)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    static addSongToAlbum = async (albumId, songId) => {
        try {
            const { data } = await axios.post(`/album/${albumId}/song/`, {
                songId
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    // static removeSongFromAlbum = async (albumId, songId) => {
    //     try {
    //         const { data } = await axios.delete(`/album/${albumId}/song`, {
    //             songId
    //         })
    //         return data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    static getRandomAlbums = async (limit) => {
        try {
            const { data } = await axios.get('/random-albums', {
                query: {
                    limit
                }
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }
}