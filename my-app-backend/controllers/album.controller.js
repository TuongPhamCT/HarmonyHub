const Album = require("../models/album.model");
const Song = require("../models/song.model");
const sequelize = require("../configs/sequelize");
const albumService = require("../services/album.service");
const { Op } = require("sequelize");

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

module.exports.getAllAlbumsOfUser = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      page = 1,
      limit = 10,
      sortBy = "title",
      order = "asc",
      search = "",
    } = req.query;

    // Find albums with search, sorting, and pagination
    const albums = await Album.findAll({
      where: {
        artist_id: userId,
        title: {
          [Op.iLike]: `%${search}%`,
        },
      },
      order: [[sortBy, order.toUpperCase()]],
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    // Get total count for pagination
    const totalAlbums = await Album.count({
      where: {
        artist_id: userId,
        title: {
          [Op.iLike]: `%${search}%`,
        },
      },
    });

    res.status(200).send({
      albums,
      totalPages: Math.ceil(totalAlbums / limit),
      currentPage: Number(page),
      totalItems: totalAlbums,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving albums",
    });
  }
};

module.exports.createAlbum = async (req, res) => {
  const { title, releaseDate, description } = req.body;
  const artist_id = req.userId;
  let image = req.files.image ? req.files.image[0] : null;
  try {
    const album = await Album.create({
      title,
      releaseDate,
      description,
      artist_id,
      image: image ? `/public/genre_images/${image.filename}` : null,
    });
    res.status(201).json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteAlbumById = async (req, res) => {
  const albumId = req.params.id;
  try {
    await Album.destroy({
      where: {
        id: albumId,
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addSongToAlbum = async (req, res) => {
  const albumId = req.params.id;
  const { songId } = req.body;
  try {
    const song = await Song.findByPk(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    if (song.album_id) {
      return res
        .status(400)
        .json({ message: "Song already belongs to an album" });
    }
    song.album_id = albumId;
    await song.save();
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.removeSongFromAlbum = async (req, res) => {
  const albumId = req.params.id;
  const { songId } = req.body;
  try {
    const song = await Song.findByPk(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    if (song.album_id !== albumId) {
      return res
        .status(400)
        .json({ message: "Song does not belong to this album" });
    }
    song.album_id = null;
    await song.save();
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getRandomAlbums = async (req, res) => {
  const limit = req.query.limit || 5;
  try {
    const albums = await Album.findAll({
      order: sequelize.random(),
      limit: limit,
    });
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
