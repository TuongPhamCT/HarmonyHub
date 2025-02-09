import axios from '../../config/axios.js'

export class AlbumService {
    static getAlbums = async ({
        page,
        limit,
    }) => {

        if (!page) page = 1
        if (!limit) limit = 10

        try {
            const { data } = await axios.get('/albums', {
                params: {
                    page,
                    limit,
                }
            })
            return data.albums;
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

    static updateAlbum = async (id, {
        title,
        releaseDate,
        description,
        image,
    }) => {
        try {
            // Tạo FormData để gửi dữ liệu dạng multipart/form-data
            const formData = new FormData();
            if (title) formData.append("title", title);
            if (releaseDate) formData.append("releaseDate", releaseDate);
            if (description) formData.append("description", description);            
            if (image) formData.append("image", image); // Gửi file ảnh
            const { data } = await axios.patch(`/album/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Bắt buộc khi gửi file
                }
            })
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    static getAlbumById = async (id) => {
        try {
            const { data } = await axios.get(`/album/${id}`);
            return data;
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
        if (!page) page = 1
        if (!limit) limit = 10
        if (!sortBy) sortBy = 'title'
        if (!order) order = 'asc'
        if (!search) search = ''

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
            return data.albums;
        } catch (error) {
            console.log(error);
        }
    }

    static deleteAlbum = async (id) => {
        try {
            const { data } = await axios.delete(`/album/${id}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    static addSongToAlbum = async (albumId, songId) => {
        try {
            const { data } = await axios.post(`/album/${albumId}/song/`, {
                songId
            })
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    static removeSongFromAlbum = async (albumId, songId) => {
        try {
            const { data } = await axios.delete(`/album/${albumId}/song`, {
                songId
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    static getRandomAlbums = async (limit) => {
        try {
            const { data } = await axios.get('/random-albums', {
                query: {
                    limit
                }
            })
            return data.albums;
        } catch (error) {
            console.log(error);
        }
    }
}