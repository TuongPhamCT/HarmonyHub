const User = require("../models/user.model");
const Song = require("../models/song.model");
const Album = require("../models/album.model");
const Playlist = require("../models/playlist.model");

module.exports.getArtistInfoById = async (artistId) => {
  try {
    let artist = await User.findByPk(artistId);
    if (!artist) {
      let error = new Error("Artist not found");
      error.status = 404;
      throw error;
    }

    let popularSongs = await this.getTopSongsByUserId(artistId);
    let lastestAlbums = await this.getLastestAlbumsByUserId(artistId);
    let lastestPlaylists = await this.getLastestPlaylistsByUserId(artistId);

    const artistInfo = {
      name: artist.name,
      image: artist.image,
      popularSongs: popularSongs,
      lastestAlbums: lastestAlbums,
      lastestPlaylists: lastestPlaylists,
    };

    return artistInfo;
  } catch (error) {
    throw new Error(`Error fetching artist info: ${error.message}`);
  }
};

module.exports.getTopSongsByUserId = async (userId, limit = 5) => {
  try {
    const topSongs = await Song.findAll({
      where: { post_user_id: userId },
      order: [["playCount", "DESC"]],
      limit: limit,
    });
    return topSongs;
  } catch (error) {
    throw new Error(`Error fetching top songs: ${error.message}`);
  }
};

module.exports.getLastestAlbumsByUserId = async (userId, limit = 5) => {
  try {
    const lastestAlbums = await Album.findAll({
      where: { artist_id: userId },
      order: [["createdAt", "DESC"]],
      limit: limit,
    });
    return lastestAlbums;
  } catch (error) {
    throw new Error(`Error fetching lastest albums: ${error.message}`);
  }
};

module.exports.getLastestPlaylistsByUserId = async (userId, limit = 5) => {
  try {
    const lastestPlaylists = await Playlist.findAll({
      where: { user_id: userId },
      limit: limit,
    });
    return lastestPlaylists;
  } catch (error) {
    throw new Error(`Error fetching lastest playlists: ${error.message}`);
  }
};
