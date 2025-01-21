const Genre = require("../models/genre.model"); // Assuming you have a Genre model

module.exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate request
    if (!name) {
      return res.status(400).send({ message: "Genre name is required" });
    }

    // Create a new genre
    const genre = new Genre({
      name,
      description,
    });

    // Check if the genre already exists
    const existingGenre = await Genre.findOne({ name });
    if (existingGenre) {
      return res.status(400).send({ message: "Genre already exists" });
    }

    // Save genre in the database
    const savedGenre = await genre.save();

    res.status(201).send(savedGenre);
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
    const searchRegex = new RegExp(search, "i");

    // Find genres with search, sorting, and pagination
    const genres = await Genre.find({ name: searchRegex })
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Get total count for pagination
    const totalGenres = await Genre.countDocuments({ name: searchRegex });

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
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).send({ message: "Genre not found" });
    }

    res.status(200).send(genre);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving genre.",
    });
  }
};

module.exports.updateGenreById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Validate request
    if (!name) {
      return res.status(400).send({ message: "Genre name is required" });
    }

    // Check if the genre already exists
    const existingGenre = await Genre.findOne({ name });
    if (existingGenre && existingGenre._id.toString() !== id) {
      return res.status(400).send({ message: "Genre already exists" });
    }

    // Update genre in the database
    const updatedGenre = await Genre.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedGenre) {
      return res.status(404).send({ message: "Genre not found" });
    }

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
    const deletedGenre = await Genre.findByIdAndDelete(id);

    if (!deletedGenre) {
      return res.status(404).send({ message: "Genre not found" });
    }

    res.status(200).send({ message: "Genre deleted successfully" });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while deleting the genre.",
    });
  }
};
