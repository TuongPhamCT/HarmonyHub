import axios from '../../config/axios.js'

export class ArtistService {
    static getArtists = async ({
        page,
        limit,
        sortBy,
        order,
        search
    }) => {
        if (!page) page = 1
        if (!limit) limit = 10
        if (!sortBy) sortBy = 'email'
        if (!order) order = 'asc'
        if (!search) search = ''

        try {
            const { data } = await axios.get('/artists', {
                params: {
                    page,
                    limit,
                    sortBy,
                    order,
                    search
                }
            })
            return data.artists;
        } catch (error) {
            console.log(error)
        }
    }

    static getArtistById = async (id) => {
        try {
            const { data } = await axios.get(`/artist/${id}`)
            return data;
        } catch (error) {
            console.log(error);
        }
    }

}