const Album = require("../models/album.model");
const albumService = require("../services/album.service");

module.exports.getAlbums = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Album.findAndCountAll({
      limit: limit,
      offset: offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      totalItems: count,
      totalPages: totalPages,
      currentPage: page,
      albums: rows,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching albums", error: error.message });
  }
};

module.exports.getAlbumById = async (req, res) => {
  const albumId = req.params.id;
  try {
    const album = await albumService.getAlbumDetails(albumId);
    res.json(album);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching album", error: error.message });
  }
};
