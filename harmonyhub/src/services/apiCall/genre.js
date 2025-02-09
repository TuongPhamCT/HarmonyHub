import axios from '../../config/axios.js'
export class GenreService {
    static getGenres = async ({
        page,
        limit,
        sortBy,
        order,
        search
    }) => {
        if (!page) page = 1
        if (!limit) limit = 10
        if (!sortBy) sortBy = 'name'
        if (!order) order = 'asc'
        if (!search) search = ''

        try {
            const { data } = await axios.get('/genres', {
                params: {
                    page,
                    limit,
                    sortBy,
                    order,
                    search
                }
            });
            return data.genres;
        } catch (error) {
            console.log(error)
        }
    }

    static createGenre = async ({
        name,
        description,
        image
    }) => {
        try {
            // Tạo FormData để gửi dữ liệu dạng multipart/form-data
            const formData = new FormData();
            if (name) formData.append("name", name);
            if (description) formData.append("description", description);
            if (image) formData.append("image", image); // Gửi file ảnh

            const { data } = await axios.post('/genre', formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Bắt buộc khi gửi file
                }
            })
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    static getGenreById = async (id) => {
        try {
            const { data } = await axios.get(`/genre/${id}`)
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    static updateGenre = async (id, {
        name,
        description,
        image,
    }) => {
        try {
            // Tạo FormData để gửi dữ liệu dạng multipart/form-data
            const formData = new FormData();
            if (name) formData.append("name", name);
            if (description) formData.append("description", description);
            if (image) formData.append("image", image); // Gửi file ảnh

            const { data } = await axios.patch(`/genre/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Bắt buộc khi gửi file
                }
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    static deleteGenre = async (id) => {
        try {
            const { data } = await axios.delete(`/genre/${id}`)
            return data
        } catch (error) {
            console.log(error)
        }
    }
}