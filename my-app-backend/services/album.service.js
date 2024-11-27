var Album = require("../models/album.model");
const Song = require("../models/song.model");
var User = require("../models/user.model");

module.exports.getAlbumDetails = async (albumId) => {
  try {
    let album = await Album.findByPk(albumId, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "image"],
        },
      ],
    });

    if (!album) {
      throw new Error("Album not found");
    }

    const songs = await Song.findAll({ where: { album_id: albumId } });
    album.dataValues.songs = songs;

    return album;
  } catch (error) {
    throw new Error(`Error fetching album details: ${error.message}`);
  }
};
