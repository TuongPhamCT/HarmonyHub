import axios from '../../config/axios.js'
export class GenreService {
    static getGenres = async ({
        page,
        limit,
        sortBy,
        order,
        search
    }) => {
        try {
            const { data } = await axios.get('/genres', {
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

    static createGenre = async ({
        name,
        description,
        image
    }) => {
        try {
            const { data } = await axios.post('/genre', {
                name,
                description,
                image,
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    static getGenreById = async (id) => {
        try {
            const { data } = await axios.get(`/genre/${id}`)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    static updateGenre = async (id, {
        description,
    }) => {
        try {
            const { data } = await axios.patch(`/genre/${id}`, {
                description,
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