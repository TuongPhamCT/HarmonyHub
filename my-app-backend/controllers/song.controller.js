const songService = require("../services/song.service");
const path = require("path");
const fs = require("fs");
const Genre = require("../models/genre.model");
const Song = require("../models/song.model");
const User = require("../models/user.model");
const { Op } = require("sequelize");
const { getAudioDurationInSeconds } = require("get-audio-duration");

const statSync = fs.statSync;
const createReadStream = fs.createReadStream;

module.exports.createSong = async (req, res) => {
  console.log(req.body);
  let songName = req.body.name;
  // Validate and convert genres
  let genres = [];
  if (req.body.genres) {
    if (Array.isArray(req.body.genres)) {
      genres = req.body.genres.map((id) => {
        const numId = Number(id);
        if (isNaN(numId)) {
          throw new Error("Invalid genre ID format");
        }
        return numId;
      });
    } else {
      genres = [Number(req.body.genres)];
    }
  }
  let songFile = req.files.file ? req.files.file[0] : null;
  let songImage = req.files.image ? req.files.image[0] : null;
  let userId = req.userId;
  let lyric = req.body.lyric;
  let artist = req.body.artist;
  let durationInSeconds = await getAudioDurationInSeconds(songFile.path);
  let duration = Math.floor(durationInSeconds); // Cast float to int

  try {
    // Validate request
    if (!songName || !genres || !songFile) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check if genres exist
    const genreDocs = await Genre.findAll({
      where: {
        id: genres,
      },
    });
    if (genreDocs.length !== genres.length) {
      return res.status(400).send({ message: "Some genres do not exist" });
    }

    // Create a new song
    const song = await Song.create({
      name: songName,
      artist: artist,
      fileURL: `/public/songs/${songFile.filename}`,
      image: `/public/song_images/${songImage.filename}`,
      duration: duration,
      lyric: lyric,
      createdAt: new Date(),
      updatedAt: new Date(),
      post_user_id: userId,
      playCount: 0,
    });

    // Associate genres with the song
    await song.setGenres(genreDocs);

    res
      .status(201)
      .json({ message: "Song created successfully", song: song.toJSON() });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Error creating song", error });
  }
};

module.exports.getSongById = async (req, res) => {
  let songId = req.params.id;
  try {
    let song = await songService.getSongById(songId);
    song = songService.changePathOfSongForClient(song);
    res.json(song);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Song not found with id: " + songId, error });
  }
};

module.exports.playSongById = async (req, res) => {
  let songId = req.params.id;
  let song = await songService.getSongById(songId);

  await songService.addPlayHistory(songId, req.userId, new Date());
  song.playCount += 1;
  await song.save();

  return res.status(200).json({ message: "Song play history stored" });
};

module.exports.getMostPlaySongs = async (req, res) => {
  let { startTime, endTime, numberOfSongs } = req.query;

  try {
    let songs = await songService.getMostPlaySongs(
      startTime,
      endTime,
      numberOfSongs
    );
    res.json(songs);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching most played songs", error });
  }
};

module.exports.deleteSongById = async (req, res) => {
  let songId = req.params.id;
  try {
    let song = await songService.getSongById(songId);
    if (song.post_user_id !== req.userId) {
      return res
        .status(403)
        .json({ message: "You don't have permission to delete this song" });
    } else {
      await songService.deleteSong(song);
      res.status(200).json({ message: "Song deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting song", error });
  }
};

module.exports.updateSongById = async (req, res) => {
  const songId = req.params.id;
  const { name, artist } = req.body;
  const songImage = req.files.image ? req.files.image[0] : null;

  let song = await songService.getSongById(songId);
  if (song.post_user_id !== req.userId) {
    return res
      .status(403)
      .json({ message: "You don't have permission to update this song" });
  }

  try {
    await songService.updateSongById(songId, {
      name,
      artist,
      image: songImage ? songImage.path : undefined,
    });
    res.status(200).json("Song updated successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating song", error: error.message });
  }
};

