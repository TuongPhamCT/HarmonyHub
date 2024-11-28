var Playlist = require("../models/playlist.model");
const Song = require("../models/song.model");

module.exports.getPlaylistsByUserId = async (userId) => {
  try {
    const playlists = await Playlist.findAll({
      where: { user_id: userId },
    });
    return playlists;
  } catch (error) {
    throw new Error(`Error fetching playlists: ${error.message}`);
  }
};

module.exports.getPlaylistDetails = async (playlistId) => {
  try {
    let playlist = await Playlist.findByPk(playlistId, {
      include: [
        {
          model: Song,
          attributes: ["id", "title", "image"],
          include: [
            {
              model: Album,
              attributes: ["title"], // Assuming the album name is stored in the "title" attribute
            },
          ],
        },
      ],
    });

    if (!playlist) {
      throw new Error("Playlist not found");
    }

    return playlist;
  } catch (error) {
    throw new Error(`Error fetching playlist details: ${error.message}`);
  }
};
