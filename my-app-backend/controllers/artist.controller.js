var artistService = require("../services/artist.service");
const User = require("../models/user.model");
const { Op } = require("sequelize");

module.exports.getArtistById = async (req, res) => {
  const artistId = req.params.id;
  try {
    const artistInfo = await artistService.getArtistInfoById(artistId);
    res.json(artistInfo);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error fetching artist", error: error.message });
  }
};

module.exports.getAllArtists = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "name",
      order = "asc",
      search = "",
    } = req.query;

    // Create a regex for case-insensitive search
    const searchRegex = `%${search}%`;

    // Find artists with search, sorting, and pagination
    const artists = await User.findAll({
      where: {
        role: "artist",
        name: {
          [Op.iLike]: searchRegex,
        },
      },
      order: [[sortBy, order.toUpperCase()]],
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    // Get total count for pagination
    const totalArtists = await User.count({
      where: {
        role: "artist",
        name: {
          [Op.iLike]: searchRegex,
        },
      },
    });

    res.status(200).send({
      artists,
      totalPages: Math.ceil(totalArtists / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving artists.",
    });
  }
};
