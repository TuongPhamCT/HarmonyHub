var Playlist = require("../models/playlist.model");
const Song = require("../models/song.model");
const User = require("../models/user.model");

module.exports.getPlaylistsByUserId = async (userEmail) => {
  try {
    const playlists = await Playlist.findAll({
      include: [
        {
          model: User,
          where: { email: userEmail },
          attributes: [], // Exclude user attributes from the result
        },
      ],
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

module.exports.createPlaylist = async (title, isPublic, userId) => {
  try {
    const playlist = await Playlist.create({
      title,
      isPublic,
      user_id: userId,
    });
    return playlist;
  } catch (error) {
    throw new Error(`Error creating playlist: ${error.message}`);
  }
};
