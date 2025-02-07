const Album = require("../models/album.model");
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