module.exports.getAllSongs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "name",
      order = "asc",
      search = "",
      genreId,
    } = req.query;

    // Create a regex for case-insensitive search
    const searchRegex = `%${search}%`;

    // Base where condition
    const whereCondition = {
      name: {
        [Op.iLike]: searchRegex,
      },
    };

    // Add genre filtering if genreId is provided
    const includeCondition = genreId
      ? [
          {
            model: Genre,
            where: { id: genreId },
            through: { attributes: [] }, // Exclude junction table attributes
          },
        ]
      : [];

    // Find songs with search, sorting, pagination, and optional genre filtering
    const songs = await Song.findAll({
      where: whereCondition,
      include: includeCondition,
      order: [[sortBy, order.toUpperCase()]],
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    // Get total count for pagination with genre filtering
    const totalSongs = await Song.count({
      where: whereCondition,
      include: includeCondition,
    });

    res.status(200).send({
      songs,
      totalPages: Math.ceil(totalSongs / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving songs.",
    });
  }
};

module.exports.getMySongs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "name",
      order = "asc",
      search = "",
    } = req.query;

    const userId = req.userId;

    // Create a regex for case-insensitive search
    const searchRegex = `%${search}%`;

    // Base where condition
    const whereCondition = {
      name: {
        [Op.iLike]: searchRegex,
      },
      post_user_id: userId,
    };

    // Find songs with search, sorting, pagination, and optional genre filtering
    const songs = await Song.findAll({
      where: whereCondition,
      order: [[sortBy, order.toUpperCase()]],
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    // Get total count for pagination with genre filtering
    const totalSongs = await Song.count({
      where: whereCondition,
    });

    res.status(200).send({
      songs,
      totalPages: Math.ceil(totalSongs / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving songs.",
    });
  }
};

module.exports.getPlaylistContainSong = async (req, res) => {
  try {
    const songId = req.params.id;
    const {
      page = 1,
      limit = 10,
      sortBy = "title",
      order = "asc",
      search = "",
    } = req.query;

    // Find the song
    const song = await Song.findByPk(songId);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Get playlists containing this song
    const playlists = await song.getPlaylists({
      where: {
        title: {
          [Op.iLike]: `%${search}%`,
        },
      },
      order: [[sortBy, order.toUpperCase()]],
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    // Get total count
    const totalPlaylists = await song.countPlaylists({
      where: {
        title: {
          [Op.iLike]: `%${search}%`,
        },
      },
    });

    res.status(200).send({
      playlists,
      totalPages: Math.ceil(totalPlaylists / limit),
      currentPage: Number(page),
      totalItems: totalPlaylists,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Error retrieving playlists containing this song",
    });
  }
};

module.exports.getPendingApprovalSongs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "name",
      order = "asc",
      search = "",
      genreId,
    } = req.query;

    const searchRegex = `%${search}%`;

    // Base where condition including pending status
    const whereCondition = {
      name: {
        [Op.iLike]: searchRegex,
      },
      isAccepted: false,
    };

    // Add genre filtering if genreId is provided
    const includeCondition = genreId
      ? [
          {
            model: Genre,
            where: { id: genreId },
            through: { attributes: [] },
          },
        ]
      : [];

    const songs = await Song.findAll({
      where: whereCondition,
      include: includeCondition,
      order: [[sortBy, order.toUpperCase()]],
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    const totalSongs = await Song.count({
      where: whereCondition,
      include: includeCondition,
    });

    res.status(200).send({
      songs,
      totalPages: Math.ceil(totalSongs / limit),
      currentPage: Number(page),
      totalItems: totalSongs,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving pending songs.",
    });
  }
};

module.exports.approveSongById = async (req, res) => {
  let songId = req.params.id;
  try {
    let song = await songService.getSongById(songId);
    song.isAccepted = true;
    await song.save();
    res.status(200).json({ message: "Song approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error approving song", error });
  }
};

module.exports.addSongToFavourite = async (req, res) => {
  try {
    const songId = req.params.id;
    const userId = req.userId;

    // Check if song exists
    const song = await Song.findByPk(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Add song to user's favorites
    const user = await User.findByPk(userId);
    await user.addFavoriteSong(song);
    res.status(200).json({ message: "Song added to favourites successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error adding song to favourites",
      error: error.message,
    });
  }
};

module.exports.removeSongFromFavourite = async (req, res) => {
  try {
    const songId = req.params.id;
    const userId = req.userId;

    // Check if song exists
    const song = await Song.findByPk(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Remove song from user's favorites
    const user = await User.findByPk(userId);
    await user.removeFavoriteSong(song);

    res
      .status(200)
      .json({ message: "Song removed from favourites successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error removing song from favourites",
      error: error.message,
    });
  }
};

module.exports.getFavouriteSongs = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      page = 1,
      limit = 10,
      sortBy = "name",
      order = "asc",
      search = "",
    } = req.query;

    const user = await User.findByPk(userId);
    const searchRegex = `%${search}%`;

    const favorites = await user.getFavoriteSongs({
      where: {
        name: {
          [Op.iLike]: searchRegex,
        },
      },
      order: [[sortBy, order.toUpperCase()]],
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    const totalFavorites = await user.countFavoriteSongs({
      where: {
        name: {
          [Op.iLike]: searchRegex,
        },
      },
    });

    res.status(200).send({
      songs: favorites,
      totalPages: Math.ceil(totalFavorites / limit),
      currentPage: Number(page),
      totalItems: totalFavorites,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching favourite songs",
      error: error.message,
    });
  }
};
