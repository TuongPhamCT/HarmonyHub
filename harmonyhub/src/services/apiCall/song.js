import axios from '../../config/axios.js'

export class SongService {
  static createSong = async ({
    name,
    genres,
    file,
    image,
    lyric
  }) => {
    try {
      if (!name || !genres || !file || !image || !lyric || genres.length < 2) {
        console.log('All fields are required')
        return
      }

      const { data } = await axios.post('/song', {
        name,
        genres,
        file,
        image,
        lyric
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static getSongById = async (id) => {
    try {
      const { data } = await axios.get(`/song/${id}`)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static getMostPlayedSongs = async ({
    startTime,
    endTime,
    numberOfSongs
  }) => {
    try {
      const { data } = await axios.get('/most-play-songs', {
        params: {
          startTime,
          endTime,
          numberOfSongs
        }
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static playSong = async (id) => {
    try {
      const { data } = await axios.post(`/song/${id}/play`)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static deleteSong = async (id) => {
    try {
      const { data } = await axios.delete(`/song/${id}`)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static getSongs = async ({
    page,
    limit,
    sortBy,
    order,
    genreId
  }) => {
    try {
      const { data } = await axios.get('/songs/', {
        params: {
          page,
          limit,
          sortBy,
          order,
          genreId
        }
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static getMySongs = async ({
    page,
    limit,
    sortBy,
    order,
  }) => {
    try {
      const { data } = await axios.get('/my-songs', {
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

  static updateSong = async (id, {
    name,
    artist,
    image,
  }) => {
    try {
      const { data } = await axios.patch(`/song/${id}`, {
        name,
        artist,
        image,
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  static getPendingApprovalSongs = async ({
    page,
    limit,
    sortBy = "name",
    order = "asc",
  }) => {
    try {
      if (!page) page = 1;
      if (!limit) limit = 100;
      if (!sortBy) sortBy = "name";
      if (!order) order = "asc";
      const { data } = await axios.get('/pending-approval-songs', {
        params: {
          page,
          limit,
          sortBy,
          order
        }
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static approveSong = async (id) => {
    try {
      const { data } = await axios.patch(`/song/${id}/approve`);
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  static addSongToFavorite = async (songId) => {
    try {
        const { data } = await axios.post(`/song/${songId}/favourite`);
        return data;
    } catch (error) {
        console.log(error)
    }
}

static removeSongFromFavorite = async (songId) => {
    try {
        const { data } = await axios.delete(`/song/${songId}/favourite`);
        return data;
    } catch (error) {
        console.log(error)
    }
}

static getFavoriteSongs = async ({
  page = 1,
  limit = 10,
  sortBy = "name",
  order = "asc",
  search = "",
}) => {
    try {
        if (!page) page = 1;
        if (!limit) limit = 1;
        if (!sortBy) sortBy = "name";
        if (!order) order = "asc";
        if (!search) search = "";
        const { data } = await axios.get('/favourite-songs', {
            params: {
                page,
                limit,
                sortBy,
                order,
                search,
            }
        })
        return data
    } catch (error) {
        console.log(error)
    }
}
}


