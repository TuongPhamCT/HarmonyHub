const Genre = require("../models/genre.model");
const { Op } = require("sequelize");

module.exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;
    let image = req.files.image ? req.files.image[0] : null;

    // Validate request
    if (!name) {
      return res.status(400).send({ message: "Genre name is required" });
    }

    // Check if the genre already exists
    const existingGenre = await Genre.findOne({ where: { name } });
    if (existingGenre) {
      return res.status(400).send({ message: "Genre already exists" });
    }

    // Create a new genre
    const genre = await Genre.create({
      name,
      description,
      image: image ? `/public/genre_images/${image.filename}` : null,
    });

    res.status(201).send(genre);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the genre.",
    });
  }
};

module.exports.getGenres = async (req, res) => {
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

    // Find genres with search, sorting, and pagination
    const genres = await Genre.findAll({
      where: {
        name: {
          [Op.iLike]: searchRegex,
        },
      },
      order: [[sortBy, order.toUpperCase()]],
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    // Get total count for pagination
    const totalGenres = await Genre.count({
      where: {
        name: {
          [Op.iLike]: searchRegex,
        },
      },
    });

    res.status(200).send({
      genres,
      totalPages: Math.ceil(totalGenres / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving genres.",
    });
  }
};

module.exports.getGenreById = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);

    if (!genre) {
      return res.status(404).send({ message: "Genre not found" });
    }

    res.status(200).send(genre);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving the genre.",
    });
  }
};

module.exports.updateGenreById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Validate request
    if (!name && !description) {
      return res
        .status(400)
        .send({ message: "At least one field is required to update" });
    }

    // Check if the genre already exists
    if (name) {
      const existingGenre = await Genre.findOne({ where: { name } });
      if (existingGenre && existingGenre.id !== parseInt(id)) {
        return res.status(400).send({ message: "Genre already exists" });
      }
    }

    // Build the update object
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    // Update genre in the database
    const [updated] = await Genre.update(updateData, { where: { id } });

    if (!updated) {
      return res.status(404).send({ message: "Genre not found" });
    }

    const updatedGenre = await Genre.findByPk(id);
    res.status(200).send(updatedGenre);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating the genre.",
    });
  }
};

module.exports.deleteGenreById = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete genre from the database
    const deleted = await Genre.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send({ message: "Genre not found" });
    }

    res.status(200).send({ message: "Genre deleted successfully" });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while deleting the genre.",
    });
  }
};
